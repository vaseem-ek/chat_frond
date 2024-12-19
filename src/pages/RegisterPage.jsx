import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import uploadFile from '../helpers/uploadFile'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const [data, setData] = useState({
    name: "", email: "", password: "", profile: ""
  })
  const nav=useNavigate()
  const [uploadPhoto, setUploadPhoto] = useState("")
  const handleOnchange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file)
    setUploadPhoto(file)
    setData((preve) => {
      return {
        ...preve, profile: uploadPhoto?.url
      }
    })
  }


  const handleClearUploadPhoto = (e) => {
    setUploadPhoto(null)
    e.stopPropagation()
    e.preventDefault()

  }
  const handlesubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`
    try {
      const response = await axios.post(URL, data)
      console.log("response", response);
      toast.success("registration success")
      setData({
        name: "", email: "", password: "", profile: ""
      })
      nav('/email')

    } catch (error) {
      console.log("err", error)
      toast.error(error.response.data)

    }
  }

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
        <h3>welcome to chat app</h3>
        <form className='grid gap-4 mt-5' onSubmit={handlesubmit}>
          <div className=' flex flex-col gap-1'>
            <label htmlFor='name'>Name:</label>
            <input type="text" name='name' id='name' value={data.name} placeholder='enter your name' className='bg-slate-100 px-2 py-2 focus:outline-primary' onChange={handleOnchange} required />
          </div>
          <div className=' flex flex-col gap-1'>
            <label htmlFor='email'>Email:</label>
            <input type="email" name='email' id='email' value={data.email} placeholder='enter your email' className='bg-slate-100 px-2 py-2 focus:outline-primary' onChange={handleOnchange} required />
          </div>
          <div className=' flex flex-col gap-1'>
            <label htmlFor='password'>Password:</label>
            <input type="password" name='password' id='password' value={data.password} placeholder='enter your password' className='bg-slate-100 px-2 py-2 focus:outline-primary' onChange={handleOnchange} required />
          </div>
          <div className=' flex flex-col gap-1'>
            <label htmlFor='profile_pic'>Photo:
              <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                  {
                    uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                  }</p>
                {
                  uploadPhoto?.name && (
                    <button className='text-lg ml-3 hover:text-red-600 ' onClick={handleClearUploadPhoto}><IoClose /> </button>

                  )
                }
              </div>
            </label>



            <input type="file" name='profile' id='profile_pic' className='bg-slate-100 px-2 py-1 focus:outline-primary hidden' onChange={handleUploadPhoto} />
          </div>
          <button className='bg-primary px-4 py-1 text-lg hover:bg-secondary rounded mt-3 font-bold text-white '>Register</button>
        </form>
        <p className='my-3 text-center'>Already have an account ?<Link to={'/email'} className='hover:text-primary font-semibold'>Login</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage
