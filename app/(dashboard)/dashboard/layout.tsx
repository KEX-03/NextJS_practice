const layout = ({ children } : { children : RecordingState.ReactNode }) => {
  return (
    <div>
        <p>Dashboard NavBar</p>
        {children}
    </div>
  )
}

export default layout