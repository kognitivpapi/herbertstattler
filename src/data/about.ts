export interface AboutListSection {
  id: string
  title: string
  items: string[]
}

export const aboutIntro =
  'Herbert Stattler is a Berlin-based artist whose work centres on drawing. Through meticulously rendered series—often years in the making—he examines urban models, archival histories, ornament, and the politics of looking. His drawings and artist\'s books have been shown across Europe and the United States.'

export const aboutPortrait = {
  imageUrl: '/about/portrait.jpg',
  alt: 'Portrait photo of Herbert Stattler',
  credit: 'Katherina Lochmann © kalo.at',
}

export const aboutBiography: string[] = [
  'For me, drawing is one of the most fascinating artistic media. Its vocabulary and materials are limitless. Drawings are the visible traces of the artist\'s imagination and creative hand that remain after the work has been executed. I am fascinated by the perfection of the hand. How precisely can I render a line, how much control do I have over the paper? If you look at my drawings, you might almost think they have been produced by a machine. This aspiration to perfection forces me to go slowly and enables me to explore the limits of drawing, objects and my own hand.',
  'Order on the desk, the ideal of the city and sex education are some of the themes of my work, which I develop into work series after detailed research. Here the procedure is always the same: preliminary work on the content and experiments with the paper are carried out in parallel until I have found a form that is valid for me. This may be geared, for example, to the form of the geographical map, to a pattern repeat or dot matrix printing. Over the course of months and years this gives rise to my series of drawings.',
]

export const aboutNav = [
  { id: 'biography', shortLabel: 'Biography' },
  { id: 'residencies', shortLabel: 'Residencies' },
  { id: 'awards', shortLabel: 'Awards' },
  { id: 'lectures', shortLabel: 'Lectures' },
  { id: 'exhibition-designs', shortLabel: 'Exhibition designs' },
  { id: 'publications', shortLabel: 'Publications' },
  { id: 'bibliography', shortLabel: 'Bibliography' },
] as const

