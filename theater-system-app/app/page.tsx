import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <a href="/api/auth/logout">Logout</a>
      <br />
      <Link href="/home">Home</Link>
    </div>
  )
}