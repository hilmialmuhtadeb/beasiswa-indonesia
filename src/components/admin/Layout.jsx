import React from 'react'
import Sidebar from './Sidebar'

const Layout = (props) => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='grow ml-56 h-full'>
        {props.children}
      </div>
    </div>
  )
}

export default Layout