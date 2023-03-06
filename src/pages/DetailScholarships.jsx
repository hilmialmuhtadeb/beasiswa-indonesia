import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getScholarshipBySlug } from '../features/scholarship/scholarshipApi'
import '../index.css'

const DetailScholarships = () => {
  const [scholarship, setScholarship] = useState(null)
  const slug = useLocation().pathname.split('/').at(-1)
  
  useEffect(() => {
    getScholarshipBySlug(slug)
      .then(res => {
        setScholarship(res)
      })
  }, [])

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
          <div className="w-1/4">
            <div className='w-full h-64 bg-gray-300 flex justify-center items-center mb-2'>
              <p className='text-center'>poster</p>
            </div>
            <button className='bg-green-300 w-full py-1 text-sm rounded'>Daftar Beasiswa</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailScholarships