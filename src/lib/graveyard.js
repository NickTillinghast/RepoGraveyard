const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// GitHub linguist colors
export const LANGUAGE_COLORS = {
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  Python: '#3572A5',
  Shell: '#89E051',
  Rust: '#DEA584',
  Ruby: '#CC342D',
  HTML: '#E34C26',
}

export const ERAS = [
  { id: 'any', label: 'Any', test: () => true },
  { id: 'lt5', label: '< 5 years', test: (years) => years < 5 },
  { id: '5to7', label: '5–7 years', test: (years) => years >= 5 && years < 7 },
  { id: '7plus', label: '7+ years', test: (years) => years >= 7 },
]

export const SORTS = [
  { id: 'dead', label: 'Longest dead', compare: (a, b) => b.deadMonths - a.deadMonths },
  { id: 'short', label: 'Shortest life', compare: (a, b) => a.lifeMonths - b.lifeMonths },
  { id: 'stars', label: 'Most stars', compare: (a, b) => b.stars - a.stars },
]

// "2021-04" -> months since year 0, so differences are month counts
function toMonthIndex(yearMonth) {
  const [year, month] = yearMonth.split('-').map(Number)
  return year * 12 + month - 1
}

function currentMonthIndex() {
  const now = new Date()
  return now.getFullYear() * 12 + now.getMonth()
}

export function formatMonth(index) {
  return `${MONTHS[index % 12]} ${Math.floor(index / 12)}`
}

export function formatDuration(months) {
  if (months < 1) return '< 1 mo'
  const years = Math.floor(months / 12)
  const rest = months % 12
  if (!years) return `${rest} mo`
  return rest ? `${years}y ${rest}m` : `${years}y`
}

export function enrichRepo(repo) {
  const born = toMonthIndex(repo.born)
  const died = toMonthIndex(repo.died)
  const deadMonths = currentMonthIndex() - died
  return {
    ...repo,
    bornIndex: born,
    diedIndex: died,
    lifeMonths: died - born,
    deadMonths,
    life: formatDuration(died - born),
    dead: formatDuration(deadMonths),
    commits: repo.activity.reduce((sum, n) => sum + n, 0),
    range: `${formatMonth(born)} — ${formatMonth(died)}`,
    color: LANGUAGE_COLORS[repo.language] ?? '#9AA3B2',
  }
}

export function filterRepos(repos, { language, era, query, sort }) {
  const eraTest = ERAS.find((e) => e.id === era).test
  const compare = SORTS.find((s) => s.id === sort).compare
  const q = query.trim().toLowerCase()

  return repos
    .filter((repo) => language === 'All' || repo.language === language)
    .filter((repo) => eraTest(repo.deadMonths / 12))
    .filter((repo) => !q || `${repo.name} ${repo.cause} ${repo.epitaph}`.toLowerCase().includes(q))
    .sort(compare)
}

export function summarize(repos) {
  const total = (key) => repos.reduce((sum, repo) => sum + repo[key], 0)
  return {
    count: repos.length,
    avgLife: repos.length ? formatDuration(Math.round(total('lifeMonths') / repos.length)) : '—',
    commits: total('commits'),
    stars: total('stars'),
  }
}

export function writeObituary(repo) {
  const peak = Math.max(...repo.activity)
  return `Born in ${formatMonth(repo.bornIndex)}, ${repo.name} peaked at ${peak} commits in a single month and made ${repo.commits} in all. It lived ${formatDuration(repo.lifeMonths)} before the cause of death set in: ${repo.cause.toLowerCase()}. Its last words were “${repo.lastWords}.”`
}
