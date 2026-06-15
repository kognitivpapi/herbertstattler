import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { StickyMenu } from '../components/StickyMenu'
import { InstagramIcon } from '../components/icons'
import {
  contactFormLabels,
  contactGalleries,
  contactInstagram,
  contactIntro,
  contactStudio,
} from '../data/contact'
import '../styles/home.css'
import '../styles/contact.css'

interface ContactFormState {
  name: string
  email: string
  message: string
}

const initialForm: ContactFormState = {
  name: '',
  email: '',
  message: '',
}

export function ContactPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<ContactFormState>(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const subject = encodeURIComponent(`Contact from ${form.name}`)
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`,
    )
    const mailto = `mailto:?subject=${subject}&body=${body}`

    window.location.href = mailto
    setSubmitted(true)
    setForm(initialForm)
  }

  return (
    <div className="contact-page">
      <StickyMenu onNavigate={() => navigate('/')} />
      <main className="contact-page__content">
        <header className="contact-page__header">
          <h1 className="contact-page__title">Contact</h1>
          <p className="contact-page__intro">{contactIntro}</p>
        </header>

        <div className="contact-page__layout">
          <aside className="contact-page__aside" aria-label="Contact details">
            <a
              className="contact-page__instagram"
              href={contactInstagram.url}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
              <span>{contactInstagram.handle}</span>
            </a>

            <address className="contact-page__address">
              <span className="contact-page__address-name">{contactStudio.name}</span>
              <span>{contactStudio.street}</span>
              <span>
                {contactStudio.postalCode} {contactStudio.city}
              </span>
              <span>{contactStudio.country}</span>
            </address>

            <section className="contact-page__galleries" aria-labelledby="galleries-heading">
              <h2 id="galleries-heading" className="contact-page__galleries-title">
                Gallery representation
              </h2>
              <ul className="contact-page__gallery-list">
                {contactGalleries.map((gallery) => (
                  <li key={gallery.id}>
                    <a href={gallery.url} target="_blank" rel="noreferrer">
                      {gallery.name}
                    </a>
                    <span>{gallery.location}</span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

          <section className="contact-page__form-section" aria-labelledby="form-heading">
            <h2 id="form-heading" className="visually-hidden">
              Contact form
            </h2>

            {submitted ? (
              <div className="contact-page__success" role="status">
                <p className="contact-page__success-title">{contactFormLabels.successTitle}</p>
                <p className="contact-page__success-message">{contactFormLabels.successMessage}</p>
                <button
                  type="button"
                  className="contact-page__success-reset"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="contact-name">
                    {contactFormLabels.name}
                  </label>
                  <input
                    id="contact-name"
                    className="contact-form__input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="contact-email">
                    {contactFormLabels.email}
                  </label>
                  <input
                    id="contact-email"
                    className="contact-form__input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="contact-message">
                    {contactFormLabels.message}
                  </label>
                  <textarea
                    id="contact-message"
                    className="contact-form__textarea"
                    name="message"
                    rows={8}
                    value={form.message}
                    onChange={(event) => updateField('message', event.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="contact-form__submit">
                  {contactFormLabels.submit}
                </button>
              </form>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
