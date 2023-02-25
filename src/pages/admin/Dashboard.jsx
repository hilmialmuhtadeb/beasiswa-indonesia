import React from 'react'
import Layout from '../../components/admin/Layout'

const Dashboard = () => {
  return (
    <Layout>
      <div className='p-10'>
        <h1>Selamat datang, Administrator!</h1>
        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className='shadow-lg w-full text-center py-8'>
            <p className='text-4xl font-bold'>25</p>
            <p>Beasiswa</p>
          </div>
          <div className='shadow-lg w-full text-center py-8'>
            <p className='text-4xl font-bold'>1200</p>
            <p>Pendaftar</p>
          </div>
          <div className='shadow-lg w-full text-center py-8'>
            <p className='text-4xl font-bold'>15</p>
            <p>Perusahaan</p>
          </div>
          <div className='shadow-lg w-full text-center py-8'>
            <p className='text-4xl font-bold'>15</p>
            <p>Universitas</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard