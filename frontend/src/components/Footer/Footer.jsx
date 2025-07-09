import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' id='footer'> 
    <div className="footer-content">
      <div className="footer-content-left">
         <img src={assets.logo} alt="" />
         <p> 
            seedskraft is a one-stop destination for all your gardening needs. We offer a wide range of high-quality seeds. Whether you're a seasoned gardener or just starting out, we have everything from flower seeds to vegetable seeds, indoor plants to outdoor plants, we have it all. Our products are sourced from trusted suppliers and are guaranteed to be fresh and viable.
         </p>
         <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
         </div>
      </div>
      <div className="footer-content-center">
         <h2>COMPANY</h2>
         <ul>
            <li>Home</li>
            <li> About Us</li>
            <li> Delivery</li>
            <Link to='/term&condi'> <a href="#">Privacy policy</a></Link>
         </ul>
      </div>
      <div className="footer-content-right">
         <h2>Get In Touch</h2>
         <ul>
            <li>+91 8334815137</li>
            <li>ankushsingha777@gmail.com</li>
         </ul>
      </div>
    </div>
    <hr />
    <p className='footer-copyright'>Copyright 2025 © seedskraft.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer