"use client"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "@/hooks/useDebounce"

type User = {id: number, name: string}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  if (!res.ok) throw new Error("Failed to fetch users")
  return res.json()
}

function Users() {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query)

  const {data: users, isPending, isError, error} = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers
  })

  if (isError) return <p>Error: {error.message}</p>
  if (isPending) return (
    <div>
      <h1>Dashboard Users</h1>
      <p>Loading...</p>
    </div>
  )

  const results = users.filter(user => user.name.toLowerCase().includes(debouncedQuery.toLowerCase()))

  return (
    <div>
      <h1>Dashboard Users</h1>

      <input 
        value={query} 
        onChange={e => setQuery(e.target.value)}
        placeholder="Search users..."
        className="mt-6 rounded border px-3 py-2"
      />

      <ul className="mt-10">
        {results.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>

      {results.length === 0 && <p>No users match "{debouncedQuery}"</p>}
    </div>
  )
}

export default Users