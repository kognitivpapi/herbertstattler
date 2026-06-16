export interface AboutShopBook {
  id: string
  title: string
  publisher: string
  detail: string
  shopUrl: string
  workId?: string
}

export interface AboutShopGallery {
  id: string
  name: string
  location: string
  url: string
  note: string
}

export interface WorkShopLink {
  label: string
  url: string
}

export const aboutShopIntro =
  'Artist\'s books are available from Spector Books. For drawings, editions, and gallery works, please contact the galleries below.'

export const aboutShopBooks: AboutShopBook[] = [
  {
    id: 'lace-ware-en',
    title: 'Lace Ware. An Album 1900–1954',
    publisher: 'Spector Books',
    detail: 'English edition · ISBN 978-3-95905-884-1',
    shopUrl: 'https://www.spectorbooks.com/book/herbert-stattler-lace-ware',
    workId: 'lace-ware-album',
  },
  {
    id: 'spitzenwaren-de',
    title: 'Spitzenwaren. Ein Album 1900–1954',
    publisher: 'Spector Books',
    detail: 'German edition · ISBN 978-3-95905-883-4',
    shopUrl: 'https://www.spectorbooks.com/book/herbert-stattler-spitzenwaren',
    workId: 'spitzenwaren-album',
  },
  {
    id: 'woher-kommen-kinder',
    title: 'Woher kommen die kleinen Kinder?',
    publisher: 'Spector Books',
    detail: 'German edition · ISBN 978-3-95905-216-0',
    shopUrl: 'https://www.spectorbooks.com/book/woher-kommen-die-kleinen-kinder',
    workId: 'woher-kommen-kinder',
  },
  {
    id: 'where-do-little-children',
    title: 'Where do little children come from?',
    publisher: 'Spector Books',
    detail: 'English edition · ISBN 978-3-95905-217-7',
    shopUrl: 'https://www.spectorbooks.com/book/where-do-little-children-come-from',
    workId: 'where-do-little-children',
  },
  {
    id: 'ornament-stadt',
    title: 'Ornament Stadt',
    publisher: 'Spector Books',
    detail: 'ISBN 978-3-944669-40-3',
    shopUrl: 'https://www.spectorbooks.com/book/ornament-stadt',
    workId: 'ornament-stadt',
  },
]

export const aboutShopGalleries: AboutShopGallery[] = [
  {
    id: 'vincenz-sala',
    name: 'Galerie Vincenz Sala',
    location: 'Berlin, Germany',
    url: 'https://www.vsala.com/',
    note: 'Drawings and editions',
  },
  {
    id: 'galerie-wiedmann',
    name: 'Galerie Wiedmann',
    location: 'Stuttgart, Germany',
    url: 'https://galeriewiedmann.de/',
    note: 'Drawings and exhibitions',
  },
  {
    id: 'druck-und-buch',
    name: 'Galerie Druck & Buch',
    location: 'Vienna, Austria',
    url: 'https://www.druckundbuch.com/',
    note: 'Artist\'s books and prints',
  },
]

const workSpecialEditionShopLinks: Record<string, WorkShopLink> = {
  'lace-ware-album': {
    label: 'Special edition at Galerie Druck & Buch',
    url: 'https://www.druckundbuch.com/',
  },
  'spitzenwaren-album': {
    label: 'Special edition at Galerie Druck & Buch',
    url: 'https://www.druckundbuch.com/',
  },
  'woher-kommen-kinder': {
    label: 'Special edition at Galerie Druck & Buch',
    url: 'https://www.druckundbuch.com/',
  },
  'where-do-little-children': {
    label: 'Special edition at Galerie Druck & Buch',
    url: 'https://www.druckundbuch.com/',
  },
}

export function getWorkShopLinks(workId: string): WorkShopLink[] {
  const links: WorkShopLink[] = aboutShopBooks
    .filter((book) => book.workId === workId)
    .map((book) => ({
      label: 'Buy at Spector Books',
      url: book.shopUrl,
    }))

  const specialEdition = workSpecialEditionShopLinks[workId]
  if (specialEdition) {
    links.push(specialEdition)
  }

  return links
}
