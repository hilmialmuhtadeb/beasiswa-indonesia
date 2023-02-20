import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../util/auth'
import { useInput } from '../util/hooks'

const Login = () => {
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')
  const dispatch = useDispatch()

  async function loginHandler() {
    const user = await login({ email, password })
    dispatch({ type: 'auth/setUser', payload: user })
  }
  
  return (
    <div className='h-screen flex items-center bg-gray-200 '>
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
          <h2 className='absolute top-8 left-8'>Beasiswa Indonesia</h2>
          <div className="h-full flex flex-col justify-center">
            <div className="mb-4">
              <h1 className='text-2xl font-bold mb-2'>Masuk</h1>
              <p className='text-xs text-gray-500'>Masukkan informasi akun yang sudah terdaftar.</p>
            </div>
            <div className="input-box w-64">
              <input className='block box-border border border-gray-300 mb-2 text-sm py-1 px-2 rounded w-full' placeholder='email' type="email" value={email} onChange={onEmailChange} />
              <input className='block box-border border border-gray-300 mb-2 text-sm py-1 px-2 rounded w-full' placeholder='password' type="password" value={password} onChange={onPasswordChange} />
              <button className='mt-4 py-2 px-4 bg-blue-600 text-white text-sm w-full rounded' onClick={loginHandler}>Masuk</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login