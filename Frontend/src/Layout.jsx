import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='w-full h-full p-5 flex gap-5'>
        <div className="max-w-[300px] flex-1">
          <Sidebar/>
        </div>
        <div className="w-full flex-1 rounded-l-[30px]">
          <Outlet/>
        </div>
    </div>
  )
}

export default Layout
