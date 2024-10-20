import { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://stable-simply-porpoise.ngrok-free.app/process-csv', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully!'); 
      } else {
        alert('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <div className='w-full h-full py-12 px-9 bg-[#1D1C22] rounded-l-[30px]'>
      <p className='text-white font-signPainter text-6xl'>Uploads</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-9">
        <input type="file" accept=".csv" onChange={handleFileChange} className="text-white"/>
        <button className='w-full py-2 items-center justify-center font-chaletLondon text-lg bg-[#009DFF] rounded-3xl'>Upload</button>
      </form>
    </div>
  )
}

export default Upload
