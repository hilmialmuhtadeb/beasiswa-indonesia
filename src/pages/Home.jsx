import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { authUser } from '../features/auth/authSlice'
import studyIllustration from '../assets/illustrations/study.png'
import { getAllScholarships } from '../features/scholarship/scholarshipApi'
import ScholarshipCard from '../components/ScholarshipCard'
import ScholarshipCardSkeleton from '../components/ScholarshipCardSkeleton'

const Home = () => {
  const [scholarships, setScholarships] = useState(null)
  const reduxScholarships = useSelector(state => state.scholarship.scholarships)
  const user = useSelector(authUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const skeleton = [1, 2, 3, 4, 5]

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

  function showScholasrhips () {
    if (!scholarships) return (
      <>
        {skeleton.map((item, index) => (
          <ScholarshipCardSkeleton key={index} />
        ))}
      </>
    )

    return (
      <>
        {scholarships.map((scholarship, index) => (
          <Link key={index} to={`/scholarships/${scholarship.slug}`}>
            <ScholarshipCard scholarship={scholarship} />
          </Link>
        ))}
      </>
    )
  }
  
  return (
    <>
      <Navbar />
      <div className="lg:px-32 md:px-12 lg:py-16 px-4 py-2">
        <section className='mb-8 mt-16 md:mt-0'>
          <div className="flex flex-col-reverse gap-4 lg:gap-0 lg:flex-row gap-x-12">
            <div className='w-full lg:w-3/5 flex flex-col justify-center'>
              <h1 className='font-bold text-2xl mb-2'>Raih Kesempatan Belajarmu</h1>
              <p className='mb-6'>Semua orang berhak untuk mendapatkan pendidikan terbaik. Informasi beasiswa terlengkap dan terbaru ada di Beasiswa Indonesia. Daftar sekarang juga!</p>
              <Link to="/scholarships">
                <button className='py-1 w-48 font-bold text-sm border-2 border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white cursor-pointer rounded'>Telusuri Beasiswa</button>
              </Link>
            </div>
            <div className='w-full lg:w-2/5'>
              <img src={studyIllustration} alt="belajar" className='w-full h-32 md:h-64 object-contain' />
            </div>
          </div>
        </section>
        <hr />
        <section className='py-8'>
          <h1 className='font-bold text-xl'>Beasiswa Populer</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {showScholasrhips()}
          </div>
        </section>
        <hr />
      </div>
    </>
  )
}

export default Home