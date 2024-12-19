import React from 'react'
import logo from '../assets/logo.png'

function Authlayouts({children}) {
  return (
   <>
    <header className='flex justify-center items-center py-3 h-20 shadow-md'>
      <img
        src={logo}
        alt="logo"
        width={180}
        height={60}
      />
      
    </header>
    {children}
   </>
  )
}

export default Authlayouts
