import { Users } from 'lucide-react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ApiService from '../../Sevices/Apiservices';
import './addmembers.css'

const DeleteMember = ({showPopup,togglePopup,userId,removerId,teamId,membername}) => {

  const [error,setError] = useState('')
  const [success,setSuccess] = useState('')


  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response =await ApiService.deleteMember(userId,removerId,teamId)
      setSuccess(response.message)
      togglePopup()
      window.location.reload()
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
                <h3>Do you want to remove the member?</h3><br></br>
                <p>{membername}</p>
              </div>
            </div>
            {error  && <div>
          <p style={{color:'red'}} className='add-success'>{error}</p>
        </div>}
        {success  && <div>
          <p style={{color:'rgba(32, 252, 143,1)ed '}} className='add-success'>{success}</p>
        </div>}

      <div className='add-member' style={{display:'flex', flexDirection:'row'}}>
        <div className='btns-pop' >
        <button className='close-btn' style={{backgroundColor:'black',borderRadius:'20px'}} onClick={togglePopup}>Close</button></div>
        <div>
          <button className='submit-btn' onClick={handleSubmit} style={{backgroundColor:'red',borderRadius:'20px'}}>Remove</button>
        </div>
      </div>
            
          </div>
        </div>}
    </div>
  )
}

export default DeleteMember
