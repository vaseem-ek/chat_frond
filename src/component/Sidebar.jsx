import React, { useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { FaUserPlus } from 'react-icons/fa'
import { IoChatbubbleEllipses } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import Avatar from '../helpers/Avatar'
import { useSelector } from 'react-redux'
import EditUserDetails from './EditUserDetails'
import { FiArrowUpLeft } from 'react-icons/fi'
import SearchUser from './SearchUser'

function Sidebar() {
    const user=useSelector(state=>state?.user)
    const [editUserPen,setEditUserOpen]=useState(false)
    const [allUser,setAllUser]=useState([])
    const [openSearchUser,setOpenSearchUser]=useState(false)
        return (
        <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>

            <div className='bg-slate-100 w-12 h-full rounded-tr-md rounded-br-md py-5 flex justify-between flex-col'>
                <div>
                    <NavLink className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200' title='chat ${isActive && "bg-slate-200"}`}>
                        <IoChatbubbleEllipses size={25} />
                    </NavLink>
                    <div title='add friend' onClick={()=>setOpenSearchUser(true)} className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200' >
                        <FaUserPlus size={25} />
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <button className='mx-auto' title={user?.name} onClick={()=>setEditUserOpen(true)}>
                        <Avatar width={40} height={40} name={user?.name} imageUrl={user?.profile} userId={user?._id}/>
                    </button>
                    <button title='logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200' >
                        <BiLogOut size={25} />

                    </button>
                </div>
            </div>
            <div className='w-full'>
                <div className='h-16 flex items-center'>
                <h2 className='text-lg font-bold p-4 text-slate-800'>Messages</h2>
                </div>
                <div className='bg-slate-200 p-[0.5px]'></div>
                <div className=' h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
                    {
                        allUser.length ===0 &&(
                            <div className='mt-10 '>
                                <div className='flex justify-center items-center my-4 text-slate-500'>
                                    <FiArrowUpLeft size={50}/>
                                </div>
                                <p className='text-lg text-center text-slate-400'>explore user to start a conversation with</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {
                editUserPen && (
                    <EditUserDetails onclose={()=>setEditUserOpen(false)} user={user}/>
                )
            }

            {/* search user */}
            {
                openSearchUser && (
                    <SearchUser onclose={()=>setOpenSearchUser(false)}/>
                )
            }
        </div>
    )
}

export default Sidebar
