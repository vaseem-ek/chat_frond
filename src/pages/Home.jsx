import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from '../component/Sidebar'
import logo from '../assets/logo.png'
import { io } from 'socket.io-client'

function Home() {

  const dispatch=useDispatch()
  const user=useSelector(state=>state.user)
  console.log("redux",user);
  const nav=useNavigate()
  const location=useLocation()
  const basePath=location.pathname=== '/'
  const fetchUserDetails=async()=>{
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
      const response=await axios({
        url:URL,
        withCredentials:true
      })
      dispatch(setUser(response?.data))
      if(response?.data?.logout){
        dispatch(logout())
        nav('/email')
      }
      // console.log("current users",response);
      
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchUserDetails()
  },[])

  // socket connetction

  useEffect(()=>{
    const socketConnection =io(process.env.REACT_APP_BACKEND_URL,{
      auth:{
        token:localStorage.getItem('token')
      }
    })
    socketConnection.on('onlineUser',(data)=>{
      console.log(data);
      dispatch(setOnlineUser(data))
      
    })
    dispatch(setSocketConnection(socketConnection))
    return ()=>{
      socketConnection.disconnect()
    }
  },[])
  return (
    <div className='grid lg:grid-cols-[1fr_3fr] h-screen'>
      <section className={`bg-white ${!basePath && 'hidden'} lg:block`}>
        <Sidebar/>
      </section>
      {/* ---------message component--------- */}
      <section className={`${basePath && 'hidden'}`}>
        <Outlet/>
      </section>
      <div className={`justify-center items-center flex-col hidden ${!basePath ?"hidden" :"lg:flex" }`}>
        <div>
          <img src={logo} alt="logo" width={250}  />
        </div>
        <p className=' font-semibold text-lg mt-2 text-slate-500'>please select user send messages</p>
      </div>
    </div>
  )
}

export default Home
