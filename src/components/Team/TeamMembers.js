import React from 'react'
import { useEffect } from 'react'
import profile3 from '../profiles/img1.PNG';
import profile4 from '../profiles/img2.PNG';
import profile5 from '../profiles/img3.PNG';
import profile6 from '../profiles/img4.PNG';
import { Copy, Dot, Plus, Trash2, User, UserRoundPlus, X } from 'lucide-react';
import { useUser } from '../Context/UserContext';
import AddMember from '../commons/AddMember';
import { useState } from 'react';
import DeleteMember from '../commons/DeleteMember';
import DeleteTeam from '../commons/DeleteTeam';
import './teamdetails.css'
const TeamMembers = ({userList,adminId,teamId,teamsize,teamcode,handleMouseEnter,handleMouseLeave,handleCopy,copied,showss,teamName}) => {

  const {user} = useUser()
  const pro = [profile3,profile4,profile5,profile6]
  const colors = ['#0055ff', 'black', '#ff5d30', '#2abf4b', '#FF69B4', '#40E0D0'];
  // const   colors = ['rgba(32, 252, 143,0.7)', 'rgba(255, 242, 117,0.7)', 'rgba(181, 255, 225,0.7)', 'rgba(172, 243, 157,0.7)', 'rgba(202, 255, 185,0.7)'];
  const [removerId,setRemoverId]=useState()

  const [showPopup,setShowPopup] = useState(false)

  const [membername,setMemberName] = useState('')

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

    const [showPopup1,setShowPopup1] = useState(false)

  const togglePopup1 = (remover) => {  
    setShowPopup1(!showPopup1);
  };

  const sendTeamRemover=(remover,u1,u2)=>{
    setShowPopup1(!showPopup1)
    setRemoverId(remover)
    setMemberName(u1+" "+u2)
  }

  const [showPopup2,setShowPopup2] = useState(false)

  const togglePopup2 = () => {  
    setShowPopup2(!showPopup2);
  };


  return (
    <div className='team-members'>
      <AddMember showPopup={showPopup} togglePopup={togglePopup} sendBy={user.id} teamId={teamId}  />
      <DeleteMember showPopup={showPopup1} togglePopup={togglePopup1} userId={user.id} teamId={teamId} removerId={removerId && removerId} membername={membername}/>
      <DeleteTeam showPopup={showPopup2} togglePopup={togglePopup2} teamId={teamId} userId={user.id} teamName={teamName}/>
      {userList ? <div>

        <div className='teams'>
          {user.id===adminId &&<div className='add-member-button' >
            <p onClick={()=>setShowPopup(!showPopup)} className='add-member-btn'><span style={{backgroundColor:'white',borderRadius:'15px'}}><UserRoundPlus height='15px' /></span><span style={{textAlign:'center',width:'100%'}}>Add Members</span></p>
            <p onClick={()=>setShowPopup2(!showPopup2)} className='delete-team-btn' style={{border:'1px solid red',color:'red',display:"flex",alignItems:'center'}}><span style={{borderRadius:'15px',marginTop:'3px'}}><Trash2 width='20px' height='14px'/></span> <span style={{textAlign:'center',width:'100%'}}>Delete Team</span></p>
          </div>}
          {userList.map((users,index)=>(
            <div className='userss' key={index} style={{backgroundColor:colors[index+6%colors.length],position:'relative'}}>
              { user.id===adminId && users.id!==adminId && <p onClick={()=>sendTeamRemover(users.id,users.firstname ,users.lastname)} style={{position:'absolute',top:'0',right:'0',margin:'8px 15px',backgroundColor:'red',border:'1.5px solid red',borderRadius:'20px',cursor:'pointer'}}><X color='white' height='10px' width='14px'/></p>}
              <div className='user-details'>
                <img src={users.profilepicture} alt='user-avatar'/>
                <div className='user-name-email'>
                <p style={{color:'white'}}>{users.firstname} {users.lastname}</p>
                <p style={{color:'rgb(79, 200, 236)'}}>{users.email}</p></div>
              </div>
              <div className='user-access'> 
                {users.id===adminId ? <div style={{display:'flex',alignItems:'center'}}><p className='manager-span'><Dot/></p><p style={{color:'rgb(0, 255, 0)'}}>Team Manager</p></div>:<p style={{color:'white',fontSize:'10px'}}>Team Member</p>}
              </div>
            </div>
          ))}
          {teamcode && teamsize &&
          <div className='teamdata2' >
            <p><User height='16px' style={{color:'grey'}} /> {teamsize}</p>
            <div style={{position:'relative',cursor:'pointer'}} className='teamdata-teamcode' onClick={()=>handleCopy(teamcode)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <p style={{cursor:'pointer'}} className='teamcode-btn'><Copy height='16px' style={{color:'grey'}} /> {teamcode.length > 15 ? teamcode.slice(0,13)+'..':teamcode}</p>
            {showss && <div className="pop-teamcode" style={{pointerEvents:"none"}}>{copied ? "copied!":"click to copy"}</div>}</div>
        </div>}
        </div>


      </div> 
        
        : 
      
      <div>Team list loading...</div>}
    </div>
  )
}

export default TeamMembers
