import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'
import Home from '../pages/Home'
import Scholarships from '../pages/Scholarships'
import OnboardingBox from '../components/OnboardingBox'
import Profile from '../pages/Profile'
import { useSelector } from 'react-redux'

const Router = () => {
  const isAdmin = useSelector(state => state.auth.isAdmin)

  useEffect(() => {
    console.log(isAdmin)
  }, [isAdmin])

  function adminRoutes() {
    return (
      <>
        <Route path='/dashboard' element={<Dashboard />} />
      </>
    )
  }

  return (
    <Routes>
      { isAdmin && adminRoutes() }
      <Route path='/login' element={<OnboardingBox />} />
      <Route path='/register' element={<OnboardingBox />} />
      <Route path='/' exact element={<Home />} />
      <Route path='/scholarships' element={<Scholarships />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  )
}

export default Router