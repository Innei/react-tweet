import { Link } from 'react-router-dom'

export const IndexPage = () => (
  <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
    <h1 style={{ fontSize: 24, marginBottom: 20 }}>React Tweet Redesign Demo</h1>
    <nav>
      <ul style={{ lineHeight: 2 }}>
        <li>
          <Link to="/demo">View Vercel Theme Gallery (Mock Data)</Link>
        </li>
        <li>
          <Link to="/tweet/1628832338187636740">View Dynamic Tweet (Fetch Data)</Link>
        </li>
      </ul>
    </nav>
  </div>
)