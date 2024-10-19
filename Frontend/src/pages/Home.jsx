import React from 'react'
import SalesCard from '../components/SalesCard'
import PerformanceCard from '../components/PerformanceCard'
import Earnings from '../components/Earnings'

function Home() {
  return (
    <div className='w-full h-full bg-[#1D1C22] py-12 px-9 rounded-l-[30px] flex flex-col gap-7'>
        <p className='text-white font-signPainter text-6xl'>Dashboard</p>
        <div className="grid grid-cols-6 grid-rows-6 gap-3">
          <div className="col-span-4 row-span-2 bg-[#111111] rounded-3xl">
            <SalesCard/>
          </div>
          <div className="col-span-2 row-span-2 bg-[#111111] rounded-3xl">
            <PerformanceCard/>
          </div>
          <div className="col-span-2 row-span-2 bg-[#111111] rounded-3xl">
            
          </div>
          <div className="col-span-4 row-span-2 bg-[#111111] rounded-3xl">
            <Earnings/>
          </div>
        </div>
    </div>
  )
}

export default Home
