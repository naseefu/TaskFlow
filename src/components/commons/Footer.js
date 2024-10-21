import React from 'react'
import './footer.css'
import { LiaCopyrightSolid } from "react-icons/lia";
const Footer = () => {
  return (
    <div className='footer'>
    <div className='footer-main'>
      <div className='footer-help'>
        <h1>Helpful Resoueces</h1>
        <p>About Us</p>
        <p>Contact Support</p>
        <p>FAQs</p>
      </div>
      <div className='footer-compay'>
        <h1>Company Info</h1>
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>Feedback</p>
      </div>
      <div className='footer-follow'>
        <h1>Follow Us</h1>
        <p>Facebook Page</p>
        <p>Twitter Feed</p>
        <p>Linkedin Profile</p>
        <p>Instagram Gallery</p>
      </div>
    </div>
      <div className='wc-underline'>
        </div>
    <div className='wc-underline'>
          <div className='wc-under'></div>
        </div>
    <div className='footer-under' style={{color:'white'}}>
      <div className='footer-under-title'>
        <p>TaskFlow</p>
      </div>
      <div className='footer-under-rights'>
        <p><span className='rights-span' color='white' style={{fontSize:'18px'}}> &copy;</span> Copyright 2024 Budget SavvY. All rights reserved</p>
      </div>
    </div>
    </div>
  )
}

export default Footer
