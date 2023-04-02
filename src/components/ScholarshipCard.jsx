import React from 'react'
import defaultImage from '../assets/images/beasiswa.jpg'

const ScholarshipCard = ({ scholarship }) => {
  return (
    <div className="border border-gray-300 rounded lg:my-4 my-2">
      {scholarship.image ? (
        <img src={scholarship.image} alt="poster" className='w-full h-48 object-cover' /> 
      ) : (
        <img src={defaultImage} alt="poster" className='w-full h-48 object-cover' /> 
      )}
      <div className="p-4">
        <h1 className="font-bold truncate">{scholarship.title}</h1>
        <p className='mb-4'>{scholarship.organizer}</p>
        <p className="text-sm">Pendaftaran ditutup: <strong>{scholarship.deadline}</strong></p>
      </div>
    </div>
  )
}

export default ScholarshipCard