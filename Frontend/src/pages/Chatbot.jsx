import React from 'react'

function Chatbot() {
  return (
    <div className='w-full h-[95vh] bg-[#1D1C22] rounded-l-3xl py-12 px-9 flex flex-col gap-4'>
      <p className='text-white font-signPainter text-6xl'>Lester</p>
      <div className="flex-1 bg-[#111111] rounded-3xl flex flex-col p-3">
        <div className="flex-1"></div>
        <div className="flex w-full gap-2">
          <input type="text" className='py-2 px-6 flex-1 outline-none text-white bg-gray-500 rounded-full text-lg placeholder:text-white font-chaletLondon' placeholder='Enter your message' />
          <button className='px-10 py-2 bg-[#F55600] text-white rounded-full text-lg'>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
