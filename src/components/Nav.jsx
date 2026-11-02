import { PORTFOLIO_URL } from '../config'

export default function Nav() {
  return (
    <header className="nav container">
      <a className="nav-logo" href="#/">
        <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M10 4v24" />
          <circle cx="10" cy="8" r="2.6" />
          <circle cx="10" cy="24" r="2.6" />
          <path d="M10 10c0 6 12 3 12 9" opacity="0.55" />
          <path d="M22 19v9M18.5 22.5h7" />
        </svg>
        <span className="logo-text">
          repo<span className="logo-slash">/</span>graveyard
        </span>
      </a>
      <nav className="nav-links">
        <a href="#/graveyard">Sample</a>
        <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer">
          Portfolio ↗
        </a>
      </nav>
    </header>
  )
}
