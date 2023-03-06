import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Dashboard from '../pages/admin/Dashboard'
import Home from '../pages/Home'
import Scholarships from '../pages/Scholarships'
import OnboardingBox from '../components/OnboardingBox'
import Profile from '../pages/Profile'
import ManageScholarship from '../pages/admin/ManageScholarship'
import ManageRegistration from '../pages/admin/ManageRegistration'
import AddScholarship from '../pages/admin/AddScholarship'
import DetailScholarships from '../pages/DetailScholarships'

const Router = () => {
  const isAdmin = useSelector(state => state.auth.isAdmin)

  function adminRoutes() {
    return (
      <>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin/scholarships' element={<ManageScholarship />} />
        <Route path='/admin/scholarships/add' element={<AddScholarship />} />
        <Route path='/admin/registration' element={<ManageRegistration />} />
      </>
    )
  }

  return (
    <Routes>
      { isAdmin && adminRoutes() }
      <Route path='/' exact element={<Home />} />
      <Route path='/scholarships' element={<Scholarships />} />
      <Route path='/scholarships/:slug' element={<DetailScholarships />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/login' element={<OnboardingBox />} />
      <Route path='/register' element={<OnboardingBox />} />
    </Routes>
  )
}

export default Router