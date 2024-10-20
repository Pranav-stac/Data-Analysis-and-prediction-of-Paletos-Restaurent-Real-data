import React from 'react'
import { NavLink } from 'react-router-dom'
import { icons } from '../assets'

function Sidebar() {
  return (
    <div className='w-full h-[95vh] flex flex-col'>
      <p className='text-white font-pricedown text-5xl'>Paletos</p>
      <div className="mt-[100px] w-full h-full flex-1 flex flex-col items-center gap-3">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `w-full py-2 px-4 rounded-2xl ${isActive ? 'bg-[#1D1C22]' : 'bg-transparent'} text-white font-chaletLondon text-lg flex gap-3`
          }
        >
          <img src={icons.homeIcon} alt="home" className='size-6 object-contain' />
          <p>Home</p>
        </NavLink>
        {/* <NavLink 
          to="/analytics" 
          className={({ isActive }) => 
            `w-full py-2 px-4 rounded-2xl ${isActive ? 'bg-[#1D1C22]' : 'bg-transparent'} text-white font-chaletLondon text-lg flex gap-3`
          }
        >
          <img src={icons.analyticsIcon} alt="analytics" className='size-6 object-contain' />
          <p>Analytics</p>
        </NavLink> */}
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
      <div className="w-full h-[100px] flex gap-4">
        <img src="data:image/jpeg;base64,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" alt="" className='size-[100px] rounded-xl' />
        <div className="h-full flex-1 flex flex-col">
          <p className='font-pricedown text-2xl text-white'>Anirufdh sengupta</p>
          <p className='font-pricedown text-lg text-green-500'>Admin</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
