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
    <div className='mx-4 my-8'>
      <h1>Login</h1>
      <div className="input-box">
        <label className='block' htmlFor="email">Email</label>
        <input className='block border border-black' type="email" id="email" value={email} onChange={onEmailChange} />
        <label className='block' htmlFor="password">Password</label>
        <input className='block border border-black' type="password" id="password" value={password} onChange={onPasswordChange} />
        <button className='my-4 py-1 px-4 bg-blue-200 text-blue-800' onClick={loginHandler}>Masuk</button>
      </div>
    </div>
  )
}

export default Login