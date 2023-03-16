import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authUser } from '../features/auth/authSlice'
import { logout } from '../util/auth'
import Navbar from '../components/Navbar'
import defaultAvatar from '../assets/images/avatar.png'
import { getUserByEmail } from '../features/auth/userApi'

const Profile = () => {
  const user = useSelector(authUser)
  const userProfile = useSelector(state => state.auth.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [profile, setProfile] = useState({})

  async function logoutHandler() {
    await logout()
    dispatch({ type: 'auth/setUser', payload: null })
    dispatch({ type: 'auth/setUserProfile', payload: null })
    navigate('/login')
  }

  useEffect(() => {
    if (userProfile) return setProfile(userProfile)
    if (user) {
      getUserByEmail(user.email)
        .then(res => {
          setProfile(res.data())
          dispatch({ type: 'auth/setUserProfile', payload: res.data() })
        })
    }
  }, [user])

  if (user) {
    return (
      <>
        <Navbar />
        <div className='lg:w-2/3 mx-auto px-8 py-4'>
          <div className='flex mb-8 items-center justify-between'>
            <div className='flex items-center'>
              <img src={profile.avatar ? profile.avatar : defaultAvatar} alt='avatar' className='w-32 h-32 rounded-full' />
              <div className="ml-8">
                <h1 className='text-2xl font-bold'>{profile.name}</h1>
                <p>{profile.email}</p>
              </div>
            </div>
            <Link to="/profile/edit">
              <button className='p-2 text-xs rounded bg-blue-500 text-white font-bold'>Ubah Profil</button>
            </Link>
          </div>

          <div className="mb-4">
            <h2 className='font-bold'>Sekolah / Universitas</h2>
            <p>{profile.instance || '-'}</p>
          </div>
          <div className="mb-4">
            <h2 className='font-bold'>Tanggal Lahir</h2>
            <p>{profile.birthDate || '-'}</p>
          </div>
          <div className="mb-4">
            <h2 className='font-bold'>Jenis Kelamin</h2>
            <p>{profile.gender || '-'}</p>
          </div>
          <div className="mb-4">
            <h2 className='font-bold'>No. Telepon</h2>
            <p>{profile.phone || '-'}</p>
          </div>
          <div className="mb-4">
            <h2 className='font-bold'>CV / Resume</h2>
            <p>{profile.resume || '-'}</p>
          </div>
          <button className='border border-red-500 text-red-500 p-2 text-sm hover:bg-red-500 hover:text-white rounded font-bold' onClick={logoutHandler}>Logout</button>
        </div>
      </>
    )
  }
  
  return (
    <div>
      <h1>loading</h1>
    </div>
  )
}

export default Profile