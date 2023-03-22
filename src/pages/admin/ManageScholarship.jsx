import React, { useEffect, useState } from 'react'
import Layout from '../../components/admin/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteScholasrhip, getAllScholarships } from '../../features/scholarship/scholarshipApi';
import { Link } from 'react-router-dom';

const ManageScholarship = () => {
  const [scholarships, setScholarships] = useState([])
  
  useEffect(() => {
    getAllScholarships()
      .then(res => {
        setScholarships(res)
      })
  }, [])

  if (!scholarships) return <div>Loading...</div>
  
  return (
    <Layout>
      <div className='p-8'>
        <h1 className='text-2xl font-bold mb-4'>Beasiswa</h1>
        <Link to="/admin/scholarships/add">
          <button className='bg-blue-500 text-white text-sm px-2 py-1 rounded'>Tambah Beasiswa</button>
        </Link>
        <div className="my-8 overflow-x-auto border-x border-t">
          <table className="table-auto w-full">
              <thead className="border-b">
                <tr className="bg-gray-100">
                    <th className="text-left p-2 font-bold">
                      Nama
                    </th>
                    <th className="text-left p-2 font-bold">
                      Penyelenggara
                    </th>
                    <th className="text-left p-2 font-bold text-center">
                      Aksi
                    </th>
                </tr>
              </thead>
              <tbody>
                { scholarships.map(scholarship => (
                  <tr key={scholarship.title} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        {scholarship.title}
                      </td>
                      <td className="p-2">
                        {scholarship.slug}
                      </td>
                      <td className="p-2 text-center flex justify-center text-sm text-white">
                        <button className='bg-green-500 p-2 rounded mr-2'>
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <Link to={`/admin/scholarships/${scholarship.slug}/edit`}>
                          <button className='bg-yellow-500 p-2 rounded mr-2'>
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                        </Link>
                        <button className='bg-red-500 p-2 rounded' onClick={() => deleteScholasrhip(scholarship.slug)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
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

export default ManageScholarship