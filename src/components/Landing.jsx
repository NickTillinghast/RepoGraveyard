import { LanguageTag } from './TombstoneCard'

const steps = [
  { title: '01 · Connect', body: 'OAuth with GitHub. We only ask to read public repos.' },
  { title: '02 · Exhume', body: 'Repos untouched for 12+ months are declared dead and diagnosed.' },
  { title: '03 · Mourn & share', body: 'Filter, sort and share your graveyard as a card.' },
]

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

export default function Landing({ featured }) {
  return (
    <>
      <main className="container hero">
        <section className="hero-copy">
          <span className="eyebrow">A GitHub afterlife</span>
          <h1 className="display hero-title">
            <span>Every repo dies.</span>
            <em className="muted">Some deserve a eulogy.</em>
          </h1>
          <p className="lede">
            Sign in with GitHub and we'll exhume your abandoned projects, diagnose the cause of
            death, and give each one the headstone it earned.
          </p>
          <div className="actions">
            <a className="btn btn-primary" href="#/graveyard">Tour a sample graveyard</a>
            <button type="button" className="btn btn-ghost" disabled title="Coming soon">
              <GitHubIcon />
              Sign in with GitHub
              <span className="soon">soon</span>
            </button>
          </div>
          <span className="mono fine">read-only scope · public repos · nothing stored</span>
        </section>

        <a className="stone stone-hero" href={`#/repo/${encodeURIComponent(featured.name)}`}>
          <span className="rip">R · I · P</span>
          <span className="stone-name">{featured.name}</span>
          <span className="stone-dates">{featured.range}</span>
          <span className="stone-rule" />
          <span className="epitaph">“{featured.epitaph}”</span>
          <span className="tags">
            <span className="tag tag-cause">{featured.cause}</span>
            <LanguageTag repo={featured} />
          </span>
          <span className="mono fine">last words: "{featured.lastWords}"</span>
        </a>
      </main>

      <section className="container steps">
        {steps.map((step) => (
          <div key={step.title} className="step">
            <span className="step-title">{step.title}</span>
            <span>{step.body}</span>
          </div>
        ))}
      </section>
    </>
  )
}
