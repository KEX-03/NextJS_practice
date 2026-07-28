import Link from "next/link"

const Dashboard = () => {
  return (
    <div>
        <h1>Dashboard</h1>
        <ul className="mt-10">
            <li><Link href="/dashboard/users">Users</Link></li>
            <li><Link href="/dashboard/analytics">Analytics</Link></li>
        </ul>
    </div>
  )
}

export default Dashboard