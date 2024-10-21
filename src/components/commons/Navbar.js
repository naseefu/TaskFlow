import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import img1 from '../images/Budget Savvy.png'
import { Menu, X } from 'lucide-react'

const Navbar = ({isNotFound}) => {
  const [homeMenu,setHomeMenu] = useState(false)
  return (
    <div className='nav navbar-home' style={{backgroundColor:isNotFound && 'transparent'}}>
      <div className='nav-elements' >
        <div className='nav-links1 nav-links-1'>
          <NavLink to='/' activeclassname = "active" className='nav1' style={{color:isNotFound &&'white',fontSize:isNotFound && '12px'}}>HOME</NavLink>
          <NavLink to='/services' activeclassname = "active" className='nav1' style={{color:isNotFound &&'white',fontSize:isNotFound && '12px'}}>SERVICES</NavLink>
          <NavLink to='/products' activeclassname = "active" className='nav1' style={{color:isNotFound &&'white',fontSize:isNotFound && '12px'}}>ABOUT</NavLink>
        </div>
        {/* <div className='nav-icons'>
          <img src={img1} alt='icon' className='nav-icon'/>
        </div> */}
        <div className='nav-links1 nav-links-2'>
          <NavLink to='/login' activeclassname = "active" className='nav1' style={{color:isNotFound &&'white',fontSize:isNotFound && '12px'}}>LOGIN</NavLink>
          <NavLink to='/signup' activeclassname = "active" className='nav1' style={{color:isNotFound &&'white',fontSize:isNotFound && '12px'}}>SIGNUP</NavLink>
          <NavLink to='/contact' activeclassname = "active" className='nav2' style={{color:isNotFound &&'black',backgroundColor:isNotFound &&'#06ee9a',fontSize:isNotFound && '12px'}}>CONTACT US</NavLink>
          <p className='home-menu' onClick={()=>setHomeMenu(!homeMenu)} style={{color:isNotFound &&'white',fontSize:isNotFound && '12px'}}>{!homeMenu ? <Menu/>:<X/>}</p>
        </div>
      </div>
      {homeMenu &&
      <div className='hide-elements'>
        <div className='hide-1'>
          <NavLink to='/portfolio' activeclassname = "active" className='nav1' style={{color:isNotFound &&'white',fontSize:isNotFound && '12px'}}>PORTFOLIO</NavLink>
          <NavLink to='/about' activeclassname = "active" className='nav1' style={{color:isNotFound &&'white',fontSize:isNotFound && '12px'}}>ABOUT</NavLink>
          <NavLink to='/contact' activeclassname = "active" className='nav1' style={{color:isNotFound &&'white',fontSize:isNotFound && '12px'}}>CONTACT US</NavLink>
        </div>
        <div className='hide-2'>
          <NavLink to='/' activeclassname = "active" className='nav1' style={{color:isNotFound &&'white',fontSize:isNotFound && '12px'}}>HOME</NavLink>
          <NavLink to='/services' activeclassname = "active" className='nav1' style={{color:isNotFound &&'white',fontSize:isNotFound && '12px'}}>SERVICES</NavLink>
          <NavLink to='/products' activeclassname = "active" className='nav1' style={{color:isNotFound &&'white',fontSize:isNotFound && '12px'}}>PRODUCTS</NavLink>
        </div>
      </div>}
    </div>
  )
}

export default Navbar