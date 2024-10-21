import React from "react";
import './joinTeam.css'
const JoinTeam = ({teamcode,setTeamCode,togglePopup,handleJoinReq,joinError,joinSuccess}) => {
  return(
  <div className="jointeam">
    <div className="join-title">
      <h1>Join Team</h1>
      <p>Fill the following</p>
    </div>
    {joinError && <p style={{color:'red',fontSize:'13px'}}>{joinError}</p>}
    {joinSuccess && <p style={{color:'green',fontSize:'13px'}}>{joinSuccess}</p>}
    <div className="joincode">
      <label style={{fontWeight:'bold'}}>Enter Team Code</label>
      <input type="text" placeholder="Team code" value={teamcode} onChange={(e)=>setTeamCode(e.target.value)}>
      </input>
    </div>
    <div className='add-member' style={{display:'flex',flexDirection:'row'}}>
        <div className='btns-pop'>
        <button className='close-btn' onClick={togglePopup}style={{borderRadius:"20px"}}>Close</button></div>
        <div>
          <button className='submit-btn'style={{backgroundColor:'#0055ff',borderRadius:"20px"}} onClick={handleJoinReq}>Send Request</button>
        </div>
      </div>
  </div>
  )
};

export default JoinTeam;
