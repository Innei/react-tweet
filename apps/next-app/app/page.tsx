import Link from 'next/link'

export default function Page() {
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>React Tweet Demo</h1>
      <ul>
        <li>
          <Link href="/demo">Static Test Cases (Vercel Theme)</Link>
        </li>
        <li>
          <Link href="/light/1629307668568633344">Dynamic Tweet Example</Link>
        </li>
      </ul>
    </div>
  )
}
