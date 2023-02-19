import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'

const Router = () => {
  return (
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default Router