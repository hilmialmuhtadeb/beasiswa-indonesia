import React from 'react'

const ScholarshipCardSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col items-center h-48 space-x-5 my-8">
      <div className="w-full bg-gray-300 h-40 mb-4" />
      <div className="w-full space-y-3">
          <div className="w-36 bg-gray-300 h-6 rounded-md " />
          <div className="w-24 bg-gray-300 h-6 rounded-md " />
      </div>
    </div>
  )
}

export default ScholarshipCardSkeleton