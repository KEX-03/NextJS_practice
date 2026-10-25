"use client"
import { useState, useEffect } from "react"

type User = {id: number, name: string}

function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(setUsers)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div>
      <h1>Dashboard Users</h1>
      <p>Loading...</p>
    </div>
  )
  return (
    <div>
      <h1>Dashboard Users</h1>
      <ul className="mt-10">
        {users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  )
}

export default Users