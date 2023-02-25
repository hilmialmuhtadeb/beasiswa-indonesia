import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserFromDecodeToken } from './util/auth'
import Router from './routes/Router'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const user = getUserFromDecodeToken()
    dispatch({ type: 'auth/setUser', payload: user })

    if (user?.email === 'admin@beasiswa-indonesia.com') {
      dispatch({ type: 'auth/setIsAdmin', payload: true })
    }
  }, [])

  return (
    <div>
      <Router />
    </div>
  )
}

export default App