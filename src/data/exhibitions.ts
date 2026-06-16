export type ExhibitionType = 'solo' | 'group'

export interface Exhibition {
  id: string
  title: string
  venue: string
  location: string
  year: number
  type: ExhibitionType
  /** ISO-like display dates when known */
  dates?: string
  description?: string
  imageUrl?: string
  imageCredit?: string
  sourceUrl?: string
  featured?: boolean
}

/** Based on https://herbertstattler.com/about.html — prominent entries include researched descriptions & images. */
export const exhibitions: Exhibition[] = [
  // —— Solo (featured) ——
  {
    id: 'spitzenwaren-sala-2025',
    title: 'Spitzenwaren',
    venue: 'Galerie Vincenz Sala',
    location: 'Berlin, Germany',
    year: 2025,
    type: 'solo',
    dates: '12 April – 10 May 2025',
    featured: true,
    imageUrl: '/exhibitions/spitzenwaren-sala-2025.jpg',
    sourceUrl: 'https://www.vsala.com/Vincenz_Sala_past_shows.html',
    description:
      'Solo exhibition accompanying the publication of Spitzenwaren. Ein Album 1900–1954. Thirty-eight graphite drawings based on the archives of a Stuttgart lace company trace female home-based labour, ornament, and twentieth-century social history. The closing event included a book presentation with texts by Martin Bauer.',
  },
  {
    id: 'spitzenwaren-wiedmann-2022',
    title: 'Spitzenwaren',
    venue: 'Galerie Wiedmann',
    location: 'Stuttgart, Germany',
    year: 2022,
    type: 'solo',
    dates: '24 September – 5 November 2022',
    featured: true,
    imageUrl: '/exhibitions/spitzenwaren-wiedmann-2022.jpg',
    sourceUrl: 'https://galeriewiedmann.de/produkt-ausstellung/spitzenwaren/',
    description:
      'The first major presentation of the Spitzenwaren drawing series in Stuttgart—the city where the historic lace firm operated. Stattler translated pattern templates and business archives into medallion-shaped pencil drawings, described by the gallery as “drawn time capsules” of aesthetic and economic history from the turn of the century to the post-war years.',
  },
  {
    id: 'stadtleitbilder-kulturforum-2014',
    title: 'Stadtleitbilder',
    venue: 'Österreichisches Kulturforum Berlin',
    location: 'Berlin, Germany',
    year: 2014,
    type: 'solo',
    featured: true,
    imageUrl: '/exhibitions/stadtleitbilder-kulturforum-2014.jpg',
    sourceUrl: 'https://kulturforumberlin.at/netzwerk/herbert-stattler/',
    description:
      'Solo show of the Stadtleitbilder drawing cycle, in which historical urban planning diagrams—from Hobrecht to Le Corbusier—are mirrored and repeated until ideal cities become ornamental patterns. The exhibition coincided with the publication of Ornament Stadt (Spector Books, 2014).',
  },
  {
    id: 'depot-tuebingen-2009',
    title: 'Depot',
    venue: 'Stadtmuseum Tübingen',
    location: 'Tübingen, Germany',
    year: 2009,
    type: 'solo',
    dates: 'September – October 2009',
    imageUrl: '/exhibitions/depot-stadtmuseum-tuebingen.jpg',
    imageCredit: 'Stadtmuseum Tübingen / Kunst im Dialog',
    sourceUrl: 'https://www.tuebingen.de/1520/12840.html',
    description:
      'Part of the museum’s Kunst im Dialog series: months of artistic research in the museum depot yielded sketches, seven large drawings, and paper objects focused on the protrusions of stored artefacts that exceed the regular grid of the shelves—a study of archival order and its disruptions.',
  },
  {
    id: 'schreibtische-nuertingen-2008',
    title: 'Schreibtische',
    venue: 'Kunstverein Nürtingen',
    location: 'Nürtingen, Germany',
    year: 2008,
    type: 'solo',
    imageUrl: '/exhibitions/schreibtische-nuertingen-2008.jpg',
    description:
      'Presentation of the Desks series: precise pencil renderings mapping individual workspaces as systematic portraits of contemporary labour and everyday organisation.',
  },
  {
    id: 'suprema-solitude-2007',
    title: 'Sup.Supri.Suprema, Familie',
    venue: 'Akademie Schloss Solitude',
    location: 'Stuttgart, Germany',
    year: 2007,
    type: 'solo',
    imageUrl: '/works/sup-supri-suprema.jpg',
    description:
      'Solo presentation at the Akademie Schloss Solitude of a drawing series examining family structures and normative social ideals through serial pencil work.',
  },
  // —— Group (featured) ——
  {
    id: 'freud-on-the-couch-2018',
    title: 'Freud on the Couch – Psyche in the Book',
    venue: 'The Center for Book Arts / Perlman Teaching Museum / San Francisco Center for the Book',
    location: 'New York, Minnesota & San Francisco, USA',
    year: 2018,
    type: 'group',
    dates: 'April 2018 – January 2019',
    featured: true,
    imageUrl: '/exhibitions/freud-on-the-couch-2018.jpg',
    sourceUrl: 'https://www.sfcb.org/exhibitions-archive/freud-on-the-couch-psyche-in-the-book',
    description:
      'Traveling group exhibition curated by Susanne Padberg on psychoanalysis and the artist’s book. Stattler participated with work related to his artist’s book Woher kommen die kleinen Kinder?, alongside international book artists exploring desire, dreams, and Freudian concepts.',
  },
  {
    id: 'fremde-heimat-2010',
    title: 'Fremde Heimat',
    venue: 'Kunsthalle Mannheim',
    location: 'Mannheim, Germany',
    year: 2010,
    type: 'group',
    dates: '28 March – 20 June 2010',
    imageUrl: '/exhibitions/fremde-heimat-2010.jpg',
    sourceUrl: 'https://www.wunderhorn.de/?buecher=fremde-heimat',
    description:
      'Large group survey Kunst in Baden-Württemberg with more than forty artists reflecting on home, identity, and migration. Stattler’s Stadtleitbilder were included; the catalogue features an essay on his work by Andrea Schmidt.',
  },
  {
    id: 'paperworks-heidenheim-2023',
    title: 'Paperworks. Skulptur aus Papier und Pappe',
    venue: 'Kunstmuseum Heidenheim',
    location: 'Heidenheim, Germany',
    year: 2023,
    type: 'group',
    featured: true,
    imageUrl: '/works/letter-652.jpg',
    description:
      'Group exhibition on sculpture in paper and cardboard, including Stattler’s paper-based architectural and archival works such as Letter 652.',
  },
  // —— Solo (list) ——
  {
    id: 'stadtleitbilder-sander-2011',
    title: 'Stadtleitbilder',
    venue: 'Studio of Karin Sander',
    location: 'Berlin, Germany',
    year: 2011,
    type: 'solo',
  },
  {
    id: 'schreibtische-neukoelln-2006',
    title: 'Schreibtische',
    venue: '8. Kunst- und Kulturfestival 48 Stunden Neukölln',
    location: 'Berlin, Germany',
    year: 2006,
    type: 'solo',
  },
  {
    id: 'skin-stuttgart-2004',
    title: 'skin',
    venue: 'Theaterhaus Stuttgart',
    location: 'Stuttgart, Germany',
    year: 2004,
    type: 'solo',
  },
  {
    id: 'skin-lille-2004',
    title: 'skin',
    venue: 'Opéra de Lille',
    location: 'Lille, France',
    year: 2004,
    type: 'solo',
  },
  // —— Group (list) ——
  {
    id: 'spitzen-faden-hamburg-2026',
    title: 'Spitzen & Fäden – Das Gedächtnis der Muster',
    venue: 'Künstlerhaus Sootbörn',
    location: 'Hamburg, Germany',
    year: 2026,
    type: 'group',
  },
  {
    id: 'narrative-moments-stuttgart-2026',
    title: 'Narrative Moments',
    venue: 'Kunstbezirk Galerie im Gustav-Siegle-Haus',
    location: 'Stuttgart, Germany',
    year: 2026,
    type: 'group',
  },
  {
    id: 'paroles-sala-two-2026',
    title: 'Paroles… Group Show Two',
    venue: 'Galerie Vincenz Sala',
    location: 'Berlin, Germany',
    year: 2026,
    type: 'group',
  },
  {
    id: 'paroles-sala-one-2025',
    title: 'Paroles… Group Show One',
    venue: 'Galerie Vincenz Sala',
    location: 'Berlin, Germany',
    year: 2025,
    type: 'group',
  },
  {
    id: 'papier-bamberg-2021',
    title: 'Papier',
    venue: 'Stadtgalerie Villa Dessauer, Kunstverein Bamberg',
    location: 'Bamberg, Germany',
    year: 2021,
    type: 'group',
  },
  {
    id: 'gegen-blicke-berlin-2020',
    title: 'Gegen Blicke',
    venue: 'COPYRIGHTberlin',
    location: 'Berlin, Germany',
    year: 2020,
    type: 'group',
  },
  {
    id: 'best-of-2018-vienna',
    title: 'Best of 2018!',
    venue: 'Galerie Druck & Buch',
    location: 'Vienna, Austria',
    year: 2019,
    type: 'group',
  },
  {
    id: 'lustgarten-neuhausen-2018',
    title: 'Lustgarten',
    venue: 'Kunstverein Neuhausen',
    location: 'Neuhausen, Germany',
    year: 2018,
    type: 'group',
  },
  {
    id: 'time-in-vienna-2015',
    title: 'Time In – Zeit im Künstlerbuch',
    venue: 'Galerie Druck & Buch',
    location: 'Vienna, Austria',
    year: 2015,
    type: 'group',
  },
  {
    id: 'artists-book-szekesfehervar-2013',
    title: '5th International Artists’ Book Exhibition',
    venue: 'King St. Stephen Museum',
    location: 'Székesfehérvár, Hungary',
    year: 2013,
    type: 'group',
  },
  {
    id: 'correspondence-neuhausen-2007',
    title: 'Correspondence',
    venue: 'Kunstverein Neuhausen',
    location: 'Neuhausen, Germany',
    year: 2007,
    type: 'group',
  },
  {
    id: 'sinne-berlin-2003',
    title: 'Sinne und Sinnlichkeit',
    venue: 'Collegium Hungaricum',
    location: 'Berlin, Germany',
    year: 2003,
    type: 'group',
  },
  {
    id: 'moving-territories-2003',
    title: 'Moving Territories. Kunst – Öffentlichkeit – Neue Medien',
    venue: 'Akademie Schloss Solitude',
    location: 'Stuttgart, Germany',
    year: 2003,
    type: 'group',
  },
  {
    id: 'innere-szene-wien-2001',
    title: 'Innere Szene Wien',
    venue: 'MAK / Russian Art Museum Pärnu / Gallery NoMi',
    location: 'Vienna, Pärnu & St. Petersburg',
    year: 2001,
    type: 'group',
  },
  {
    id: 'unsichtbare-architekturen-2001',
    title: 'Unsichtbare Architekturen',
    venue: 'Museumsquartier',
    location: 'Vienna, Austria',
    year: 2001,
    type: 'group',
  },
  {
    id: 'hinter-dem-laerm-1999',
    title: 'hinter dem lärm',
    venue: 'Galerie Grita Insam',
    location: 'Vienna, Austria',
    year: 1999,
    type: 'group',
  },
]

export const featuredExhibitions = exhibitions
  .filter((e) => e.featured)
  .sort((a, b) => b.year - a.year)

export const soloExhibitions = exhibitions
  .filter((e) => e.type === 'solo')
  .sort((a, b) => b.year - a.year)

export const groupExhibitions = exhibitions
  .filter((e) => e.type === 'group')
  .sort((a, b) => b.year - a.year)

export const exhibitionsIntro =
  'Over the years, my drawings have found their way into galleries, museums, and book spaces across Europe and the United States. Below are the exhibitions that meant the most to me—starting with the most recent—with a few images and notes on what was shown.'

export const exhibitionsNav = [
  { id: 'featured', shortLabel: 'Highlights' },
  { id: 'solo', shortLabel: 'Solo exhibitions' },
  { id: 'group', shortLabel: 'Group exhibitions' },
] as const
