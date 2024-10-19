import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='w-full h-full py-5 pl-5 flex gap-5'>
        <div className="max-w-[300px] flex-1">
          <div className="fixed w-[300px]">
            <Sidebar/>
          </div>
        </div>
        <div className="w-full h-full flex-1 rounded-l-[30px]">
          <Outlet/>
        </div>
    </div>
  )
}

export default Layout
