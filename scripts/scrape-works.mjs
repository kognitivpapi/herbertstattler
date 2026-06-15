/**
 * Scrapes work detail pages from herbertstattler.com and downloads images.
 * Run: node scripts/scrape-works.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'works-detail')
const DATA_FILE = path.join(ROOT, 'src', 'data', 'workDetails.ts')

const BASE = 'https://herbertstattler.com/'

const PAGES = [
  ['anschlussheilbehandlung', 'anschlussheilbehandlung.html'],
  ['lace-ware-album', 'lace.html'],
  ['spitzenwaren-album', 'spitzenwaren-album.html'],
  ['spitzenwaren', 'spitzenwaren.html'],
  ['zeichnungen', 'zeichnungen.html'],
  ['mf-ordnung', 'ordnung.html'],
  ['where-do-little-children', 'children.html'],
  ['woher-kommen-kinder', 'kinder.html'],
  ['grundkurs', 'definieren.html'],
  ['klandestine', 'klandestin.html'],
  ['wb-schriften', 'schriften.html'],
  ['reserve-shelf', 'reserve-shelf.html'],
  ['ornament-stadt', 'ornament.html'],
  ['so-many-questions', 'questions.html'],
  ['stadtleitbilder', 'stadtleitbilder-urban-models.html'],
  ['depot', 'depot-storage.html'],
  ['heimliche-braeute', 'glueck.html'],
  ['sup-supri-suprema', 'suprema.html'],
  ['letter-652', 'letter.html'],
  ['schreibtische', 'schreibtische.html'],
]

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`)
  return res.text()
}

function cleanHtml(s) {
  return s
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function pickBestImageUrl(urls) {
  const jpg = urls.filter((u) => u.endsWith('.jpg') || u.endsWith('.jpeg'))
  const webp = urls.filter((u) => u.endsWith('.webp'))
  const pool = jpg.length ? jpg : webp.length ? webp : urls
  const sized = pool.find((u) => u.includes('-600.')) ?? pool.find((u) => u.includes('-300.')) ?? pool[0]
  return sized
}

function extractImageUrlsFromHtml(html) {
  const urls = new Set()
  const patterns = [
    /src="(images\/[^"]+)"/g,
    /srcset="([^"]+)"/g,
    /data-srcset="([^"]+)"/g,
  ]
  for (const re of patterns) {
    for (const m of html.matchAll(re)) {
      const part = m[1]
      if (part.includes('images/')) {
        if (part.includes(',')) {
          for (const chunk of part.split(',')) {
            const u = chunk.trim().split(/\s+/)[0]
            if (u.startsWith('images/')) urls.add(u)
          }
        } else {
          urls.add(part)
        }
      }
    }
  }
  return [...urls]
}

function buildClassBgMap(css) {
  const map = {}
  for (const m of css.matchAll(/\.([a-z][a-z0-9]+)\{[^}]*background-image:url\(\.\.\/(images\/[^)]+)\)/g)) {
    map[m[1]] = m[2]
  }
  return map
}

function extractBgImages(html, classBgMap) {
  const imgs = []
  const seen = new Set()
  for (const m of html.matchAll(/class="([^"]+)"/g)) {
    for (const cls of m[1].split(/\s+/)) {
      const img = classBgMap[cls]
      if (img && !seen.has(img)) {
        seen.add(img)
        imgs.push(img)
      }
    }
  }
  return imgs
}

function parseSections(html) {
  const title = cleanHtml(html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1] ?? '')
  const subtitle = cleanHtml(html.match(/<h4[^>]*>(.*?)<\/h4>/s)?.[1] ?? '')

  const h4End = html.indexOf('</h4>')
  const h1End = html.indexOf('</h1>')
  const bodyStart = h4End >= 0 ? h4End + 5 : h1End >= 0 ? h1End + 5 : 0
  const copyrightIdx = html.search(/©\s*\d{4}\s+Herbert Stattler/i)
  const galleryStart = html.search(
    /<picture|<img[^>]+src="images\/|class="[^"]*btf|class="[^"]*ga\d|class="[^"]*slider/i,
  )
  let bodyEnd = html.length
  if (copyrightIdx > bodyStart) bodyEnd = copyrightIdx
  else if (galleryStart > bodyStart) bodyEnd = galleryStart
  const bodySection = html.slice(bodyStart, bodyEnd)

  const paragraphs = []
  for (const m of bodySection.matchAll(/<p[^>]*>(.*?)<\/p>/gs)) {
    const t = cleanHtml(m[1])
    if (
      t.length > 1 &&
      !/^Detail Untitled/i.test(t) &&
      !/^Untitled \(/i.test(t) &&
      !/^\s*$/.test(t)
    ) {
      paragraphs.push(t)
    }
  }

  const blocks = []
  const chunks = html.split(/(?=<picture|<div[^>]*class="[^"]*btf)/i).slice(1)
  if (chunks.length === 0) {
    for (const m of html.matchAll(/<picture[\s\S]*?<\/picture>/gi)) {
      chunks.push(m[0])
    }
  }

  for (const chunk of chunks) {
    const imgUrls = extractImageUrlsFromHtml(chunk)
    const bgOnly = chunk.match(/class="[^"]*btf/) && imgUrls.length === 0
    let src = imgUrls.length ? pickBestImageUrl(imgUrls) : null

    const capMatch = chunk.match(/<p[^>]*>(.*?)<\/p>/s)
    const caption = capMatch ? cleanHtml(capMatch[1]) : ''

    if (src || caption) {
      blocks.push({ src, caption })
    } else if (bgOnly) {
      blocks.push({ src: null, caption, bgBlock: true })
    }
  }

  const captions = [...html.matchAll(/<p class="p[^"]*f8[^"]*"[^>]*>(.*?)<\/p>/gs)]
    .map((m) => cleanHtml(m[1]))
    .filter((t) => t.length > 5)

  if (blocks.length === 0 && captions.length) {
    for (const cap of captions) {
      blocks.push({ src: null, caption: cap })
    }
  }

  return { title, subtitle, paragraphs, blocks }
}

async function downloadImage(remotePath, localPath) {
  if (fs.existsSync(localPath)) return
  const url = BASE + remotePath
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!res.ok) {
    const alt = remotePath.replace(/-600\./, '-300.').replace(/-5120\./, '-600.')
    const altRes = await fetch(BASE + alt, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    if (!altRes.ok) throw new Error(`Download failed: ${url}`)
    fs.writeFileSync(localPath, Buffer.from(await altRes.arrayBuffer()))
    return
  }
  fs.mkdirSync(path.dirname(localPath), { recursive: true })
  fs.writeFileSync(localPath, Buffer.from(await res.arrayBuffer()))
}

function safeFilename(url) {
  return url.replace(/^images\/[a-z0-9]\//, '').replace(/\//g, '_')
}

async function main() {
  console.log('Fetching site CSS...')
  const css = await fetchText(BASE + 'css/site.497b5e.css')
  const classBgMap = buildClassBgMap(css)

  const allWorks = {}

  for (const [id, page] of PAGES) {
    console.log(`\nProcessing ${id}...`)
    const html = await fetchText(BASE + page)
    const parsed = parseSections(html)

    const bgImages = extractBgImages(html, classBgMap).filter(
      (u) => !u.includes('hamburger') && !u.includes('ink-') && !u.includes('paper-'),
    )

    const imageUrls = new Set()
    for (const b of parsed.blocks) {
      if (b.src) imageUrls.add(b.src)
    }
    for (const bg of bgImages) imageUrls.add(bg)

    const htmlImages = extractImageUrlsFromHtml(html).filter(
      (u) =>
        !u.includes('apple-touch') &&
        !u.includes('mstile') &&
        !u.includes('hamburger') &&
        (u.includes('-300.') || u.includes('-600.') || u.includes('-5120.')),
    )
    for (const u of htmlImages) imageUrls.add(pickBestImageUrl([u]))

    const workDir = path.join(OUT_DIR, id)
    fs.mkdirSync(workDir, { recursive: true })

    const gallery = []
    const orderedUrls = [...imageUrls]

    if (parsed.blocks.some((b) => b.src)) {
      for (const block of parsed.blocks) {
        if (!block.src) continue
        const fname = safeFilename(block.src)
        const local = `/works-detail/${id}/${fname}`
        await downloadImage(block.src, path.join(ROOT, 'public', local.slice(1)))
        gallery.push({ src: local, caption: block.caption })
      }
    } else {
      const caps = parsed.blocks.map((b) => b.caption).filter(Boolean)
      for (let i = 0; i < orderedUrls.length; i++) {
        const remote = orderedUrls[i]
        const fname = safeFilename(remote)
        const local = `/works-detail/${id}/${fname}`
        try {
          await downloadImage(remote, path.join(ROOT, 'public', local.slice(1)))
          gallery.push({ src: local, caption: caps[i] ?? '' })
        } catch (e) {
          console.warn(`  skip ${remote}: ${e.message}`)
        }
      }
    }

  const footerNote = cleanHtml(
      html.match(/<p[^>]*>\s*work in progress\s*<\/p>/i)?.[0]?.replace(/<[^>]+>/g, '') ?? '',
    )

    allWorks[id] = {
      title: parsed.title,
      subtitle: parsed.subtitle,
      paragraphs: parsed.paragraphs,
      gallery,
      footerNote: footerNote || undefined,
    }

    console.log(`  ${parsed.title.slice(0, 50)} | ${parsed.paragraphs.length} paras | ${gallery.length} images`)
  }

  const ts = `/** Auto-generated by scripts/scrape-works.mjs — do not edit manually */\n\nexport interface WorkGalleryItem {\n  src: string\n  caption: string\n}\n\nexport interface WorkDetail {\n  id: string\n  title: string\n  subtitle: string\n  paragraphs: string[]\n  gallery: WorkGalleryItem[]\n  footerNote?: string\n}\n\nexport const workDetails: Record<string, WorkDetail> = ${JSON.stringify(
    Object.fromEntries(
      Object.entries(allWorks).map(([id, w]) => [id, { id, ...w }]),
    ),
    null,
    2,
  )}\n\nexport function getWorkDetail(id: string): WorkDetail | undefined {\n  return workDetails[id]\n}\n`

  fs.writeFileSync(DATA_FILE, ts)
  console.log(`\nWrote ${DATA_FILE}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
