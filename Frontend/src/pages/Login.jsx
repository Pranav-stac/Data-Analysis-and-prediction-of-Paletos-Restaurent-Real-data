import { images } from "../assets"

function Login() {
  return (
    <div className="bg-[#FFCC00] w-screen flex justify-center items-center overflow-hidden">
        <div className='h-screen w-full max-w-[1440px] bg-[#FFCC00] flex'>
            <div className="flex-1 flex justify-center items-center">
                <div className="w-[500px] h-[500px] bg-[#FF6A00] rounded-3xl flex flex-col justify-center items-center relative">
                    <p className="font-signPainter text-5xl text-white">Login</p>
                    <form action="" className="flex flex-col">
                        <p className="text-white font-chaletLondon text-lg">UserID</p>
                        <input type="text" placeholder="Enter your UserID" className="w-[300px] h-[40px] bg-[#ffbb00d2] rounded-2xl p-2 placeholder:text-[#ffffffcb]" />
                        <p className="text-white font-chaletLondon text-lg mt-3">Password</p>
                        <input type="password" placeholder="Password" className="w-[300px] h-[40px] bg-[#ffbb00d2] rounded-2xl p-2 placeholder:text-[#ffffffcb]" />
                        <button type="submit" className="w-[300px] h-[40px] rounded-2xl bg-[#FFEA00] font-chaletLondon text-lg mt-5">Login</button>
                    </form>
                    <p className="font-pricedown absolute text-8xl top-0 -mt-32 text-[#FF6A00]">Paleto</p>
                </div>
            </div>
            <div className="flex-1 h-full w-full">
                <img src={images.login} className="h-full object-cover absolute" />
            </div>
        </div>
    </div>
    
  )
}

export default Login
