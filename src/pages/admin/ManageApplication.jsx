import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllApplications } from '../../features/application/applicationApi'
import Layout from '../../components/admin/Layout'

const ManageApplication = () => {
  const [applications, setApplications] = useState([])
  
  useEffect(() => {
    getAllApplications()
      .then(res => {
        setApplications(res)
      })
  }, [])

  if (!applications) return <div>Loading...</div>
  
  return (
    <Layout>
      <div className='p-8'>
        <h1 className='text-2xl font-bold mb-4'>Beasiswa</h1>
        <div className="my-8 overflow-x-auto border-x border-t">
          <table className="table-auto w-full">
              <thead className="border-b">
                <tr className="bg-gray-100">
                    <th className="text-left p-2 font-bold">
                      Nama Pemohon
                    </th>
                    <th className="text-left p-2 font-bold">
                      Beasiswa
                    </th>
                    <th className="text-left p-2 font-bold">
                      Status
                    </th>
                    <th className="text-left p-2 font-bold text-center">
                      Aksi
                    </th>
                </tr>
              </thead>
              <tbody>
                { applications.map((application, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        {application.user.name}
                      </td>
                      <td className="p-2">
                        {application.scholarship.title}
                      </td>
                      <td className={`p-2 ${application.statusCode === 0 && 'text-red-500'}`}>
                        {application.status}
                      </td>
                      <td className="p-2 text-center flex justify-center text-sm text-white">
                        <Link to={`/admin/applications/${application.id}`}>
                          <button className='bg-green-500 p-2 rounded mr-2'>
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </Link>
                      </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default ManageApplication