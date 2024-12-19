import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'

function CheckEmail() {
  const [data, setData] = useState({
    email: ""
  })
  const nav = useNavigate()
  const handleOnchange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`
    try {
      const response = await axios.post(URL, data)
      // console.log("response", response);
      toast.success("email is veryfied")
      setData({
        email: ""
      })
      nav('/password',{state:response?.data})

    } catch (error) {
      console.log("err", error)
      toast.error(error.response.data)

    }
  }
  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
        <div className='w-fit mx-auto mb-2'>
          <FaUserAlt size={80} />
        </div>
        <h3>welcome to chat app</h3>
        <form className='grid gap-4 mt-3' onSubmit={handlesubmit}>
          <div className=' flex flex-col gap-1'>
            <label htmlFor='email'>Email:</label>
            <input type="email" name='email' id='email' value={data.email} placeholder='enter your email' className='bg-slate-100 px-2 py-2 focus:outline-primary' onChange={handleOnchange} required />
          </div>

          <button className='bg-primary px-4 py-1 text-lg hover:bg-secondary rounded mt-3 font-bold text-white '>Lets Go</button>
        </form>
        <p className='my-3 text-center'>New user ?<Link to={'/register'} className='hover:text-primary font-semibold'>Register</Link></p>
      </div>
    </div>
  )
}

export default CheckEmail
