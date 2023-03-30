import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authUser } from '../features/auth/authSlice'
import logo from '../assets/images/logo.jpg'

const Navbar = () => {
  const user = useSelector(authUser)
  
  return (
    <nav className='py-4 px-12 flex justify-between items-center'>
      <div className='flex items-center'>
        <img src={logo} alt="logo" className='object-cover h-12 mr-4' />
        <h1 className='text-xl font-bold'>BEASISWA INDONESIA</h1>
      </div>
      <ul className='flex items-center'>
        <li className='ml-4'><Link to={'/'}>Home</Link></li>
        <li className='ml-4'><Link to={'/scholarships'}>Beasiswa</Link></li>
        { user ? (
          <li className='ml-4 font-bold text-blue-500 decoration-solid underline box-border px-2 py-1'><Link to={'/profile'}>{user.name || user.email}</Link></li>
        ) : (
          <li className='ml-4'><Link to={'/login'}>Login</Link></li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar