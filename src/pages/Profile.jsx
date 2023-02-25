import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authUser } from '../features/auth/authSlice'
import { logout } from '../util/auth'

const Profile = () => {
  const user = useSelector(authUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function logoutHandler() {
    await logout()
    dispatch({ type: 'auth/setUser', payload: null })
    navigate('/login')
  }

  if (user) {
    return (
      <div className='px-8 py-4'>
        <h1 className="text-xl">Halo {user.name}</h1>
        <button className='border border-red-500 text-red-500 p-2' onClick={logoutHandler}>Logout</button>
      </div>
    )
  }
  
  return (
    <div>
      <h1>loading</h1>
    </div>
  )
}

export default Profile