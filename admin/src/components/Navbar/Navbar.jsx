import React from 'react'
import './Navbar.css'
import {assets} from'../../assets/assets'
import { useEffect } from 'react'
import { useNavigate } from 'react-router';
const Navbar = () => {
  const naviget=useNavigate()
  useEffect(()=>{
    const token= localStorage.getItem('admin')
    if(!token){
      
      naviget("/login")
    }
  })
  return (
    <div className='navbar' style={{ color: '#333', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <img className='logo' src={assets.logo} alt="" />
      <p style={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'inherit' }}>Admin Panel</p>
      <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar