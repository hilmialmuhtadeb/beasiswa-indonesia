import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const OnboardingBox = () => {
  const location = useLocation()
  const pathname = location.pathname.split('/').at(-1)
  
  return (
    <div className='h-screen flex items-center bg-gray-200'>
      <div className="w-full lg:w-3/4 h-5/6 grid grid-cols-2 mx-auto">
        <div className="bg-blue-600 rounded-l-lg shadow-lg">
          <div className="flex h-full flex-col justify-center">
            <img src='https://picsum.photos/300' alt="ilustrasi login" className='mx-auto mb-4' />
            <div className="lg:w-2/3 mx-auto text-center">
              <h1 className='text-xl text-white font-bold mb-2'>Komunitas Beasiswa Terbesar</h1>
              <p className='text-sm text-gray-200'>Bergabung dengan platform informasi beasiswa terbesar di Indonesia.</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-r-lg shadow-lg relative">
          <Link to="/"><h2 className='absolute top-8 left-8'>Beasiswa Indonesia</h2></Link>
          { pathname === 'login' ? (
            <LoginForm />
          ) : (
            <RegisterForm />
          )}
        </div>
      </div>
    </div>
  )
}

export default OnboardingBox