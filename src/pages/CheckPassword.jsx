import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
// import { PiUserCircle } from 'react-icons/pi'
import Avatar from '../helpers/Avatar'
import { useDispatch } from 'react-redux'
import { setToken } from '../redux/userSlice'

function CheckPassword() {
  const [data, setData] = useState({
    password: ""
  })
  const location = useLocation()
  const dispatch=useDispatch()
  console.log("location", location?.state);
  useEffect(() => {
    if (!location?.state?.name) {
      nav("/email")
    }
  }, [])

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
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`

    try {
      const response = await axios({
        method: "post",
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data?.password
        },
        withCredentials:true
      })

      if(response){
        console.log(response);
        
        dispatch(setToken(response?.data?.token)) 
        localStorage.setItem("token",response.data.token)       
        // console.log("response", response);
        setData({
          password: ""
        })
        toast.success("login success")
        nav('/')
      }


    } catch (error) {
      console.log("err", error)
      toast.error(error.response.data)

    }
  }
  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
        <div className='w-fit mx-auto mb-2'>
          {/* <PiUserCircle size={80} /> */}
          <Avatar width={70} name={location?.state?.name} height={70} imageUrl={location?.state?.profile} />
          <h2 className='text-center font-bold mt-1'>{location?.state?.name}</h2>
        </div>
        <form className='grid gap-4 mt-3' onSubmit={handlesubmit}>
          <div className=' flex flex-col gap-1'>
            <label htmlFor='email'>Password:</label>
            <input type="password" name='password' id='password' value={data?.password} placeholder='enter your password' className='bg-slate-100 px-2 py-2 focus:outline-primary' onChange={handleOnchange} required />
          </div>

          <button className='bg-primary px-4 py-1 text-lg hover:bg-secondary rounded mt-3 font-bold text-white '>Login</button>
        </form>
        <p className='my-3 text-center'><Link to={'/forgot-password'} className='hover:text-primary font-semibold'> Forgot password ?</Link></p>
      </div>
    </div>
  )
}

export default CheckPassword
