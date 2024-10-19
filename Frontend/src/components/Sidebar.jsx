import React from 'react'
import { NavLink } from 'react-router-dom'
import { icons } from '../assets'

function Sidebar() {
  return (
    <div className='w-full h-full'>
      <p className='text-white font-pricedown text-5xl'>Paletos</p>
      <div className="mt-[100px] w-full h-full flex flex-col items-center gap-3">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `w-full py-2 px-4 rounded-2xl ${isActive ? 'bg-[#1D1C22]' : 'bg-transparent'} text-white font-chaletLondon text-lg flex gap-3`
          }
        >
          <img src={icons.homeIcon} alt="home" className='size-6 object-contain' />
          <p>Home</p>
        </NavLink>
        <NavLink 
          to="/analytics" 
          className={({ isActive }) => 
            `w-full py-2 px-4 rounded-2xl ${isActive ? 'bg-[#1D1C22]' : 'bg-transparent'} text-white font-chaletLondon text-lg flex gap-3`
          }
        >
          <img src={icons.analyticsIcon} alt="analytics" className='size-6 object-contain' />
          <p>Analytics</p>
        </NavLink>
        <NavLink 
          to="/chatbot" 
          className={({ isActive }) => 
            `w-full py-2 px-4 rounded-2xl ${isActive ? 'bg-[#1D1C22]' : 'bg-transparent'} text-white font-chaletLondon text-lg flex gap-3`
          }
        >
          <img src={icons.messageIcon} alt="chatbot" className='size-6 object-contain' />
          <p>Chatbot</p>
        </NavLink>
        <NavLink 
          to="/upload" 
          className={({ isActive }) => 
            `w-full py-2 px-4 rounded-2xl ${isActive ? 'bg-[#1D1C22]' : 'bg-transparent'} text-white font-chaletLondon text-lg flex gap-3`
          }
        >
          <img src={icons.uploadIcon} alt="upload" className='size-6 object-contain' />
          <p>Upload</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
