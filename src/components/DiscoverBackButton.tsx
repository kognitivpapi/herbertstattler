import { createPortal } from 'react-dom'
import { ArrowIcon } from './icons'

interface DiscoverBackButtonProps {
  onClick: () => void
}

export function DiscoverBackButton({ onClick }: DiscoverBackButtonProps) {
  return createPortal(
    <button type="button" className="discover-back-btn" onClick={onClick}>
      <span className="discover-back-btn__icon" aria-hidden>
        <ArrowIcon className="rotate-180" />
      </span>
      <span className="discover-back-btn__label">Back</span>
    </button>,
    document.body,
  )
}
