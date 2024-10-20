import {useState} from 'react'

function ReligionGraph() {
  const [imageSrc, setImageSrc] = useState(null);
  const [show, setshow] = useState(true);

  const fetchImage = async () => {
    try {
      const response = await fetch('https://stable-simply-porpoise.ngrok-free.app/festive-plot', {
        method: 'POST',
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
        setshow(false)
      } else {
        console.error('Failed to fetch image');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <div className='w-full h-full p-4 flex justify-center items-center'>
        <button onClick={fetchImage} className={`bg-blue-500 px-4 py-1 rounded-xl text-white ${show?'flex':'hidden'} `}>Fetch Festive Plot</button>
      {imageSrc && <img src={imageSrc} alt="Festive Plot" className='max-w-[75%]' />}

    </div>
  )
}

export default ReligionGraph
