import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllScholarships } from '../features/scholarship/scholarshipApi'
import Navbar from '../components/Navbar'
import ScholarshipCard from '../components/ScholarshipCard'
import ScholarshipCardSkeleton from '../components/ScholarshipCardSkeleton'
import Footer from '../components/Footer'

const Scholarships = () => {
  const [scholarships, setScholarships] = useState(null)
  const reduxScholarships = useSelector(state => state.scholarship.scholarships)
  const dispatch = useDispatch()

  const skeleton = [1, 2, 3, 4, 5]
  
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

  if (!scholarships) return (
    <>
      <Navbar />
      <div className="w-3/4 mx-auto">
        <h1 className="text-xl text-center mb-16">Beasiswa</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skeleton.map((item, index) => (
            <ScholarshipCardSkeleton key={index} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )

  if (scholarships.length === 0) return (
    <>
      <Navbar />
      <div className="w-3/4 mx-auto">
        <h1 className="text-xl text-center mb-16">Beasiswa</h1>
        <div className="text-center">
          <p>Belum ada beasiswa yang tersedia</p>
        </div>
      </div>
      <Footer />
    </>
  )
  
  return (
    <>
      <Navbar />
      <div className="mx-4 lg:w-3/4 lg:mx-auto">
        <h1 className="text-xl font-bold lg:text-center">Beasiswa Tersedia</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {scholarships.map((scholarship, index) => (
            <Link key={index} to={`/scholarships/${scholarship.slug}`}>
              <ScholarshipCard scholarship={scholarship} />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Scholarships