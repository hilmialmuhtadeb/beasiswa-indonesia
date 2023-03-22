import React, { useEffect, useState } from 'react'
import Layout from '../../components/admin/Layout'
import { useInputFile } from '../../util/hooks'
import defaultImage from '../../assets/images/beasiswa.jpg'
import { Editor, EditorState } from 'react-draft-wysiwyg'
import { convertFromRaw, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { getScholarshipBySlug } from '../../features/scholarship/scholarshipApi'
import { useParams } from 'react-router-dom'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditScholarship = (props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editorState, setEditorState] = useState('')
  const [image, onImageChange] = useInputFile(null)
  const [scholarship, setScholarship] = useState({})
  const { slug } = useParams()

  useEffect(() => {
    getScholarshipBySlug(slug)
      .then(res => {
        const scholarship = res.data()
        setScholarship(scholarship)
        setTitle(scholarship.title)
        setDescription(scholarship.description)
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(scholarship.description))))
      })
  }, [slug])

  function submitHandler() {

  }
  
  return (
    <Layout>
      <div className='p-8'>
        <h1 className='font-bold text-xl mb-8'>Tambah Beasiswa Baru</h1>
        <div className="w-1/2">
          <div className="mb-8">
            <label htmlFor="image" className='block mb-2'>Poster</label>
            <img src={scholarship.poster ? scholarship.poster : defaultImage} alt='avatar' className='w-32 h-32 mb-2 object-cover' />
            <input type="file" id="image" onChange={onImageChange} accept="/image/*" />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className='block mb-2'>Nama</label>
            <input type="text" id='title' value={title} onChange={(e) => setTitle(e.target.value)} className='block border border-gray-400 rounded p-1 w-full' />
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

export default EditScholarship