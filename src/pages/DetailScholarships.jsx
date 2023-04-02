import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addApplication, isAuthUserApplied, isAuthUserEligible } from '../features/application/applicationApi'
import { getScholarshipBySlug } from '../features/scholarship/scholarshipApi'
import Navbar from '../components/Navbar'
import defaultImage from '../assets/images/beasiswa.jpg'
import '../index.css'
import Swal from 'sweetalert2'

const DetailScholarships = () => {
  const { slug } = useParams()
  const [scholarship, setScholarship] = useState(null)
  const [isApplied, setIsApplied] = useState(false)
  const [isEligible, setIsEligible] = useState(false)
  const [splittedDescription, setSplittedDescription] = useState([])
  const authUser = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  function splitDescription(description) {
    const splitted = description.split('<p>')
    const filtered = splitted.filter((pharaph, index) => index !== 0)
    const pharaphs = filtered.map((pharaph, index) => {
      return `<p>${pharaph}`
    })
    setSplittedDescription(pharaphs)
  }

  function getApplyButtonText() {
    if (isApplied) {
      return 'Sudah Terdaftar'
    }
    return 'Lengkapi Profil untuk Mendaftar'
  }
  
  useEffect(() => {
    getScholarshipBySlug(slug)
      .then(res => {
        setScholarship(res.data())
        splitDescription(res.data().description)
      })

    isAuthUserEligible(slug)
      .then(res => {
        setIsEligible(res)
      })

    isAuthUserApplied(slug)
      .then(res => {
        if (res) {
          setIsApplied(true)
          setIsEligible(false)
        } 
      })
  }, [slug])

  async function applyHandler() {
    addApplication(authUser.email, scholarship.slug)
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Anda berhasil mendaftar beasiswa ini',
        })
        setIsApplied(true)
        dispatch({ type: 'auth/addUserApplications', payload: res })
      })
      .catch(e => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.message,
        })
      })
  }

  if (!scholarship) {
    return (
      <>
        <Navbar />
        <div className="w-3/4 mx-auto">
          <h1 className="text-xl mt-16 text-center">Loading...</h1>
        </div>
      </>
    )
  }
  
  return (
    <>
      <Navbar />
      <div className="lg:w-3/4 lg:mx-auto md:mx-16 mx-2 my-8">
        <h1 className="text-xl font-bold text-center mb-4 lg:mb-8">{scholarship.title}</h1>
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {splittedDescription.map((pharaph, index) => (
              <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: pharaph }} />
            ))}
          </div>
          <div className="lg:w-1/3">
            <div className='w-full mb-2'>
              { scholarship.image ? (
                <img src={scholarship.image} alt="poster" className='w-full h-full object-cover' /> 
              ) : (
                <img src={defaultImage} alt="poster" className='w-full h-full object-cover' /> 
              )}
            </div>
            {
              isEligible ? (
                <button className='bg-green-300 w-full py-1 text-sm rounded' onClick={applyHandler}>Daftar Beasiswa</button>
                ) : (
                <button className='bg-gray-300 w-full py-1 text-sm rounded cursor-not-allowed' disabled>{getApplyButtonText()}</button>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailScholarships