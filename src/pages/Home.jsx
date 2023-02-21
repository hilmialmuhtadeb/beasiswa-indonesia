import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { authUser } from '../features/auth/authSlice'

const Home = () => {
  const user = useSelector(authUser)

  useEffect(() => {
    console.log(user);
  }, [user])

  if (user) {
    return (
      <div>
        <h1 className="text-xl font-sans text-red-500">Halo {user.email}</h1>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-xl text-red-500 font-bold">Belum login</h1>
    </div>
  )
}

export default Home