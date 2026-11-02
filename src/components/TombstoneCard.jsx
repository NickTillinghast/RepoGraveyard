export function LanguageTag({ repo }) {
  return (
    <span className="tag">
      <span className="lang-dot" style={{ background: repo.color }} />
      {repo.language}
    </span>
  )
}

export default function TombstoneCard({ repo }) {
  return (
    <a className="stone" href={`#/repo/${encodeURIComponent(repo.name)}`}>
      <span className="rip">R · I · P</span>
      <span className="stone-name">{repo.name}</span>
      <span className="stone-dates">{repo.range}</span>
      <span className="stone-rule" />
      <span className="epitaph">“{repo.epitaph}”</span>
      <span className="tags">
        <span className="tag tag-cause">{repo.cause}</span>
        <LanguageTag repo={repo} />
      </span>
      <span className="stone-footer">
        <span>lived {repo.life}</span>
        <span>dead {repo.dead}</span>
      </span>
    </a>
  )
}
