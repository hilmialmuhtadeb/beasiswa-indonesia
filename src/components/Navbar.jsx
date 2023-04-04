import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authUser } from '../features/auth/authSlice'
import logo from '../assets/images/logo.jpg'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {
  const user = useSelector(authUser)
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <nav className='py-1 lg:py-4 pl-2 pr-4 lg:px-12 flex flex-col lg:flex-row justify-between items-center'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex'>
          <img src={logo} alt="logo" className='object-cover h-12 mr-1 lg:mr-4' />
          <Link to='/' className='flex items-center'>
            <h1 className='text-xl text-violet-700 font-bold'>BEASISWA INDONESIA</h1>
          </Link>
        </div>
        <div className='lg:hidden'>
          <FontAwesomeIcon icon={faBars} onClick={() => setIsOpen(!isOpen)} className="border border-gray-400 p-2 rounded cursor-pointer " />
        </div>
      </div>
      <ul className={`${isOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row lg:items-center w-full lg:justify-end mb-8 lg:mb-0`}>
        <li className='ml-4 py-2 px-2 rounded hover:bg-gray-200'><Link to={'/'}>Home</Link></li>
        <li className='ml-4 py-2 px-2 rounded hover:bg-gray-200'><Link to={'/scholarships'}>Beasiswa</Link></li>
        { user ? (
          <>
            <li className='ml-4 py-2 px-2 rounded hover:bg-gray-200'><Link to={'/applications'}>Aplikasi</Link></li>
            <li className='ml-4 py-2 px-2 rounded hover:bg-gray-200 font-bold text-blue-500 decoration-solid underline box-border'><Link to={'/profile'}>{user.name || user.email}</Link></li>
          </>
        ) : (
          <li className='ml-4 py-2 px-2 rounded hover:bg-gray-200'><Link to={'/login'}>Login</Link></li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar