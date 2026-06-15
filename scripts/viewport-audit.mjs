import { chromium } from 'playwright'

const BASE = 'http://127.0.0.1:5173'
const PAGES = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
  { path: '/exhibitions', name: 'Exhibitions' },
  { path: '/material', name: 'Material' },
  { path: '/contact', name: 'Contact' },
  { path: '/work/lace-ware-album', name: 'Work detail' },
]

const VIEWPORTS = [
  { name: 'mobile-sm', width: 375, height: 812 },
  { name: 'mobile', width: 480, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'tablet-lg', width: 900, height: 1024 },
  { name: 'desktop', width: 1200, height: 800 },
  { name: 'desktop-lg', width: 1440, height: 900 },
]

async function scrollPage(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0
      const step = () => {
        window.scrollTo(0, y)
        y += Math.max(window.innerHeight * 0.8, 300)
        if (y < document.body.scrollHeight) requestAnimationFrame(step)
        else setTimeout(resolve, 400)
      }
      step()
    })
  })
  await page.waitForTimeout(300)
}

async function auditPage(page, path, viewport) {
  const errors = []
  await page.setViewportSize({ width: viewport.width, height: viewport.height })
  const response = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle', timeout: 30000 })
  if (!response?.ok()) errors.push(`HTTP ${response?.status() ?? 'failed'}`)

  await page.waitForTimeout(700)
  await scrollPage(page)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(200)

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement
    const overflowX = Math.max(doc.scrollWidth, document.body.scrollWidth) - doc.clientWidth
    const h1 = document.querySelector('h1')
    const brokenImages = [...document.querySelectorAll('img')].filter(
      (img) => img.getAttribute('loading') !== 'lazy' && (!img.complete || img.naturalWidth === 0),
    ).length
    const lazyPending = [...document.querySelectorAll('img[loading="lazy"]')].filter(
      (img) => !img.complete || img.naturalWidth === 0,
    ).length

    return {
      overflowX,
      hasH1: !!h1,
      brokenImages,
      lazyPending,
      menuVisible: !!document.querySelector('.sticky-menu'),
    }
  })

  if (metrics.overflowX > 2) errors.push(`horizontal overflow ${metrics.overflowX}px`)
  if (!metrics.hasH1 && path !== '/') errors.push('missing h1')
  if (metrics.brokenImages > 0) errors.push(`${metrics.brokenImages} broken eager image(s)`)
  if (!metrics.menuVisible) errors.push('sticky menu not found')

  return { errors, metrics }
}

async function auditDiscover(page, viewport) {
  const errors = []
  await page.setViewportSize({ width: viewport.width, height: viewport.height })
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /discover/i }).first().click()
  await page.waitForSelector('.discover-page')
  await page.waitForTimeout(700)

  const metrics = await page.evaluate((width) => {
    const doc = document.documentElement
    const controls = document.querySelector('.discover-page__controls')
    return {
      overflowX: doc.scrollWidth - doc.clientWidth,
      controlsDisplay: controls ? getComputedStyle(controls).display : 'missing',
      infoBottom: document.querySelector('.discover-page__info')?.getBoundingClientRect().bottom ?? 0,
      viewportHeight: window.innerHeight,
    }
  }, viewport.width)

  if (metrics.overflowX > 2) errors.push(`horizontal overflow ${metrics.overflowX}px`)
  if (viewport.width < 768 && metrics.controlsDisplay !== 'none') {
    errors.push('nav controls visible on mobile (expected hidden)')
  }
  if (viewport.width >= 768 && metrics.controlsDisplay === 'none') {
    errors.push('nav controls hidden on desktop (expected visible)')
  }

  return { errors, metrics }
}

async function auditHomeGrid(page, viewport) {
  const errors = []
  await page.setViewportSize({ width: viewport.width, height: viewport.height })
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)

  const metrics = await page.evaluate(() => {
    const links = [...document.querySelectorAll('.home-link, .discover-btn')].map((el) => {
      const r = el.getBoundingClientRect()
      return { label: el.textContent?.trim().slice(0, 20), top: r.top, left: r.left, w: r.width, h: r.height }
    })
    const overflowX = document.documentElement.scrollWidth - document.documentElement.clientWidth
    return { links, overflowX }
  })

  if (metrics.overflowX > 2) errors.push(`horizontal overflow ${metrics.overflowX}px`)
  for (const link of metrics.links) {
    if (link.w < 20 || link.h < 20) errors.push(`tiny tap target: ${link.label}`)
    if (link.top < 0 || link.left < -4) errors.push(`clipped link: ${link.label}`)
  }

  return { errors, metrics }
}

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
const failed = []

for (const viewport of VIEWPORTS) {
  for (const { path, name } of PAGES) {
    const { errors } = await auditPage(page, path, viewport)
    if (errors.length) failed.push({ page: name, viewport: viewport.name, width: viewport.width, errors })
  }
  const discover = await auditDiscover(page, viewport)
  if (discover.errors.length) {
    failed.push({ page: 'Discover', viewport: viewport.name, width: viewport.width, errors: discover.errors })
  }
  const home = await auditHomeGrid(page, viewport)
  if (home.errors.length) {
    failed.push({ page: 'Home grid', viewport: viewport.name, width: viewport.width, errors: home.errors })
  }
}

await browser.close()

console.log(JSON.stringify({ checks: VIEWPORTS.length * (PAGES.length + 2), failed }, null, 2))
process.exit(failed.length ? 1 : 0)
