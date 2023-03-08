import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { addApplication } from '../features/application/applicationApi'
import { getScholarshipBySlug } from '../features/scholarship/scholarshipApi'
import '../index.css'

const DetailScholarships = () => {
  const [scholarship, setScholarship] = useState(null)
  const slug = useLocation().pathname.split('/').at(-1)
  const authUser = useSelector(state => state.auth.user)
  
  useEffect(() => {
    getScholarshipBySlug(slug)
      .then(res => {
        setScholarship(res)
      })
  }, [slug])

  async function applyHandler() {
    await addApplication(authUser, scholarship)
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
        <div className="flex">
          <div className="description grow" dangerouslySetInnerHTML={{ __html: scholarship.description }} />
          <div className="w-1/3">
            <div className='w-full mb-2'>
              { scholarship.image && <img src={scholarship.image} alt="poster" className='w-full h-full object-cover' /> }
            </div>
            <button className='bg-green-300 w-full py-1 text-sm rounded' onClick={applyHandler}>Daftar Beasiswa</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailScholarships