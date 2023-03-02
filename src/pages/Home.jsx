import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { authUser } from '../features/auth/authSlice'

const Home = () => {
  const user = useSelector(authUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.email === 'admin@beasiswa-indonesia.com') {
      navigate('/dashboard')
    }
  }, [user])
  
  return (
    <>
      <Navbar />
      <h1 className="text-xl font-sans text-red-500">Halo Semua</h1>
    </>
  )
}

export default Home