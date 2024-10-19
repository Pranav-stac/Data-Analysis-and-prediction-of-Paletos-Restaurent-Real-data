import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import Analytics from './pages/Analytics'
import Home from './pages/Home'
import Chatbot from './pages/Chatbot'
import Upload from './pages/Upload'
import Dashboard from './components/Dashboard'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/analytics' element={<Analytics/>} />
      <Route path='/chatbot' element={<Chatbot/>} />
      <Route path='/upload' element={<Upload/>} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <Dashboard /> */}
  </StrictMode>,
)
