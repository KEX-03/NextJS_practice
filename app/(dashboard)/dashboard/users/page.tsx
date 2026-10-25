"use client"
import { useQuery } from "@tanstack/react-query"

type User = {id: number, name: string}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  if (!res.ok) throw new Error("Failed to fetch users")
  return res.json()
}

function Users() {
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