export function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="m12.575 16.982 3.673-3.854H4.8v-1.596h11.448l-3.674-3.854 1.152-1.096L19.2 12.33l-5.474 5.748-1.152-1.096Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 6H2M22 12.1616H2M22 18.8282H2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M19 19L5 5M19 5L5 19"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  )
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  )
}
