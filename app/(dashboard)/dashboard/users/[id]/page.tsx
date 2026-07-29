const UserDetails = async ({ params }: { params: Promise<{ id: string }>}) => {

  const { id } = await params

  return (
    <div>
        <h1>User #{id} Details</h1>
    </div>
  )
}

export default UserDetails