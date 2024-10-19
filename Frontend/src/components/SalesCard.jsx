import React from 'react'

function SalesCard({ data }) {
  return (
    <div className='bg-[#11111] w-full h-full p-10 rounded-xl flex'>
      <div className='w-[201px] flex flex-col'>
      <div className='relative '>
      <h2 className='text-[#FFCC00] text-6xl font-pricedown'>Sales</h2>
      <p className='text-white font-signPainter absolute left-28 -bottom-6 text-2xl'>Here We Go</p>
      </div>
      <div className='flex flex-col items-start mt-10 gap-2'>
        <button className='font-chaletLondon bg-[#FFCC00] w-full py-1 rounded-xl'>Weekly</button>
        <button className='font-chaletLondon bg-[#FFCC00] w-full py-1 rounded-xl'>Monthly</button>
        <button className='font-chaletLondon bg-[#FFCC00] w-full py-1 rounded-xl'>Yearly</button>
      </div>
      <div className='flex flex-col items-start mt-4 gap-2'>
        <button className='font-chaletLondon text-white border-gray-100 border w-full py-1 rounded-xl'>Hindu</button>
        <button className='font-chaletLondon text-white border-gray-100 border w-full py-1 rounded-xl'>Muslim</button>
        <button className='font-chaletLondon text-white border-gray-100 border w-full py-1 rounded-xl'>Jain</button>
        <button className='font-chaletLondon text-white border-gray-100 border w-full py-1 rounded-xl'>Catholic</button>
      </div>
      </div> 
      <div>
        {/* charts */}
        </div>   
      </div>
  )
}

export default SalesCard