export const aboutSections: AboutListSection[] = [
  {
    id: 'residencies',
    title: 'Residencies',
    items: [
      'Artist-in-Residence-Program Akademie Schloss Solitude; Stuttgart, Germany, 2002-03',
    ],
  },
  {
    id: 'awards',
    title: 'Awards',
    items: [
      'Longlist of Stiftung Buchkunst »Die schönsten deutschen Bücher 2025« with »Spitzenwaren. Ein Album 1900-1954« Germany, 2025',
      'Publication funding State of Berlin, Germany, 2024',
      'Publication funding Federal Ministry for Arts, Culture, the Civil Service and Sport, AT, 2024',
      'Publication funding Bildrecht Wien, AT, 2024',
      'Stiftung Kunstfonds Grant Neustartplus, Germany, 2023',
      'Stiftung Kunstfonds Grant Neustart Kultur, Germany, 2022',
      'Stiftung Kunstfonds Grant Neustart Kultur, Germany, 2020/21',
      'Longlist of Stiftung Buchkunst »Die schönsten deutschen Bücher 2015« with »Ornament Stadt« Germany, 2015',
      'Artist Viewing Program, The Drawing Center; New York City, USA, 2012-',
      'Joseph Binder Award, Räumliche Gestaltung; Austria, 2003 *',
      'Margarethe Schütte-Lihotzky Projektstipendium, BKA Sektion Kunst; Austria, 2001 *',
      'Complimentary Award for »Experimentelle Tendenzen in der Architektur 2000« BKA Sektion Kunst; Austria, 2000 *',
      'Prize Winner of Eternit-Ideen-Wettbewerb; Austria, 1995 **',
      'Scholarship for Studying Abroad; University of Michigan, School of Art & College of Architecture; USA, 1993',
    ],
  },
  {
    id: 'lectures',
    title: 'Lectures and Presentations',
    items: [
      'Herbert Stattler in conversation with Nora Karches about »Spitzenwaren. Ein Album 1900-1954« in the radio programme Büchermarkt on Deutschlandfunk Kultur, 2025',
      'Artist Talk with Susanne Padberg »Spitzenwaren. Ein Album 1900–1954« Galerie Druck & Buch; Vienna, Austria, 2025',
      'Book presentation of »Lace Ware. An Album 1900–1954« with Anke te Heesen and her book »Frauen vor Mustern« Buchhandlung Korn; Wesel, Germany, 2025',
      'Artist Talk and book launch with Martin Bauer and Helmut Völter »Spitzenwaren. Ein Album 1900–1954« Galerie Vincenz Sala; Berlin, Germany, 2025',
      'Artist Talk with Notburga Karl »Papier« Stadtgalerie Villa Dessauer, Kunstverein Bamberg; Bamberg, Germany, 2021',
      'Artist Talk with Beate Absalon »Gegen Blicke« COPYRIGHTberlin; Berlin, Germany, 2020',
      'Artist Talk with Margarete Vöhringer »Woher kommen die kleinen Kinder?« galerie oqbo; Berlin, Germany, 2019',
      'Artist Talk with B. Cella »Woher kommen die kleinen Kinder?« Salon für Kunstbuch, Belvedere 21. Museum of Contemporary Art; Vienna, Austria, 2019',
      'Artist Talk with Susanne Padberg »Woher kommen die kleinen Kinder?« Galerie Druck & Buch; Vienna, Austria, 2018',
      'Lecture Talk »Stadtleitbilder« at symposium »In/Visible City« Bauhaus-Universität Weimar; Weimar, Germany, 2016',
      'Lecture Talk »Depot« at symposium »Salon Kunst & Wissenschaft: Archive« Experimentiertheater der Friedrich-Alexander-Universität Erlangen-Nürnberg; Erlangen, Germany, 2016',
      'Lecture Talk »Schreibtische« at »Aus der Praxis: Fotografische Kunst heute« Tübinger Kunstgeschichtliche Gesellschaft e.V.; Tübingen, Germany, 2009',
      'Workshop »Leerstellen« Filmakademie Baden-Württemberg within the 17. Stuttgarter Filmwinter, Stuttgart, Germany, 2004 *',
      'Workshop »Begehbare Räume« Pädagogisches Institut Salzburg, Teacher training; Salzburg, Austria, 2004 *',
      'Lecture »Works« Media-Space 03; Stuttgart, Germany 2003 *',
      'Lecture »Works« Architektur der Moderne - Interface zwischen Phantasma und Realität; Internationales Forschungszentrum Kulturwissenschaften; Vienna, Austria, 2003 *',
    ],
  },
  {
    id: 'exhibition-designs',
    title: 'Exhibition Designs',
    items: [
      '»inausnach salzburg« Architektur im Ringturm; Vienna, Austria; Curator: Sascha Pirker, 2003 *',
      '»Global Tools« Künstlerhaus Wien; Vienna, Austria; Curators: Tulga Beyerle, Vitus H. Weh, 2001 *',
      '* in collaboration with J. Augustinovic; ** J. Augustinovic and B. Brus, *** J. Augustinovic, E. Brand and M. Stauffer, **** C. Meisner',
    ],
  },
  {
    id: 'publications',
    title: 'Publications',
    items: [
      'Book »Lace Ware. An Album 1900–1954« Herbert Stattler, published by Spector Books, Leipzig 2025, ISBN 978-3-95905-884-1',
      'Book »Spitzenwaren. Ein Album 1900-1954« Herbert Stattler, published by Spector Books, Leipzig 2025, ISBN 978-3-95905-883-4',
      'Book »Woher kommen die kleinen Kinder?« Herbert Stattler, published by Spector Books, Leipzig 2018, ISBN DE 978-3-95905-216-0',
      'Book »Where do little kids come from?« Herbert Stattler, published by Spector Books, Leipzig 2018, ISBN 978-3-95905-217-7',
      'Book »Ornament Stadt« Herbert Stattler, published by Spector Books, Leipzig 2014, ISBN 978–3–944669–40–3',
    ],
  },
  {
    id: 'bibliography',
    title: 'Bibliography',
    items: [
      'Contribution by Nora Karches, »Adventskalender: Spitzenwaren von Stattler Herbert [Advent Calendar: Lace Ware from Stattler Herbert]« in the radio programme Büchermarkt on Deutschlandfunk Kultur, 2025',
      'Guest Contribution Herbert Stattler and Martin Bauer, »Between Delicate Beauty and Harsh Reality – Lace Ware. An Album 1900–1954« from: Lace in Context, ed. by Nicolette Makovicky and David Hopkin, University of Oxford. Accessed December 2025',
      'Gregor Auenhammer, »Ornament & Verbrechen«, Review of Spitzenwaren. Ein Album 1900-1954, by Herbert Stattler, Der Standard, August 30, 2025, Album A 7.',
      'Contribution »Untitled (Was ist ein Buch)« from: Über Bücher. 101 Texte und Bilder für Michael Hagner, ed. by Ines Barner, Stephan Graf, Nils Güttler, Niki Rhyner, Vera Wolff and Monika Wulz, Wallstein Verlag, 2025, pp. 143-145, ISBN 978-3-8353-5850-4',
      'Contribution Pia Müller-Tamm/Charles T. Dryer, »Herbert Stattlers \'Zeichnungen für Kinder und Erwachsene\' in kunsthistorischer und juristischer Perspektive« from: Gestaltung der Informationsrechtsordnung. Festschrift für Thomas Dreier zum 65. Geburtstag, ed. by Alexander Peukert, Nomos, 2024, pp. 537-554, ISBN 978-3-8487-7565-5',
      'Contribution »Papier: Die Jahresausstellung des Kunstvereins Bamberg [Paper: The annual exhibition of the Bamberg Kunstverein]« from: Kunstforum International, Vol. 285, 2022, pp. 142-143',
      'Contribution »Herbert Stattler« from: Freud on the Couch – Psyche in the Book, The Center for Book Arts, Minnesota Center for Book Arts, 2020, pp. 4-5',
      'Contribution »Austria Kultur International, Jahrbuch der Österreichischen Auslandskultur 2014« ed. by Bundesministerium für Europa, Integration und Äußeres, Wien 2014, pp. 86-87, ISBN 978-3-902531-42-3',
      'Contribution »Kreative Störfälle – (Un)gewöhnlicher Dingumgang in ästhetischen Bildungsprozessen«, ed. by Christine Heilmann and others, transcript, 2013, pp. 71-84, ISBN 978-3-8376-2255-5',
      'Contribution Levin Klocker, »Komet – Persönlich: Interview mit Herbert Stattler«, from: Kosmos Österreich 47, ed. by Österreichisches Kulturforum Berlin, 2012, pp. 28-29',
      'Contribution »Stattler Herbert«, from: …A New Surprise… For Our Readers! Fifth International Artists\' Book Exhibition, Beijing 2011, pp. 86-87',
      'Essay Michael Hagner, »Stadtleitbilder«, from: Was ist ein Bild? Antworten in Bildern. Gottfried Boehm zum 70. Geburtstag, ed. by Ulrich Pfisterer and others, Fink, 2015, pp. 89-96, ISBN 978-3-7705-5934-3',
      'Essay Andrea Schmidt, »Stadtleitbilder«, from: Fremde Heimat, ed. by Ulrike Lorenz, Kunsthalle Mannheim. Verlag Das Wunderhorn, 2010, pp. 56-61, ISBN 978-3-88423-311-3',
      'Catalog »Depot | Herbert Stattler, Kunst im Dialog mit dem Stadtmuseum«, ed. by Evamarie Blattner and Karlheinz Wiegmann, Stadtmuseum Tübingen, 2009, ISBN 978-3-00-027789-4',
      'Catalog »Schreibtische | Desks, Herbert Stattler« ed. by Kunstverein Nürtingen, Nürtingen 2008, ISBN 978-3-00-025807-7',
      'Contribution »Zwischen zwei Terminen oder in einer Pause«, from: Ein Magazin über Orte, No.4 Herbst 2008, ed. by E. Bamberger, pp. 34-35',
    ],
  },
]
