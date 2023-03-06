import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser, faBuilding } from '@fortawesome/free-regular-svg-icons';
import { logout } from '../../util/auth';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const pathname = location.pathname.split('/')
  
  const Menus = [
    { title: "Dashboard", src: faTableColumns, path: "/dashboard", name: "dashboard" },
    { title: "Pendaftaran", src: faUser, gap: true, path: "/admin/registration", name: "registration" },
    { title: "Beasiswa ", src: faBuilding, path: "/admin/scholarships", name: "scholarships" },
  ];

  async function logoutHandler() {
    await logout()
    dispatch({ type: 'auth/setUser', payload: null })
    navigate('/login')
  }

  return (
    <div className="flex">
      <div className='w-56 bg-blue-600 h-screen p-5 pt-8 fixed duration-300'>
        <div className="flex gap-x-4 items-center">
          <h1 className='text-white origin-left font-medium text-xl duration-200'>BEASISWA INDONESIA</h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link key={index} to={Menu.path}>
              <li className={`flex rounded-md px-4 py-2 cursor-pointer hover:bg-blue-800 text-gray-100 text-sm items-center gap-x-4 mb-4${ pathname.includes(Menu.name) ? ' bg-blue-800' : '' }`}>
                <FontAwesomeIcon icon={Menu.src} />
                <span className='origin-left duration-200'>{Menu.title}</span>
              </li>
            </Link>
          ))}
            <li key='logout' className="flex rounded-md px-4 py-2 cursor-pointer hover:bg-blue-800 text-gray-100 text-sm items-center gap-x-4 mt-12" onClick={logoutHandler}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <span className='origin-left duration-200'>Logout</span>
            </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar