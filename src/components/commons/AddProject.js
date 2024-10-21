import { Users } from 'lucide-react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ApiService from '../../Sevices/Apiservices';
import './addmembers.css'
import { useUser } from '../Context/UserContext';
import 'font-awesome/css/font-awesome.min.css';

const AddProject = ({showPopup,togglePopup,teamId}) => {

  const [startdate, setStartDate] = useState();
  const [enddate, setEndDate] = useState();
  const [projectname, setProjectName] = useState('');
  const [projectdescription, setProjectDesc] = useState('');
  const [priority,setPriority] = useState('')
  const [error,setError] = useState('')
  const [success,setSuccess] = useState('')
  const {user} = useUser()

  const [loading,setLoading] = useState(false)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true)
    try{
      const response =await ApiService.addProjectToTeam(user.id,teamId,{startdate,enddate,priority,projectdescription,projectname})
      setSuccess('Project created')
      setLoading(false)
    }
    catch(err){
      setError(err.response?.data?.message || 'Something went wrong, please try again');
      setLoading(false)
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
        {showPopup && <div className="popup addproject" >
          <div className="popup-content" style={{transition:'all 1s ease',alignItems:'start'}}>
            <div>
              <div className='popup-title' style={{margin:'0 auto',marginBottom:'20px'}}>
                <h1>Add Project</h1>
                <p>Fill the following details</p>
              </div>
            </div>
            {error  && <div>
          <p style={{color:'red'}} className='add-success'>{error}</p>
        </div>}
        {success  && <div>
          <p style={{color:'rgba(32, 252, 143,1)'}} className='add-success'>{success}</p>
        </div>}
        <div className='project-name' style={{display:'flex',flexDirection:'column',marginBottom:'10px'}}>
          <label style={{marginBottom:'10px'}}>Project name</label>
        <input
          type="text"
          name="projectname"
          value={projectname}
          placeholder='project name'
          onChange={(e)=>setProjectName(e.target.value)}
          required
        />
      </div>
      <div className='project-desc' style={{display:'flex',flexDirection:'column',marginBottom:'10px'}}>
          <label style={{marginBottom:'10px'}}>Project description</label>
        <input
          type="text"
          name="projectdescription"
          value={projectdescription}
          placeholder='project description'
          onChange={(e)=>setProjectDesc(e.target.value)}
          required
        />
      </div>
      <div className='project-priority' style={{display:'flex',flexDirection:'column',marginBottom:'10px'}}>
        <label style={{marginBottom:'10px'}}>Select priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option disabled value="" style={{color:'grey'}}>Select an option</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      
      <div className='project-start' style={{display:'flex',flexDirection:'column',marginBottom:'10px'}}>
          <label style={{marginBottom:'10px'}}>Start date</label>
        <input
          type="date"
          name="startdate"
          value={startdate}
          placeholder='start date'
          onChange={(e)=>setStartDate(e.target.value)}
          required
        />
      </div>

      <div className='project-start' style={{display:'flex',flexDirection:'column',marginBottom:'10px'}}>
          <label style={{marginBottom:'10px'}}>End date</label>
        <input
          type="date"
          name="startdate"
          value={enddate}
          placeholder='end date'
          onChange={(e)=>setEndDate(e.target.value)}
          required
        />
      </div>

      <div className='add-member' style={{display:'flex', flexDirection:'row',marginBottom:'10px'}}>
        <div className='btns-pop' >
        <button className='close-btn' onClick={togglePopup} style={{borderRadius:"20px"}}>Close</button></div>
        <div>
          {loading? <button className="buttonload submit-btn" style={{backgroundColor:'rgba(32, 252, 143,1)'}}>
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>:<button className='submit-btn' onClick={handleSubmit} style={{backgroundColor:'rgba(32, 252, 143,1)',borderRadius:"20px"}}>Add Project</button>}
        </div>
      </div>
            
          </div>
        </div>}
    </div>
  )
}

export default AddProject
