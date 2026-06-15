export interface PortfolioItem {
  id: string
  title: string
  year: string
  description: string
  imageUrl: string
  aspectRatio: number
}

/** Works listed on https://herbertstattler.com/ (home page, in order) */
export const portfolioData: PortfolioItem[] = [
  {
    id: 'anschlussheilbehandlung',
    title: 'Anschlussheilbehandlung [Follow-Up Rehabilitation]',
    year: '2025–',
    description:
      "In 'Follow-Up Rehabilitation,' Herbert Stattler secretly maps his rehab clinic, blending on-site blue lines with studio shadows and hollow patient silhouettes.",
    imageUrl: '/works/anschlussheilbehandlung.jpg',
    aspectRatio: 1,
  },
  {
    id: 'lace-ware-album',
    title: 'Lace Ware. An Album 1900–1954',
    year: '2025',
    description:
      "An artist's book based on historical lace samples and archival material, reflecting on ornament, craftsmanship, female labor, and cultural memory.",
    imageUrl: '/works/lace-ware-album.jpg',
    aspectRatio: 1.5,
  },
  {
    id: 'spitzenwaren-album',
    title: 'Spitzenwaren. Ein Album 1900–1954',
    year: '2025',
    description:
      "An artist's book based on historical lace samples and archival material from the early 20th century.",
    imageUrl: '/works/spitzenwaren-album.jpg',
    aspectRatio: 1.5,
  },
  {
    id: 'spitzenwaren',
    title: 'Spitzenwaren [Lace Ware]',
    year: '2021–2024',
    description:
      'A conceptual art project based on historical lace samples, reflecting on ornament, craftsmanship, and cultural memory.',
    imageUrl: '/works/spitzenwaren.jpg',
    aspectRatio: 1,
  },
  {
    id: 'zeichnungen',
    title: 'Zeichnungen für Kinder und Erwachsene [Drawings for Children and Adults]',
    year: '2011–2020',
    description:
      'A series of 7 drawings reinterprets 1970s sex education imagery through abstraction, questioning perception, visibility, and representation.',
    imageUrl: '/works/zeichnungen.jpg',
    aspectRatio: 1,
  },
  {
    id: 'mf-ordnung',
    title: 'M. F. Die Ordnung der Dinge [M. F. The Order of Things]',
    year: '2006–2020',
    description:
      "A unique artist book exploring Michel Foucault's work through hand-copying and strategic erasure.",
    imageUrl: '/works/mf-ordnung.jpg',
    aspectRatio: 1.5,
  },
  {
    id: 'where-do-little-children',
    title: 'Where do little children come from?',
    year: '2018',
    description:
      "An artist's book featuring 42 pencil drawings inspired by a 1957 sex education publication.",
    imageUrl: '/works/where-do-little-children.jpg',
    aspectRatio: 1.5789,
  },
  {
    id: 'woher-kommen-kinder',
    title: 'Woher kommen die kleinen Kinder?',
    year: '2018',
    description:
      'Reinterprets a 1957 sex education publication through 42 detailed pencil drawings.',
    imageUrl: '/works/woher-kommen-kinder.jpg',
    aspectRatio: 1.5625,
  },
  {
    id: 'grundkurs',
    title: 'Grundkurs im wissenschaftlichen Definieren [Basic Course in Scientific Definition]',
    year: '2009–2020',
    description:
      'A conceptual art project exploring language and definition.',
    imageUrl: '/works/grundkurs.jpg',
    aspectRatio: 1.3393,
  },
  {
    id: 'klandestine',
    title: 'Klandestine Geschichten [Clandestine Stories]',
    year: '2015–2016',
    description:
      'A compelling series of 42 drawings that delve into hidden narratives.',
    imageUrl: '/works/klandestine.jpg',
    aspectRatio: 1,
  },
  {
    id: 'wb-schriften',
    title: 'W. B. Gesammelte Schriften [W. B. Selected Writings]',
    year: '2007–2020',
    description: 'A profound visual exploration of selected writings.',
    imageUrl: '/works/wb-schriften.jpg',
    aspectRatio: 1.2448,
  },
  {
    id: 'reserve-shelf',
    title: 'Reserve Shelf [Handapparat]',
    year: '2011–2021',
    description: 'An archival artist project exploring reference systems and stored knowledge.',
    imageUrl: '/works/reserve-shelf.jpg',
    aspectRatio: 0.7371,
  },
  {
    id: 'ornament-stadt',
    title: 'Ornament Stadt [Ornament City]',
    year: '2014',
    description: 'Drawings examining ornament and urban space.',
    imageUrl: '/works/ornament-stadt.jpg',
    aspectRatio: 1.5,
  },
  {
    id: 'so-many-questions',
    title: 'So many Questions [So viele Fragen]',
    year: '2010',
    description:
      "Reframes Hans Ulrich Obrist's inquiries into a scripted dialogue — an ironic look at art and the artist's persona.",
    imageUrl: '/works/so-many-questions.svg',
    aspectRatio: 1,
  },
  {
    id: 'stadtleitbilder',
    title: 'Stadtleitbilder [Urban Models]',
    year: '2009–2010',
    description: 'Drawings based on urban planning models and modernist city visions.',
    imageUrl: '/works/stadtleitbilder.jpg',
    aspectRatio: 1,
  },
  {
    id: 'depot',
    title: 'Depot [Storage]',
    year: '2009',
    description: 'A series exploring storage, archives, and accumulated objects.',
    imageUrl: '/works/depot.jpg',
    aspectRatio: 1,
  },
  {
    id: 'heimliche-braeute',
    title: 'Heimliche Bräute. Eheliches Glück. [Backdoor Brides »Marital Bliss«]',
    year: '2009–2020',
    description: 'Drawings examining marriage imagery and hidden domestic narratives.',
    imageUrl: '/works/heimliche-braeute.jpg',
    aspectRatio: 1.6393,
  },
  {
    id: 'sup-supri-suprema',
    title: 'Sup.Supri.Suprema, Familie [Sup.Supri.Suprema, Family]',
    year: '2006',
    description: 'A drawing series exploring family structures and social ideals.',
    imageUrl: '/works/sup-supri-suprema.jpg',
    aspectRatio: 1.3544,
  },
  {
    id: 'letter-652',
    title: 'Letter 652 [Brief 652]',
    year: '2007',
    description: 'A paper object work based on archival correspondence.',
    imageUrl: '/works/letter-652.jpg',
    aspectRatio: 1.3333,
  },
  {
    id: 'schreibtische',
    title: 'Schreibtische [Desks]',
    year: '2004–2006',
    description:
      'A systematic mapping of workspaces through precise pencil drawings.',
    imageUrl: '/works/schreibtische.jpg',
    aspectRatio: 1.5385,
  },
]
