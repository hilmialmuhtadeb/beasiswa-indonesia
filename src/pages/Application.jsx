import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { getUserApplications } from '../features/application/applicationApi'
import Footer from '../components/Footer'

const Application = () => {
  const [applications, setApplications] = useState(null)
  const reduxUserApplications = useSelector(state => state.auth.applications)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (reduxUserApplications) {
      setApplications(reduxUserApplications)
      return
    }
    
    getUserApplications()
      .then(res => {
        setApplications(res)
        dispatch({ type: 'auth/setApplications', payload: res })
      }
    )
  }, [])

  function showRegistrationDate(createdAt) {
    return createdAt ? createdAt.split(' ').slice(1,4).join(' ') : ''
  }

  if (!applications) return (
    <>
      <Navbar />
      <div className="w-3/4 mx-auto">
        <h1 className="text-xl text-center mb-16">Status Permohonan Beasiswa</h1>
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
      <Footer />
    </>
  )

  if (applications.length === 0) return (
    <>
      <Navbar />
      <div className="w-3/4 mx-auto">
        <h1 className="text-xl text-center mb-16">Status Permohonan Beasiswa</h1>
        <div className="text-center">
          <p className='bg-yellow-200 text-yellow-800 rounded py-2'>Tidak ada permohonan beasiswa ditemukan.</p>
        </div>
      </div>
      <Footer />
    </>
  )
  
  return (
    <>
      <Navbar />
      <div className="mx-4 lg:w-3/4 lg:mx-auto">
        <h1 className="text-xl font-bold text-center">Status Permohonan Beasiswa</h1>
        <div className="my-8 overflow-x-auto border-x border-t">
          <table className="table-auto w-full">
              <thead className="border-b">
                <tr className="bg-gray-100">
                    <th className="text-left p-2 font-bold">
                      Beasiswa
                    </th>
                    <th className="text-left p-2 font-bold">
                      Status
                    </th>
                    <th className="text-center p-2 font-bold">
                      Tanggal Pendaftaran
                    </th>
                </tr>
              </thead>
              <tbody>
                { applications.map((application, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        {application.scholarship.title}
                      </td>
                      <td className={`p-2 ${application.statusCode === 0 && 'text-red-500'}`}>
                        {application.status}
                      </td>
                      <td className="p-2 text-center">
                        {showRegistrationDate(application.createdAt)}
                      </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Application