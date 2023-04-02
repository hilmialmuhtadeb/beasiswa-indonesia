import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Dashboard from '../pages/admin/Dashboard'
import Home from '../pages/Home'
import Scholarships from '../pages/Scholarships'
import OnboardingBox from '../components/OnboardingBox'
import Profile from '../pages/Profile'
import ManageScholarship from '../pages/admin/ManageScholarship'
import AddScholarship from '../pages/admin/AddScholarship'
import DetailScholarships from '../pages/DetailScholarships'
import EditProfile from '../pages/EditProfile'
import EditScholarship from '../pages/admin/EditScholarship'
import ManageApplication from '../pages/admin/ManageApplication'
import DetailApplication from '../pages/admin/DetailApplication'
import Application from '../pages/Application'

const Router = () => {
  const isAdmin = useSelector(state => state.auth.isAdmin)

  function adminRoutes() {
    return (
      <>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin/scholarships' element={<ManageScholarship />} />
        <Route path='/admin/scholarships/:slug/edit' element={<EditScholarship />} />
        <Route path='/admin/scholarships/add' element={<AddScholarship />} />
        <Route path='/admin/applications/:id' element={<DetailApplication />} />
        <Route path='/admin/registration' element={<ManageApplication />} />
      </>
    )
  }

  return (
    <Routes>
      { isAdmin && adminRoutes() }
      <Route path='/' exact element={<Home />} />
      <Route path='/scholarships' element={<Scholarships />} />
      <Route path='/scholarships/:slug' element={<DetailScholarships />} />
      <Route path='/applications' element={<Application />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/edit' element={<EditProfile />} />
      <Route path='/login' element={<OnboardingBox />} />
      <Route path='/register' element={<OnboardingBox />} />
    </Routes>
  )
}

export default Router