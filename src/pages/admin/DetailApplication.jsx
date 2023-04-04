import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getApplicationById, proceedApplication, rejectApplication } from '../../features/application/applicationApi'
import Layout from '../../components/admin/Layout'
import Swal from 'sweetalert2'

const DetailApplication = () => {
  const [application, setApplication] = useState(null)
  const [filename, setFilename] = useState('resume.pdf')
  const {id} = useParams()
  
  useEffect(() => {
    getApplicationById(id)
      .then(res => {
        setApplication(res)
      })
  }, [])

  useEffect(() => {
    if (application) {
      setFilename(application.user.resumePath.split('/').pop())
    }
  }, [application])

  async function rejectHandler() {
    const email = application.user.email

    rejectApplication(id, { email })
      .then(() => {
        Swal.fire({
          title: 'Berhasil',
          text: 'Aplikasi berhasil ditolak',
          icon: 'success',
          confirmButtonText: 'OK'
      }).then(() => window.location.reload())
    })
  }

  async function proceedHandler() {
    const payload = {}
    const email = application.user.email

    if (application.statusCode === 1) {
      payload['status'] = 'Sedang direview'
      payload['statusCode'] = 2
    } else {
      payload['status'] = 'Diterima'
      payload['statusCode'] = 9
      payload['isFinal'] = true
    }

    proceedApplication(id, payload, { email })
      .then(() => {
        Swal.fire({
          title: 'Berhasil',
          text: 'Aplikasi berhasil diproses',
          icon: 'success',
          confirmButtonText: 'OK'
      }).then(() => window.location.reload())
    })
  }

  if (!application) {
    return (
      <Layout>
        <div className='p-8'>
          Loading
        </div>
      </Layout>
    )
  }
  
  return (
    <>
      <Layout>
        <div className='p-8'>
          <h1 className='text-2xl font-bold mb-2'>Detail Aplikasi Beasiswa</h1>
          <h2 className='mb-8'>Beasiswa Pertamina 2023</h2>
          <table className='w-1/2'>
            <tr>
              <th className='text-left p-2'>Pemohon</th>
              <td>{application.user.name}</td>
            </tr>
            <tr>
              <th className='text-left p-2'>Jenis Kelamin</th>
              <td>{application.user.gender}</td>
            </tr>
            <tr>
              <th className='text-left p-2'>Tanggal Lahir</th>
              <td>{application.user.birthDate}</td>
            </tr>
            <tr>
              <th className='text-left p-2'>Sekolah / Universitas</th>
              <td>{application.user.instance}</td>
            </tr>
            <tr>
              <th className='text-left p-2'>CV / Resume</th>
              <td>
                <a href={application.user.resume} download={filename} className="text-blue-600 underline decoration-solid" rel='noreferrer' target="_blank">Download CV / Resume</a>
              </td>
            </tr>
            <tr>
              <th className='text-left p-2'>Status</th>
              <td className={`${application.statusCode === 0 && 'text-red-500'}`}>{application.status}</td>
            </tr>
          </table>
          { application.isFinal === false && (
            <div className="mt-8">
              <button className='text-sm bg-green-600 text-white p-1 rounded mr-2' onClick={proceedHandler}>Proses ke Tahap Selanjutnya</button>
              <button className='text-sm bg-red-500 text-white p-1 rounded' onClick={rejectHandler}>Tolak</button>
            </div>
          ) }
        </div>
      </Layout>
    </>
  )
}

export default DetailApplication