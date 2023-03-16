import React, { useState } from 'react'
import Layout from '../../components/admin/Layout'
import { Editor } from 'react-draft-wysiwyg'
import { useInput, useInputFile } from '../../util/hooks'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { addScholarship, addScholarshipWithImage } from '../../features/scholarship/scholarshipApi';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const AddScholarship = () => {
  const [title, onTitleChange] = useInput('')
  const [description, setDescription] = useState('')
  const [editorState, setEditorState] = useState('')
  const [image, onImageChange] = useInputFile(null)

  function submitHandler() {
    if (image) {
      return addScholarshipWithImage({title, description, image})
    }
    return addScholarship({title, description})
  }
  
  return (
    <Layout>
      <div className='p-8'>
        <h1 className='font-bold text-xl mb-8'>Tambah Beasiswa Baru</h1>
        <div className="w-1/2">
          <div className="mb-4">
            <label htmlFor="image" className='block mb-2'>Poster</label>
            <input type="file" id="image" onChange={onImageChange} accept="/image/*" />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className='block mb-2'>Nama</label>
            <input type="text" id='title' value={title} onChange={onTitleChange} className='block border border-gray-400 rounded p-1 w-full' />
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