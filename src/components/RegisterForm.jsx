import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../util/auth'
import { useInput } from '../util/hooks'

const RegisterForm = () => {
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')
  const [name, onNameChange] = useInput('')
  const [error, setError] = React.useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const registerHandler = async () => {
    const user = await register({ email, password, name })
    setError(!user)

    if (!user) return
    
    dispatch({ type: 'auth/setUser', payload: user })
    navigate('/')
  }

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="mb-4">
        <h1 className='text-2xl font-bold mb-2 text-center'>Daftar Akun</h1>
        <p className='text-xs text-gray-500 text-center'>Sesuaikan dengan identitas resmi Anda.</p>
      </div>
      <div className="input-box w-64 mb-8">
        <input className='block box-border border border-gray-300 mb-2 text-sm py-1 px-2 rounded w-full' placeholder='Nama' type="text" value={name} onChange={onNameChange} />
        <input className='block box-border border border-gray-300 mb-2 text-sm py-1 px-2 rounded w-full' placeholder='email' type="email" value={email} onChange={onEmailChange} />
        <input className='block box-border border border-gray-300 mb-2 text-sm py-1 px-2 rounded w-full' placeholder='password' type="password" value={password} onChange={onPasswordChange} />
        { error && <p className='text-red-500 text-sm'>Gagal mendaftar, email sudah digunakan.</p> }
        <button className='mt-4 py-2 px-4 bg-blue-600 text-white text-sm w-full rounded' onClick={registerHandler}>Daftar</button>
      </div>
    </div>
  )
}

export default RegisterForm