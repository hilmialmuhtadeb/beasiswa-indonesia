import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getUserFromDecodeToken, login } from '../util/auth'
import { useInput } from '../util/hooks'

const LoginForm = () => {
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')
  const [error, setError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function validateForm() {
    return email.length > 0 && password.length > 0
  }

  async function loginHandler() {
    if (!validateForm()) {
      setError(true)
      setErrorMessage('Gagal masuk, email atau password belum diisi.')
      return
    }
    const credentials = await login({ email, password })
    setError(!credentials)
    setErrorMessage('Gagal masuk, email atau password tidak sesuai.')
    const user = getUserFromDecodeToken()
    dispatch({ type: 'auth/setUser', payload: user })

    if (user.email === 'admin@beasiswa-indonesia.com') {
      dispatch({ type: 'auth/setIsAdmin', payload: true })
      return navigate('/dashboard')
    }
    
    return navigate('/')
  }

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="mb-4">
        <h1 className='text-2xl font-bold mb-2 text-center'>Masuk</h1>
        <p className='text-xs text-gray-500 text-center'>Masukkan informasi akun yang sudah terdaftar.</p>
      </div>
      <div className="input-box w-64 mb-8">
        <input className='block box-border border border-gray-300 mb-2 text-sm py-1 px-2 rounded w-full' required placeholder='email' type="email" value={email} onChange={onEmailChange} />
        <input className='block box-border border border-gray-300 mb-2 text-sm py-1 px-2 rounded w-full' required placeholder='password' type="password" value={password} onChange={onPasswordChange} />
        { error && <p className='text-red-500 text-sm'>{ errorMessage }</p> }
        <button className='mt-4 py-2 px-4 bg-blue-600 text-white text-sm w-full rounded' onClick={loginHandler}>Masuk</button>
      </div>
      <p className='text-sm text-gray-400'>Belum memiliki akun? <Link to="/register" className='font-bold underline decoration-solid'>Daftar</Link></p>
    </div>
  )
}

export default LoginForm