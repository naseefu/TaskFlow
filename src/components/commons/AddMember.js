import { Users } from 'lucide-react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ApiService from '../../Sevices/Apiservices';
import './addmembers.css'

const AddMember = ({showPopup,togglePopup,sendBy,teamId}) => {

  const [email, setEmail] = useState('');
  const [error,setError] = useState('')
  const [success,setSuccess] = useState('')


  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(email===''){
      setError("Email is required")
      return;
    }
    try{
      const response =await ApiService.sendRecruitRequest({email,sendBy,teamId})
      setSuccess('Team request send')
      return response;
    }
    catch(err){
      setError(err.response?.data?.message || 'Something went wrong, please try again');
      setSuccess('');
    }
  }

  useEffect(()=>{
    if(error || success){
      setTimeout(()=>{
        setError('')
        setSuccess('')
      },3000)
    }
    
  },[error,success])

  return (
    <div>
        {showPopup && <div className="popup" >
          <div className="popup-content" style={{transition:'all 1s ease'}}>
            <div>
              <div className='popup-title' style={{textAlign:'center'}}>
                <h1>Add Member</h1>
                <p>Fill the following details</p>
              </div>
            </div>
            {error  && <div>
          <p style={{color:'red'}} className='add-success'>{error}</p>
        </div>}
        {success  && <div>
          <p style={{color:'rgba(32, 252, 143,1)'}} className='add-success'>{success}</p>
        </div>}
        <div className='team-name'>
          <label style={{marginBottom:'10px'}}>Email Address</label>
        <input
          type="text"
          name="email"
          value={email}
          placeholder='Email address'
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
      </div>

      <div className='add-member' style={{display:'flex', flexDirection:'row'}}>
        <div className='btns-pop' >
        <button className='close-btn' onClick={togglePopup} style={{borderRadius:"20px"}}>Close</button></div>
        <div>
          <button className='submit-btn' onClick={handleSubmit} style={{backgroundColor:'rgba(32, 252, 143,1)',borderRadius:"20px"}}>Add Member</button>
        </div>
      </div>
            
          </div>
        </div>}
    </div>
  )
}

export default AddMember
