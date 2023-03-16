import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllScholarships } from '../features/scholarship/scholarshipApi'
import Navbar from '../components/Navbar'
import defaultImage from '../assets/images/beasiswa.jpg'

const Scholarships = () => {
  const [scholarships, setScholarships] = useState([])
  const dispatch = useDispatch()
  const reduxScholarships = useSelector(state => state.scholarship.scholarships)
  
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

  if (!scholarships) return <div>Loading...</div>
  
  return (
    <>
      <Navbar />
      <div className="w-3/4 mx-auto">
        <h1 className="text-xl text-center">Beasiswa</h1>
        <div className="grid grid-cols-3 gap-4">
          {scholarships.map((scholarship, index) => (
            <Link key={index} to={`/scholarships/${scholarship.slug}`}>
              <div className="border border-gray-300 rounded my-4">
                {scholarship.image ? (
                  <img src={scholarship.image} alt="poster" className='w-full h-48 object-cover' /> 
                ) : (
                  <img src={defaultImage} alt="poster" className='w-full h-48 object-cover' /> 
                )}
                <div className="p-4">
                  <h1 className="text-lg font-bold">{scholarship.title}</h1>
                  <p className="text-sm">{scholarship.slug}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Scholarships