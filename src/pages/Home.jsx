import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { authUser } from '../features/auth/authSlice'
import { requestPermission } from '../features/messaging/push-notification'
import studyIllustration from '../assets/illustrations/study.png'
import { getAllScholarships } from '../features/scholarship/scholarshipApi'
import ScholarshipCard from '../components/ScholarshipCard'

const Home = () => {
  const [scholarships, setScholarships] = useState([])
  const reduxScholarships = useSelector(state => state.scholarship.scholarships)
  const user = useSelector(authUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.email === 'admin@beasiswa-indonesia.com') {
      navigate('/dashboard')
    }
  }, [user])

  useEffect(() => {
    if (reduxScholarships) {
      setScholarships(reduxScholarships)
      return
    }
    
    getAllScholarships()
      .then(res => {
        setScholarships(res)
        dispatch({ type: 'scholarship/setScholarships', payload: res })
      })
  }, [])
  
  return (
    <>
      <Navbar />
      <div className="px-32 py-16">
      <button className='bg-gray-100 rounded border p-2' onClick={requestPermission}>Req Notif</button>
        <section className='mb-8'>
          <div className="flex gap-x-12">
            <div className='w-3/5 flex flex-col justify-center'>
              <h1 className='font-bold text-2xl mb-2'>Raih Kesempatan Belajarmu</h1>
              <p className='mb-6'>Semua orang berhak untuk mendapatkan pendidikan terbaik. Informasi beasiswa terlengkap dan terbaru ada di Beasiswa Indonesia. Daftar sekarang juga!</p>
              <Link to="/scholarships">
                <button className='py-1 w-48 font-bold text-sm border-2 border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white cursor-pointer rounded'>Telusuri Beasiswa</button>
              </Link>
            </div>
            <div className='w-2/5'>
              <img src={studyIllustration} alt="belajar" className='w-full h-64 object-contain' />
            </div>
          </div>
        </section>
        <hr />
        <section className='py-8'>
          <h1 className='font-bold text-xl'>Beasiswa Populer</h1>
          <div className="grid grid-cols-4 gap-4">
            {scholarships.map((scholarship, index) => (
              <Link key={index} to={`/scholarships/${scholarship.slug}`}>
                <ScholarshipCard scholarship={scholarship} />
              </Link>
            ))}
          </div>
        </section>
        <hr />
      </div>
      {/* <div className="p-8">
        <h1 className="text-xl font-sans text-red-500 mb-4">Halo Semua</h1>
        <div className="mb-4">
          <button className='p-1 text-sm bg-blue-500 text-white rounded' onClick={requestPermission}>
            Click to get Notification
          </button>
        </div>
      </div> */}
    </>
  )
}

export default Home