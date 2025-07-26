import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useLocation } from 'react-router';
const Navbar = ({setShowlogin}) => {
   const loction=useLocation()
   const [menu,setMenu] = useState("home");
   const {getTotalCartAmount,token,setToken}=useContext(StoreContext);

   const navigate = useNavigate();
   const logout =() =>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/")

   }
  return (
    <div className='navbar'>
     <Link to='/'> <img src={assets.logo} alt="" className='logo' /></Link>
      <ul className="navbar-menu">
         <Link  to='/' onClick={()=>setMenu("home")} className={loction.pathname==="/"?"active":""}>Home</Link>
         <Link  to='/about' onClick={()=>setMenu("about")} className={loction.pathname==="/about"?"active":""}>About Us</Link>
         <a  href='#explore-menu' style={{cursor:"none"}} className={menu==="menu"?"active":""}>Menu</a>
         <Link to="/category" onClick={()=>setMenu("mobile-app")} className={loction.pathname==="/category"?"active":""}>Category</Link>
         <a  href='#footer' onClick={()=>setMenu("contact-us")} >Contact Us</a>
      </ul>
      <div className='navbar-right'>
         <img src={assets.search_icon} alt="" />
         <div className='navbar-search-icon'>
          <Link to='/cart'>  <img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
         </div>
         {!token?<button onClick={()=>setShowlogin(true)}>sign in </button> : <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
           <Link to='/userorder'> <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li></Link>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
          </div>}
          
      </div>
    </div>
  )
}

export default Navbar