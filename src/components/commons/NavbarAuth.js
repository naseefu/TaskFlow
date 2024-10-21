import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'

const NavbarAuth = () => {

  return (
    <div className='nav navauth' style={{padding:'20px 10px 0 10px',margin:0}}>
      <div className='nav-elements' >
        <div className='nav-links1' >
          <NavLink to='/' activeclassname = "active" className='nav1'>HOME</NavLink>
        </div>
        {/* <div className='nav-icons'>
          <img src={img1} alt='icon' className='nav-icon'/>
        </div> */}
        <div className='nav-links1'>
          <NavLink to='/about' activeclassname = "active" className='nav1'>ABOUT</NavLink>
          <NavLink to='/contact' activeclassname = "active" className='nav2'>CONTACT US</NavLink>
        </div>
      </div>
    </div>
  )
}

export default NavbarAuth