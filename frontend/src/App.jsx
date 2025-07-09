import React, { useState } from 'react'
import Navbar from './components/NavbarFolder/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Cart from './pages/CartFolder/Cart.jsx'
import PlaceOrder from './pages/PlaceOrderFolder/PlaceOrder.jsx'
import Home from './pages/HomeFolder/Home.jsx'
import Footer from './components/FooterFolder/Footer.jsx'
import LoginPopup from './components/LoginPopupFolder/LoginPopup.jsx'
import Userorder from "./components/orders/Userorder.jsx"
import About from './pages/AboutFolder/About.jsx'
import TermAndCondi from './components/T&C/TermAndCondi.jsx'
const App = () => {

  const [showLogin,setShowlogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowlogin={setShowlogin}/>:<></>}
      <div className='app'>
      <Navbar setShowlogin={setShowlogin}/>
      <ToastContainer/>
      <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/about' element={<About/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order'element={<PlaceOrder/>}/>
        <Route path='/term&condi'element={<TermAndCondi/>}/>

        <Route path='/userorder'element={<Userorder/>}/>
      
      </Routes>
    </div>
    <Footer/>
    </>
  

  )
}

export default App