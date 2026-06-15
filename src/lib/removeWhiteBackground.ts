const cache = new Map<string, string>()

const MAX_EDGE = 900
const BACKGROUND_MIN = 228
const COLOR_TOLERANCE = 36

function pixelIndex(width: number, x: number, y: number): number {
  return (y * width + x) * 4
}

function isBackgroundPixel(data: Uint8ClampedArray, index: number): boolean {
  const r = data[index]
  const g = data[index + 1]
  const b = data[index + 2]
  return Math.min(r, g, b) >= BACKGROUND_MIN
}

function colorsMatch(
  data: Uint8ClampedArray,
  a: number,
  b: number,
  tolerance: number,
): boolean {
  return (
    Math.abs(data[a] - data[b]) <= tolerance &&
    Math.abs(data[a + 1] - data[b + 1]) <= tolerance &&
    Math.abs(data[a + 2] - data[b + 2]) <= tolerance
  )
}

/** Remove solid light background connected to image edges (preserves white in the artwork). */
function floodRemoveEdgeBackground(imageData: ImageData): void {
  const { data, width, height } = imageData
  const visited = new Uint8Array(width * height)
  const queue: number[] = []

  for (let x = 0; x < width; x += 1) {
    queue.push(x, (height - 1) * width + x)
  }
  for (let y = 0; y < height; y += 1) {
    queue.push(y * width, y * width + (width - 1))
  }

  while (queue.length > 0) {
    const cell = queue.pop()
    if (cell === undefined || visited[cell]) continue

    const x = cell % width
    const y = Math.floor(cell / width)
    const index = pixelIndex(width, x, y)

    if (!isBackgroundPixel(data, index)) continue

    visited[cell] = 1
    data[index + 3] = 0

    const neighbors = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ]

    for (const [nx, ny] of neighbors) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
      const next = ny * width + nx
      if (visited[next]) continue
      const nextIndex = pixelIndex(width, nx, ny)
      if (
        isBackgroundPixel(data, nextIndex) &&
        colorsMatch(data, index, nextIndex, COLOR_TOLERANCE)
      ) {
        queue.push(next)
      }
    }
  }
}

export function removeWhiteBackground(src: string): Promise<string> {
  const cached = cache.get(src)
  if (cached) return Promise.resolve(cached)

  if (src.endsWith('.svg')) {
    cache.set(src, src)
    return Promise.resolve(src)
  }

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'

    img.onload = () => {
      let width = img.naturalWidth
      let height = img.naturalHeight

      if (width > MAX_EDGE) {
        height = Math.round((height * MAX_EDGE) / width)
        width = MAX_EDGE
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d', { willReadFrequently: true })

      if (!ctx) {
        reject(new Error('Canvas unavailable'))
        return
      }

      ctx.drawImage(img, 0, 0, width, height)
      const imageData = ctx.getImageData(0, 0, width, height)
      floodRemoveEdgeBackground(imageData)
      ctx.putImageData(imageData, 0, 0)

      const processed = canvas.toDataURL('image/png')
      cache.set(src, processed)
      resolve(processed)
    }

    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}
