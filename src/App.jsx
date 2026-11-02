import Nav from './components/Nav'
import Landing from './components/Landing'
import Graveyard from './components/Graveyard'
import RepoDetail from './components/RepoDetail'
import { useHashRoute } from './lib/useHashRoute'
import { enrichRepo } from './lib/graveyard'
import sampleRepos from './data/sampleRepos.json'

const repos = sampleRepos.map(enrichRepo)
const featured = repos.reduce((best, repo) => (repo.stars > best.stars ? repo : best))

function NotFound() {
  return (
    <main className="container empty">
      <p className="empty-title">This grave is empty.</p>
      <a className="btn btn-ghost" href="#/graveyard">Back to the graveyard</a>
    </main>
  )
}

export default function App() {
  const route = useHashRoute()

  let page
  if (route === '/') {
    page = <Landing featured={featured} />
  } else if (route === '/graveyard') {
    page = <Graveyard repos={repos} />
  } else if (route.startsWith('/repo/')) {
    const name = decodeURIComponent(route.slice('/repo/'.length))
    const repo = repos.find((r) => r.name === name)
    page = repo ? <RepoDetail repo={repo} /> : <NotFound />
  } else {
    page = <NotFound />
  }

  return (
    <div className="app">
      <Nav />
      {page}
    </div>
  )
}
