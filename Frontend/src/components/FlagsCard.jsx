import React, { useState } from 'react'

function FlagsCard() {
  // State to manage the logs (red flags)
  const [logs, setLogs] = useState([
    'Discrepancy found: Invoice_No_ 403',
  ]);

  // Function to clear the logs
  const clearLogs = () => {
    setLogs([]); // Clears the logs by setting the array to empty
  };

  return (
    <div className='p-8 '>
      <div className='relative mb-8'>
        <h2 className='text-[#FFCC00] text-6xl font-pricedown'>Flags</h2>
        <p className='text-white font-signPainter absolute left-28 -bottom-6 text-2xl'>
          Ah! Here We Go Again
        </p>
      </div>

      {/* Display the logs */}
      {logs.length > 0 ? (
        logs.map((log, index) => (
          <div key={index} className='mt-5 p-2 text-white border bg-red-600 border-red-600 rounded-xl shadow-md'>
            {log}
          </div>
        ))
      ) : (
        <p className="mt-5 text-white">No logs available.</p>
      )}

      {/* Clear Logs Button */}
      <div className='mt-8'>
        <button
          onClick={clearLogs}
          className='bg-[#F55600] text-white py-5 rounded-full transition text-sm hover:underline'
        >
          Clear Logs
        </button>
      </div>
    </div>
  )
}

export default FlagsCard
