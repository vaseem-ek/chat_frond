import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Avatar from '../helpers/Avatar';
import { HiDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaPlus } from 'react-icons/fa';
import { FaImage, FaVideo } from 'react-icons/fa6';
import uploadFile from '../helpers/uploadFile';
import { IoClose } from 'react-icons/io5';
import Loading from './Loading';
import wallpaper from '../assets/wallapaper.jpeg'
import { IoMdSend } from 'react-icons/io';
import moment from 'moment';

function MessagePage() {
  const params = useParams()
  const socketConnection = useSelector(state => state?.user?.socketConnection)
  const user = useSelector(state => state?.user)
  const [openIamageVideoUpload, setOpenIamageVideoUpload] = useState(false)
  const [message, setMessage] = useState({
    text: "", imageUrl: "", videoUrl: ""
  })
  const [loading, setLoading] = useState(false)
  const [allMessage, setallmessages] = useState([])

  const [dataUser, setDataUser] = useState({
    name: "", email: "", profile: "", online: false, _id: ""
  })

  const currentMessage = useRef(null)
  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [allMessage])


  // console.log('params',params?.userId);
  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params?.userId)
      socketConnection.emit('seen',params?.userId)

      socketConnection.on('message-user', (data) => {
        setDataUser(data)

      })

      socketConnection.on('message', (data) => {
        console.log('message data', data)
        setallmessages(data)
      })
    }
  }, [socketConnection, params?.userId, user])

  const handleOpenImageVideoUpload = () => {
    setOpenIamageVideoUpload(preve => !preve)
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]
    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    setLoading(false)
    setOpenIamageVideoUpload(false)
    setMessage((preve) => {
      return {
        ...preve, imageUrl: uploadPhoto?.url
      }
    })
  }
  const handleClearUploadImage = () => {
    setMessage(preve => {
      return {
        ...preve, imageUrl: ""
      }
    })
  }
  const handleUploadVideo = async (e) => {
    const file = e.target.files[0]
    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    setLoading(false)
    setOpenIamageVideoUpload(false)
    setMessage((preve) => {
      return {
        ...preve, videoUrl: uploadPhoto?.url
      }
    })
  }
  const handleClearUploadVideo = () => {
    setMessage(preve => {
      return {
        ...preve, videoUrl: ""
      }
    })
  }


  const handleSendMessage = (e) => {
    e.preventDefault()
    console.log(message)


    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit('new message', {
          sender: user?._id,
          receiver: params?.userId,
          text: message?.text,
          imageUrl: message?.imageUrl,
          videoUrl: message?.videoUrl,
          msgByUserId: user._id
        })
        setMessage({
          text: "", imageUrl: "", videoUrl: ""

        })
      }
    }
  }
  return (
    <div style={{ backgroundImage: `url(${wallpaper})` }} className='bg-no-repeat bg-cover'>
      <header className='sticky top-0 bg-white h-16 flex justify-between items-center px-4'>
        <div className='flex items-center gap-4 '>
          <Link to={'/'} className='lg:hidden'>
            <FaAngleLeft size={25} />
          </Link>
          <div className='mt-2'>
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.profile}
              name={dataUser?.name}
              userId={dataUser?._id} />
          </div>
          <div>
            <h3 className='font-semibold text-lg text-ellipsis line-clamp-1'>{dataUser?.name}</h3>
            <p className={dataUser?.online ? "text-green-500  -my-2" : "text-red-500"}>
              {dataUser.online ? "online" : "offline"}
            </p>
          </div>
        </div>
        <div>
          <button className='hover:text-primary font-bold border-none'>
            <HiDotsVertical />
          </button>
        </div>
      </header>
      {/* show all messages */}
      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-30'>


        {/* all messages show here  */}

        <div className='flex flex-col mx-2 py-2 gap-2' ref={currentMessage}>
          {
            allMessage.map((msg, index) => {
              return (
                <div className={` p-2 rounded w-fit max-w-[280px] md:max-w-sm lg:,ax-w-md ${user?._id === msg?.msgByUserId ? "ml-auto bg-teal-100" : "bg-white"}`}>
                  <div className='w-full'>
                    {
                      msg?.imageUrl && (
                        <img src={msg?.imageUrl}
                        className='w-full h-full object-scale-down'
                        alt="" />
                      )
                    }
                  
                    {
                      msg?.videoUrl && (
                        <video src={msg?.videoUrl}
                        className='w-full h-full object-scale-down'
                        controls
                        alt="" />
                      )
                    }
                  </div>
                  <p className='px-2'>{msg.text}</p>
                  <p className='text-xs ml-auto  w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
                </div>
              )
            })
          }
        </div>
        {/* uploaad images display  */}
        {
          message.imageUrl && (
            <div className='bg-slate-700 sticky bottom-0 w-full h-full bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
              <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-white ' onClick={handleClearUploadImage}>
                <IoClose size={25} />
              </div>
              <div className='bg-white p-3 rounded'>
                <img src={message.imageUrl} alt="uploadImage" className='aspect-square w-full h-full max-w-sm m-2 object-scale-down' />
              </div>
            </div>
          )
        }
        {/* uploaad video display  */}
        {
          message.videoUrl && (
            <div className='bg-slate-700 w-full sticky bottom-0 h-full bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
              <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-white ' onClick={handleClearUploadVideo}>
                <IoClose size={25} />
              </div>
              <div className='bg-white p-3 rounded'>
                <video src={message.videoUrl} controls muted autoPlay className='aspect-square w-full h-full max-w-sm m-2 object-scale-down ' />
              </div>
            </div>
          )
        }
        {
          loading && (
            <div className='w-full h-full sticky bottom-0 flex justify-center items-center'>
              <Loading />

            </div>
          )
        }
      </section>

      {/* send messag */}
      <section className='h-16 flex px-4 items-center bg-white'>
        <div className='relative'>
          <button onClick={handleOpenImageVideoUpload} className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white'>
            <FaPlus size={20} />
          </button>
          {/* video and image  */}
          {
            openIamageVideoUpload && (

              <div className='bg-white shadow rounded absolute bottom-14 w-36 p-2 '>
                <form>
                  <label htmlFor='uploadImage' className='flex items-center gap-3 p-2 cursor-pointer px-3 hover:bg-slate-200'>
                    <div className='text-primary'>
                      <FaImage size={18} />
                    </div>
                    <p>Image</p>
                  </label>
                  <label htmlFor='uploadVideo' className='flex items-center gap-3 cursor-pointer px-3 p-2 hover:bg-slate-200'>
                    <div className='text-purple-600'>
                      <FaVideo size={18} />
                    </div>
                    <p>Video</p>
                  </label>
                  <input type="file" id='uploadImage' className='hidden' onChange={handleUploadImage} />
                  <input type="file" id='uploadVideo' className='hidden' onChange={handleUploadVideo} />
                </form>
              </div>
            )
          }
        </div>

        {/* inpu box  */}
        <form className='h-full w-full flex gap-2' onSubmit={handleSendMessage}>
          <input type="text" placeholder='type here...' value={message.text} onChange={(e) => setMessage({ ...message, text: e.target.value })} className='py-1 px-5 outline-none w-full h-full ' />
          <button className='hover:text-primary text-secondary'>
            <IoMdSend size={25} />
          </button>
        </form>
      </section>
    </div>
  )
}

export default MessagePage
