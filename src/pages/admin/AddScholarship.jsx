import React, { useState } from 'react'
import Swal from 'sweetalert2'
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw } from 'draft-js';
import { useNavigate } from 'react-router-dom';
import { useInput, useInputFile } from '../../util/hooks'
import { addScholarship, addScholarshipWithImage, getAllScholarships } from '../../features/scholarship/scholarshipApi';
import Layout from '../../components/admin/Layout'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from 'react-redux';

const AddScholarship = () => {
  const [title, onTitleChange] = useInput('')
  const [organizer, onOrganizerChange] = useInput('')
  const [description, setDescription] = useState('')
  const [editorState, setEditorState] = useState('')
  const [deadline, onDeadlineChange] = useInput('')
  const [image, onImageChange] = useInputFile(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function validateForm() {
    if (!title) return false
    if (!organizer) return false
    if (!description) return false
    if (!deadline) return false
    return true
  }

  async function submitHandler() {
    if (validateForm()) {
      if (image) {
        await addScholarshipWithImage({title, organizer, deadline, description, image})
      } else {
        await addScholarship({title, organizer, deadline, description})
      }
      return Swal.fire({
        title: 'Berhasil',
        text: 'Beasiswa berhasil dibuat',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        navigate('/admin/scholarships')
        getAllScholarships()
          .then(res => {
            dispatch(res)
          })
      })
    }
    return Swal.fire({
      title: 'Gagal',
      text: 'Pastikan semua form terisi',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }

  return (
    <Layout>
      <div className='p-8'>
        <h1 className='font-bold text-xl mb-8'>Tambah Beasiswa Baru</h1>
        <div className="w-1/2">
          <div className="mb-4">
            <label htmlFor="image" className='block mb-2'>Poster (opsional)</label>
            <input type="file" id="image" onChange={onImageChange} accept="/image/*" />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className='block mb-2'>Nama</label>
            <input type="text" id='title' value={title} onChange={onTitleChange} className='block border border-gray-400 rounded p-1 w-full' />
          </div>
          <div className="mb-4">
            <label htmlFor="organizer" className='block mb-2'>Penyelenggara</label>
            <input type="text" id='organizer' value={organizer} onChange={onOrganizerChange} className='block border border-gray-400 rounded p-1 w-full' />
          </div>
          <div className="mb-4">
            <label htmlFor="deadline" className='block mb-2'>Batas Pendaftaran</label>
            <input type="date" id='deadline' value={deadline} onChange={onDeadlineChange} className='block border border-gray-400 rounded p-1 w-full' />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className='block mb-2'>Deskripsi</label>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="border border-gray-400 rounded p-1 w-full"
              editorClassName="border border-gray-200 rounded p-1 w-full"
              onEditorStateChange={(newState) => {
                setEditorState(newState)
                setDescription(draftToHtml(convertToRaw(newState.getCurrentContent())))
              }}
            />
          </div>
          <button className='text-sm py-2 px-4 bg-blue-500 rounded text-white' onClick={submitHandler}>Buat</button>
        </div>
      </div>
    </Layout>
  )
}

export default AddScholarship