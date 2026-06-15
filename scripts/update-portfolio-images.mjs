/**
 * Copies work images into public/works/ for carousel + discover.
 * Run: node scripts/update-portfolio-images.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const PUBLIC = path.join(ROOT, 'public')
const WORKS = path.join(PUBLIC, 'works')
const PORTFOLIO = path.join(ROOT, 'src', 'data', 'portfolio.ts')

/** Portfolio id → source path relative to public/ */
const SOURCES = {
  anschlussheilbehandlung:
    'works-detail/anschlussheilbehandlung/01_fallnr515674891_post-op_detail-600.jpg',
  'lace-ware-album': 'works-detail/lace-ware-album/lace-ware_objekt-600.jpg',
  'spitzenwaren-album': 'works-detail/spitzenwaren-album/spitzenwaren_objekt-600.jpg',
  spitzenwaren: 'works/spitzenwaren.jpg',
  zeichnungen: 'works/zeichnungen.jpg',
  'mf-ordnung': 'works-detail/mf-ordnung/dieordnungderdinge-book-600.jpg',
  'where-do-little-children':
    'works-detail/where-do-little-children/wheredolittlechildrencomefrom-book-600.jpg',
  'woher-kommen-kinder':
    'works-detail/woher-kommen-kinder/woherkommendiekleinenkinder-book-600.jpg',
  grundkurs:
    'works-detail/grundkurs/grundkursimwissenschaftlichendefinieren-box_open2-600.jpg',
  klandestine: 'works/klandestine.jpg',
  'wb-schriften': 'works-detail/wb-schriften/wbgesammelteschriften-box_open_full-600.jpg',
  'reserve-shelf': 'works-detail/reserve-shelf/reserve_shelf-09-600.jpg',
  'ornament-stadt': 'works-detail/ornament-stadt/ornamentstadt-book-600.jpg',
  'so-many-questions': 'works/so-many-questions.svg',
  stadtleitbilder: 'works/stadtleitbilder.jpg',
  depot: 'works/depot.jpg',
  'heimliche-braeute':
    'works-detail/heimliche-braeute/heimlichebrauteehelichesgluck-cover_drawing-600.jpg',
  'sup-supri-suprema': 'works-detail/sup-supri-suprema/sup-supri-suprema-drawing-600.jpg',
  'letter-652': 'works-detail/letter-652/letter652_paperobject_gallery-desk-01-600.jpg',
  schreibtische: 'works-detail/schreibtische/schreibtische_drawing-detail-06-600.jpg',
}

function readAspect(filePath) {
  const out = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}"`, { encoding: 'utf8' })
  const w = Number(out.match(/pixelWidth: (\d+)/)?.[1] ?? 0)
  const h = Number(out.match(/pixelHeight: (\d+)/)?.[1] ?? 0)
  if (!w || !h) throw new Error(`Could not read dimensions for ${filePath}`)
  return Math.round((w / h) * 10000) / 10000
}

const aspects = {}

for (const [id, relSrc] of Object.entries(SOURCES)) {
  const src = path.join(PUBLIC, relSrc)
  if (!fs.existsSync(src)) {
    throw new Error(`Missing source for ${id}: ${src}`)
  }

  const dest = path.join(WORKS, `${id}.jpg`)

  if (path.resolve(src) !== path.resolve(dest)) {
    fs.copyFileSync(src, dest)
  }

  aspects[id] = readAspect(dest)
  console.log(`${id}: ${id}.jpg → aspect ${aspects[id]}`)
}

let portfolio = fs.readFileSync(PORTFOLIO, 'utf8')

for (const [id, aspect] of Object.entries(aspects)) {
  const imageUrl = `/works/${id}.jpg`

  portfolio = portfolio.replace(
    new RegExp(
      `(id: '${id}',[\\s\\S]*?imageUrl: ')[^']+(',[\\s\\S]*?aspectRatio: )[0-9.]+`,
    ),
    `$1${imageUrl}$2${aspect}`,
  )
}

fs.writeFileSync(PORTFOLIO, portfolio)
console.log('\nUpdated portfolio.ts')
