const layout = ({ children } : { children : React.ReactNode }) => {
    return (
      <div>
          <p>NavBar</p>
          {children}
      </div>
    )
  }
  
  export default layout