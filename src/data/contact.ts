export interface GalleryContact {
  id: string
  name: string
  location: string
  url: string
}

export const contactIntro =
  'For inquiries about exhibitions, publications, or studio visits, please get in touch using the form below or via Instagram.'

export const contactStudio = {
  name: 'Herbert Stattler',
  street: 'Jahnstrasse 13',
  postalCode: '10967',
  city: 'Berlin',
  country: 'Germany',
}

export const contactInstagram = {
  handle: '@stattler_herbert',
  url: 'https://www.instagram.com/stattler_herbert/',
}

export const contactGalleries: GalleryContact[] = [
  {
    id: 'vincenz-sala',
    name: 'Galerie Vincenz Sala',
    location: 'Berlin, Germany',
    url: 'https://www.vsala.com/',
  },
  {
    id: 'galerie-wiedmann',
    name: 'Galerie Wiedmann',
    location: 'Stuttgart, Germany',
    url: 'https://galeriewiedmann.de/',
  },
]

export const contactFormLabels = {
  name: 'Your Name',
  email: 'Your Email',
  message: 'Your Message',
  submit: 'Send Message',
  successTitle: 'Thank you',
  successMessage:
    'Your message has been prepared. Please confirm sending in your email application.',
}
