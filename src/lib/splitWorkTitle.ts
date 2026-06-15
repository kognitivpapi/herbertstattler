/** Splits titles like "Lace Ware. An Album 1900–1954 (2025)" into name + trailing release date. */
export function splitWorkTitle(title: string): { name: string; year: string | null } {
  const match = title.match(/^(.*)\s+(\([^)]+\))\s*$/)
  if (!match) return { name: title, year: null }
  return { name: match[1].trim(), year: match[2] }
}

export const martinBauerSubtitleParts: Record<string, { lead: string; muted: string }> = {
  'lace-ware-album': {
    lead: 'Herbert Stattler ',
    muted: 'with texts by Martin Bauer',
  },
  'spitzenwaren-album': {
    lead: 'Herbert Stattler ',
    muted: 'mit Texten von Martin Bauer',
  },
}
