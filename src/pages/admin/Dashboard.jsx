import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/admin/Layout'
import { getAllApplications } from '../../features/application/applicationApi'
import { getAllScholarships } from '../../features/scholarship/scholarshipApi'

const Dashboard = () => {
  const [scholarships, setScholarships] = useState({})
  const [applications, setApplications] = useState({})
  const reduxScholarships = useSelector(state => state.scholarship.scholarships)
  const reduxApplications = useSelector(state => state.application.applications)
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (reduxScholarships) {
      setScholarships(reduxScholarships)
    } else {
      getAllScholarships()
        .then(res => {
          setScholarships(res)
          dispatch({ type: 'scholarship/setScholarships', payload: res })
        })
    }

    if (reduxApplications) {
      setApplications(reduxApplications)
    } else {
      getAllApplications()
        .then(res => {
          setApplications(res)
          dispatch({ type: 'application/setApplications', payload: res })
        })
    }
  })
  
  return (
    <Layout>
      <div className='p-10'>
        <h1>Selamat datang, <strong>Administrator</strong>!</h1>
        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className='shadow-lg w-full text-center py-8'>
            <p className='text-4xl font-bold'>{scholarships.length}</p>
            <p>Beasiswa</p>
          </div>
          <div className='shadow-lg w-full text-center py-8'>
            <p className='text-4xl font-bold'>{applications.length}</p>
            <p>Pendaftaran</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard