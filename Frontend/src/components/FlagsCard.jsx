import React from 'react'

function FlagsCard() {
  return (
    <div className='p-8 '>
      <div className='relative mb-8'>
          <h2 className='text-[#FFCC00] text-6xl font-pricedown'>Flags</h2>
          <p className='text-white font-signPainter absolute left-28 -bottom-6 text-2xl'>Ah! Here We Go Again</p>
        </div>
        <div className='mt-5 p-2 text-white border bg-red-600 border-red-800 rounded-xl'>
          Discrepancy found: Invoice_No_ 403
        </div>
    </div>
  )
}

export default FlagsCard
