import { useMemo, useState } from 'react'
import ChipGroup from './ChipGroup'
import TombstoneCard from './TombstoneCard'
import { ERAS, SORTS, filterRepos, summarize } from '../lib/graveyard'

export default function Graveyard({ repos }) {
  const [language, setLanguage] = useState('All')
  const [era, setEra] = useState('any')
  const [sort, setSort] = useState('dead')
  const [query, setQuery] = useState('')

  const languages = useMemo(
    () => ['All', ...new Set(repos.map((r) => r.language))].map((l) => ({ id: l, label: l })),
    [repos],
  )
  const visible = useMemo(
    () => filterRepos(repos, { language, era, query, sort }),
    [repos, language, era, query, sort],
  )
  const stats = summarize(visible)

  return (
    <main className="container graveyard">
      <section className="graveyard-head">
        <div className="stack">
          <span className="eyebrow">Sample graveyard</span>
          <h1 className="display">
            Here lie <em className="accent">{stats.count}</em> repos.
          </h1>
        </div>
        <dl className="stats">
          <div>
            <dt>avg lifespan</dt>
            <dd>{stats.avgLife}</dd>
          </div>
          <div>
            <dt>commits lost</dt>
            <dd>{stats.commits}</dd>
          </div>
          <div>
            <dt>stars unclaimed</dt>
            <dd>{stats.stars}</dd>
          </div>
        </dl>
      </section>

      <section className="filters" aria-label="Filters">
        <div className="filter-row">
          <label className="filter-label" htmlFor="search">search</label>
          <input
            id="search"
            className="search"
            type="search"
            placeholder="find a grave…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ChipGroup label="language" options={languages} value={language} onChange={setLanguage} />
        <ChipGroup label="in the ground" options={ERAS} value={era} onChange={setEra} />
        <ChipGroup label="sort by" options={SORTS} value={sort} onChange={setSort} />
      </section>

      {visible.length === 0 ? (
        <div className="empty">
          <p className="empty-title">Nothing buried here. Yet.</p>
          <span className="mono muted">try loosening your filters</span>
        </div>
      ) : (
        <section className="stone-grid">
          {visible.map((repo) => (
            <TombstoneCard key={repo.name} repo={repo} />
          ))}
        </section>
      )}
    </main>
  )
}
