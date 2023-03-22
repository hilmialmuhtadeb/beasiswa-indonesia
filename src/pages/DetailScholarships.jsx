import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addApplication, isAuthUserApplied } from '../features/application/applicationApi'
import { getScholarshipBySlug } from '../features/scholarship/scholarshipApi'
import Navbar from '../components/Navbar'
import defaultImage from '../assets/images/beasiswa.jpg'
import '../index.css'

const DetailScholarships = () => {
  const { slug } = useParams()
  const [scholarship, setScholarship] = useState(null)
  const [isApplied, setIsApplied] = useState(false)
  const authUser = useSelector(state => state.auth.user)
  
  useEffect(() => {
    getScholarshipBySlug(slug)
      .then(res => {
        setScholarship(res.data())
      })

    isAuthUserApplied(slug)
      .then(res => {
        if (res) setIsApplied(true)
      })
  }, [slug])

  async function applyHandler() {
    await addApplication(authUser.email, scholarship.slug)
  }

  if (!scholarship) {
    return (
      <>
        <Navbar />
        <div className="w-3/4 mx-auto">
          <h1 className="text-xl mt-16 text-center">Loading...</h1>
        </div>
      </>
    )
  }
  
  return (
    <>
      <Navbar />
      <div className="w-3/4 mx-auto my-8">
        <h1 className="text-xl text-center mb-8">{scholarship.title}</h1>
        <div className="flex gap-8">
          <div className="description w-2/3" dangerouslySetInnerHTML={{ __html: scholarship.description }} />
          <div className="w-1/3">
            <div className='w-full mb-2'>
              { scholarship.image ? (
                <img src={scholarship.image} alt="poster" className='w-full h-full object-cover' /> 
              ) : (
                <img src={defaultImage} alt="poster" className='w-full h-full object-cover' /> 
              )}
            </div>
            {
              isApplied ? (
                <button className='bg-gray-300 w-full py-1 text-sm rounded cursor-not-allowed' disabled>Sudah Terdaftar</button>
              ) : (
                <button className='bg-green-300 w-full py-1 text-sm rounded' onClick={applyHandler}>Daftar Beasiswa</button>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailScholarships