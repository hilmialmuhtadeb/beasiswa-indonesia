import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import defaultAvatar from '../assets/images/avatar.png'
import Navbar from '../components/Navbar'
import { updateUserProfile } from '../features/auth/userApi'

const EditProfile = () => {
  const user = useSelector(state => state.auth.profile)
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [instance, setInstance] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [resume, setResume] = useState(null)

  async function handleSubmit() {
    const userProfile = await updateUserProfile({
      name,
      instance,
      birthDate,
      phone,
      gender,
      avatar,
      resume,
      email: user.email
    })
    dispatch({ type: 'auth/setUserProfile', payload: userProfile})
  }

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar)
      setName(user.name)
      setInstance(user.instance)
      setBirthDate(user.birthDate)
      setPhone(user.phone)
      setGender(user.gender)
      setResume(user.resume)
    }
  }, [user])

  if (user) {
    return (
      <>
        <Navbar />
        <div className='lg:w-2/3 mx-auto px-8 py-4'>
          <div className="mb-8">
            <h2 className='font-bold mb-2'>Avatar</h2>
            <img src={user.avatar ? user.avatar : defaultAvatar} alt='avatar' className='w-32 h-32 mb-2' />
            <input type="file" id="image" onChange={(e) => setAvatar(e.target.files[0])} accept="/image/*" />
          </div>
          <div className="mb-4">
            <h2 className='font-bold mb-1'>Nama</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border border-2 border-gray-300 p-1 rounded w-1/2" />
          </div>
          <div className="mb-4">
            <h2 className='font-bold'>Email</h2>
            <p>{user.email}</p>
          </div>
          <div className="mb-4">
            <h2 className='font-bold'>Sekolah / Universitas</h2>
            <input type="text" value={instance} onChange={(e) => setInstance(e.target.value)} placeholder="contoh: Universitas Negeri Surabaya" className="border border-2 border-gray-300 p-1 rounded w-1/2" />
          </div>
          <div className="mb-4">
            <h2 className='font-bold'>Tanggal Lahir</h2>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="border border-2 border-gray-300 p-1 rounded w-1/2" />
          </div>
          <div className="mb-4">
            <h2 className='font-bold'>Jenis Kelamin</h2>  
            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="border border-2 border-gray-300 p-1 rounded w-1/2">
              <option disabled>Pilih Salah Satu</option>
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>
          <div className="mb-4">
            <h2 className='font-bold'>No. Telepon</h2>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="contoh: 628113387650" className="border border-2 border-gray-300 p-1 rounded w-1/2" />
          </div>
          <div className="mb-4">
            <h2 className='font-bold mb-2'>CV / Resume</h2>
            <input type="file" id="resume" onChange={(e) => setResume(e.target.files[0])} />
          </div>
          <div className="my-4">
            <button className='w-1/2 bg-green-500 rounded p-1 text-white' onClick={handleSubmit}>Ubah Profil</button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div>
      <Navbar />
      <div className='lg:w-2/3 mx-auto px-8 py-4'>
        <h2 className='font-bold'>Loading</h2>
      </div>
    </div>
  )
  
}

export default EditProfile