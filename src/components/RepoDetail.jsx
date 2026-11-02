import { useEffect, useState } from 'react'
import { LanguageTag } from './TombstoneCard'
import { formatMonth, writeObituary } from '../lib/graveyard'

function ActivityChart({ repo }) {
  const peak = Math.max(...repo.activity, 1)
  const last = repo.activity.length - 1
  return (
    <section className="stack">
      <div className="section-head">
        <span className="eyebrow">Vital signs</span>
        <span className="mono muted small">commits per month</span>
      </div>
      <div
        className="bars"
        role="img"
        aria-label={`Commits per month from ${formatMonth(repo.bornIndex)} to ${formatMonth(repo.diedIndex)}, peaking at ${peak}`}
      >
        {repo.activity.map((count, i) => (
          <div
            key={i}
            className={i === last ? 'bar bar-last' : 'bar'}
            style={{ height: `${Math.max((count / peak) * 100, 2)}%` }}
            title={`${formatMonth(repo.bornIndex + i)}: ${count} commits`}
          />
        ))}
      </div>
      <div className="section-head mono small">
        <span className="muted">{formatMonth(repo.bornIndex)}</span>
        <span className="accent">last breath ↑</span>
      </div>
    </section>
  )
}

export default function RepoDetail({ repo }) {
  const [respects, setRespects] = useState(0)
  const [copied, setCopied] = useState(false)

  // Press F to pay respects (ignored while typing in a field)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() !== 'f' || e.metaKey || e.ctrlKey) return
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return
      setRespects((n) => n + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const shareEulogy = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="container detail">
      <div className="detail-stone-wrap">
        <a className="back mono" href="#/graveyard">← back to the graveyard</a>
        <div className="stone stone-hero stone-static">
          <span className="rip">R · I · P</span>
          <h1 className="stone-name">{repo.name}</h1>
          <span className="stone-dates">{repo.range}</span>
          <span className="stone-rule" />
          <p className="epitaph">“{repo.epitaph}”</p>
        </div>
      </div>

      <div className="detail-body">
        <section className="stack">
          <span className="eyebrow">Obituary</span>
          <p className="obituary">{writeObituary(repo)}</p>
        </section>

        <dl className="vitals">
          <div>
            <dt>cause of death</dt>
            <dd className="cause">{repo.cause}</dd>
          </div>
          <div>
            <dt>lifespan</dt>
            <dd>{repo.life}</dd>
          </div>
          <div>
            <dt>commits</dt>
            <dd>{repo.commits}</dd>
          </div>
          <div>
            <dt>language</dt>
            <dd><LanguageTag repo={repo} /></dd>
          </div>
        </dl>

        <ActivityChart repo={repo} />

        <section className="terminal mono">
          <span className="muted small">last words</span>
          <span className="faint">$ git log -1 --oneline</span>
          <span>{repo.lastWords}</span>
        </section>

        <div className="actions">
          <button type="button" className="btn btn-primary" onClick={shareEulogy}>
            {copied ? 'Link copied' : 'Share eulogy'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setRespects((n) => n + 1)}>
            Pay respects <kbd>F</kbd>
            {respects > 0 && <span className="accent mono">×{respects}</span>}
          </button>
        </div>
      </div>
    </main>
  )
}
