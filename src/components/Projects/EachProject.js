import React, { useEffect } from 'react';
import { useUser } from '../Context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../Sevices/Apiservices';
import { useState } from 'react';
import { ClipboardPlus, CopyPlus, UserRoundPlus } from 'lucide-react';
import './eachproject.css'
import TeamMembers from '../Team/TeamMembers';
import TaskByProject from '../Task/TaskByProject';
import AddMember from '../commons/AddMember';
import AddTask from '../commons/AddTask';

const EachProject = () => {
  const { user } = useUser();
  const { teamId, projectId } = useParams(); // Destructure useParams to get teamId and projectId

  const [project,setProject] = useState()
  const [userList,setUserList] = useState([])
  const [team,setTeam] = useState()
  const [adminId,setAdminId] = useState()
  useEffect(() => {
    const getEachProject = async () => {
      if (teamId && projectId && user?.id) {
        try {
          const userId = user.id;
          const response = await ApiService.getEachProjectDetails(userId, teamId, projectId); 
          setProject(response.projectDto)
        } catch (err) {
          if(err.response?.data?.message==="no such project exist"){
            navigate(`/home/team/${teamId}`)
          }
          console.log(err);
        }
      }
    };

    const getTeamDetails = async ()=>{
      if(teamId && user?.id){

        try{

          const response = await ApiService.getTeamByTeamId(user.id,teamId);
          setUserList(response.userList)
          setTeam(response.teamDto)
          setAdminId(response.user.id)

        }
        catch(err){
          console.log(err);
        }

      }
    }
    getTeamDetails();
    getEachProject();
  }, [teamId, projectId, user]);

  const [showPopup,setShowPopup] = useState(false)
  const navigate= useNavigate()

  const togglePopup=()=>{
    setShowPopup(false)
  }
    
  const [showPopup1,setShowPopup1] = useState(false)
  const togglePopup1=()=>{
    setShowPopup1(false)
  }

  return (
    <div className='eachpro'>
      {showPopup &&<AddMember showPopup={showPopup} sendBy={adminId} teamId={team && teamId} togglePopup={togglePopup}/>}
      {showPopup1 &&<AddTask showPopup={showPopup1} togglePopup={togglePopup1} teamId={team && teamId} userId={user && user.id} projectId={project && project.id} userList={userList && userList.filter((user)=>user.id!=adminId)} setShowPopup={setShowPopup1}/>}
      {project && team && userList ?<div> <div className='eachpro-1'>
        <div className='pro1left'>
          <h1 style={{textAlign:"center"}}>{project.projectname}</h1>
        </div>
        <div className='pro1right'>
          <div>{userList.map((user,index)=>(
            <img src={user.profilepicture} key={index} height='40px' style={{marginLeft:index>0&&"-15px",borderRadius:'20px'}} />
          ))}</div>
          <div className='invite-btns'>
          {user.id===adminId &&<button className='each-invite' onClick={()=>setShowPopup(true)}><UserRoundPlus height='15px' /> Invite</button>}
          {user.id===adminId &&<div style={{display:'flex',alignItems:'end',justifyContent:'end'}}>
        <button className='each-invite' style={{fontSize:'12px'}} onClick={()=>setShowPopup1(true)}><span><CopyPlus height="14px"/></span>Add Task</button>
      </div>}</div>
        </div>
      </div>
      
      <div className='eachpro-2'>
          <div>
            <TaskByProject projectId={projectId} teamId={teamId}/>
          </div>
          {/* <div>
            <TeamMembers userList={userList} adminId={adminId} teamId={team.id}/>
          </div> */}
          <div>

          </div>
      </div>
      </div>:'Fetching project details...'}
    </div>
  );
};

export default EachProject;
