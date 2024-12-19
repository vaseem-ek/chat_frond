import React from 'react'
import { PiUserCircle } from 'react-icons/pi'
import { useSelector } from 'react-redux'

function Avatar({ userId, name, imageUrl, width, height }) {
    const onlineUser=useSelector((state)=>state?.user?.onlineUser)

    //vaseem akram
    let avatarName = ""

    if (name) {
        const splitName = name?.split(" ")
        if (splitName.length > 1) {
            avatarName = splitName[0][0].toUpperCase() + splitName[1][0].toUpperCase()
        } else {
            avatarName = splitName[0][0].toUpperCase()
        }
    }
    const bgColor=[
        'bg-slate-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-yellow-200'
    ]
    const randomNumber=Math.floor(Math.random() *9)  
    const isOnline=onlineUser.includes(userId)  
    return (
        <div className={`text-slate-800   rounded-full  font-bold relative`}  style={{ width: width + "px", height: height + "px" }}>
            {
                imageUrl ? (
                    <img src={imageUrl}
                        height={height}
                        width={width}
                        alt={name}
                        className='overflow-hidden rounded-full' />
                ) : (
                    name ? (
                        <div className={`overflow-hidden rounded-full flex justify-center items-center ${bgColor[randomNumber]} `} style={{ width: width + "px", height: height + "px" }}>
                            {avatarName}
                        </div>
                    ) : (
                        <PiUserCircle size={width} />
                    )
                )
            }
            {
                isOnline  && (
                    <div className='bg-green-500 absolute p-1 bottom-1 right-1 z-10 rounded'></div>
                )
            }
        </div>
    )
}

export default Avatar
