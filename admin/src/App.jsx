import React from 'react'
import Navbar from './components/Navbar/Navbar'

import Sidebar from './components/Sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Orders/Order'
 import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import Login from './components/Login'
import { useState } from 'react'
const App = () => {
  const [auth,setAuth]=useState(false)
 useEffect(()=>{
     const token= localStorage.getItem('auth-token');
     if(!token){
      console.log("not auth")
      setAuth(true)
     }
 },[])
//  if(auth){
//   return(
//     <Routes>
//           <Route path='/' element={<Login/>}/>  
//     </Routes>
//   )
//  }
  const url =`${import.meta.env.VITE_BACKEND_URL}`

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App