import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getAllScholarships } from '../features/scholarship/scholarshipApi'

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([])
  
  useEffect(() => {
    getAllScholarships()
      .then(res => {
        setScholarships(res)
      })
  }, [])

  if (!scholarships) return <div>Loading...</div>
  
  return (
    <>
      <Navbar />
      <div className="w-3/4 mx-auto">
        <h1 className="text-xl text-center">Beasiswa</h1>
        <div className="grid grid-cols-3 gap-4">
          {scholarships.map((scholarship, index) => (
            <Link key={index} to={`/scholarships/${scholarship.slug}`}>
              <div className="border border-gray-300 p-4 rounded my-4">
                <h1 className="text-lg font-bold">{scholarship.title}</h1>
                <p className="text-sm">{scholarship.slug}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Scholarships