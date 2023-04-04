import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserFromDecodeToken } from './util/auth'
import Router from './routes/Router'
import OfflineAlert from './components/OfflineAlert'
import Notification from './components/Notification'

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
      <OfflineAlert />
      <Notification />
      <Router />
    </div>
  )
}

export default App