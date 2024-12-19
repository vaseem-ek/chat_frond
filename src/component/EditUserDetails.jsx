import React, { useEffect, useRef, useState } from 'react'
import Avatar from '../helpers/Avatar';
import uploadFile from '../helpers/uploadFile';
import Divider from './Divider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

function EditUserDetails({ onclose, user }) {
    const [data, setData] = useState({
        name: user?.name,
        profile: user?.profile
    })
    const uploadPhotRef=useRef()
    // console.log(data);
    const dispatch=useDispatch()
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const hnadleOpenUploadPhoto=(e)=>{
        e.preventDefault()
        e.stopPropagation()
        uploadPhotRef.current.click()
    }
    useEffect(()=>{
        setData((preve)=>{
            return{
                ...preve
            }
        })
    },[])

    const handleUploadPhoto=async(e)=>{
        const file=e.target.files[0]
        const uploadPhoto=await uploadFile(file)
        setData((preve)=>{
            return{
                ...preve,
                profile:uploadPhoto?.url
            }
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        e.stopPropagation()
        try {
            const URL =`${process.env.REACT_APP_BACKEND_URL}/api//update-user`
            const response=await axios({
                method:'post',
                url:URL,
                data:data,
                withCredentials:true
            })
            toast.success(response?.data?.message)
            console.log(response);
            if(response.data.success){
                dispatch(setUser(response.data.data))
                onclose()
            }
            
        } catch (error) {
            console.log(error.response);
            
        }
    }
    return (
        <div className='fixed bottom-0 top-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
            <div className='bg-white p-4 m-1 rounded w-full max-w-sm'>
                <h2 className='font-semibold'>Profile Details</h2>
                <p className='text-sm'> Edit user details</p>
                <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="name">Name: </label>

                        <input type="text" name='name' id='name' value={data.name} onChange={handleOnChange} className='w-full py-1 px-2 focus:outline-primary border'/>
                    </div>
                    <div>
                        <div>Photo:</div>
                        <div className='flex items-center my-1 gap-4'>
                            <Avatar height={40} width={40} imageUrl={data?.profile} name={data?.name}/>
                            <label htmlFor="profile">
                            <button className='font-semibold' onClick={hnadleOpenUploadPhoto}>Change Photo</button>
                            <input type="file"
                                id="profile"
                                onChange={handleUploadPhoto}
                                className='hidden'
                                ref={uploadPhotRef} />
                        </label>
                        </div>
                    </div>
                    <Divider/>
                    <div className='flex gap-2 ml-auto w-fit my-3'>
                        <button className='border border-primary text-primary px-4 py-1 rounded hover:bg-primary hover:text-white' onClick={onclose}>cancel</button>
                        <button className='border border-primary bg-primary text-white px-4 py-1 rounded hover:bg-white hover:text-primary' onClick={handleSubmit}>save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUserDetails
