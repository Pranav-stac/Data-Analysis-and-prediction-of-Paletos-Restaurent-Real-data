import { useState } from "react";

function SalesCard({ data }) {
  const [itemsToPlot, setItemsToPlot] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleButtonClick = (option) => {
    setItemsToPlot(option);
  };

  const fetchForecastImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://stable-simply-porpoise.ngrok-free.app/generate-forecast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items_to_plot: [itemsToPlot] }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[#11111] w-full h-full p-10 rounded-xl flex gap-4'>
      <div className='min-w-[201px] flex flex-col'>
        <div className='relative '>
          <h2 className='text-[#FFCC00] text-6xl font-pricedown'>Sales</h2>
          <p className='text-white font-signPainter absolute left-28 -bottom-6 text-2xl'>Here We Go</p>
        </div>
        <div className='flex flex-col items-start mt-10 gap-2'>
          <button
            className={`font-chaletLondon ${itemsToPlot === 'Weekly' ? "bg-[#FFCC00]" : "bg-[#FF9D00]"} w-full py-1 rounded-xl`}
            onClick={() => handleButtonClick('Weekly')}
          >
            Weekly
          </button>
          <button
            className={`font-chaletLondon ${itemsToPlot === 'Monthly' ? "bg-[#FFCC00]" : "bg-[#FF9D00]"} w-full py-1 rounded-xl`}
            onClick={() => handleButtonClick('Monthly')}
          >
            Monthly
          </button>
        </div>
        <button onClick={fetchForecastImage} className="bg-blue-500 text-white rounded-md p-2 mt-2">Fetch Image</button>
      </div>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {imageSrc && <img src={imageSrc} alt="Forecast" className="rounded-md mt-4" />}
      </div>
    </div>
  );
}

export default SalesCard;
