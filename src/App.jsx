import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Router from './routes/Router'

const App = () => {
  const pagesPathWithoutNavbar = ['login', 'register']
  const location = useLocation()
  const pathname = location.pathname.split('/').at(-1)
  
  if (pagesPathWithoutNavbar.includes(pathname)) {
    return (
      <div>
        <Router />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <Router />
    </div>
  )
}

export default App