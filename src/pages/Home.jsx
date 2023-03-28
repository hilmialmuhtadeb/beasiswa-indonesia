import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { authUser } from '../features/auth/authSlice'
import { requestPermission } from '../features/messaging/push-notification'

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
      <div className="p-8">
        <h1 className="text-xl font-sans text-red-500 mb-4">Halo Semua</h1>
        <div className="mb-4">
          <button className='p-1 text-sm bg-blue-500 text-white rounded' onClick={requestPermission}>
            Click to get Notification
          </button>
        </div>
      </div>
    </>
  )
}

export default Home