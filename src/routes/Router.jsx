import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'
import Home from '../pages/Home'
import OnboardingBox from '../components/OnboardingBox'

const Router = () => {
  return (
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/login' element={<OnboardingBox />} />
      <Route path='/register' element={<OnboardingBox />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default Router