import { PORTFOLIO_URL } from '../config'

export default function Nav() {
  return (
    <header className="nav container">
      <a className="nav-logo" href="#/">
        <span className="logo-mark">&lt;NT/&gt;</span>
        <span className="logo-path">/ graveyard</span>
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
