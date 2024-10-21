import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../Sevices/Apiservices';
import { useProjects } from '../Context/ProjectContext';
import ProjectOfTeam from '../Projects/ProjectOfTeam';
import TeamMembers from './TeamMembers';
import './teamdetails.css'
import { Copy, User } from 'lucide-react';
import { useUser } from '../Context/UserContext';
import DynamicPage from '../Context/DynamicPage';


const TeamDetails = () => {
  const { teamId } = useParams();
  const {user} = useUser()
  const [teamData, setTeamData] = useState(null);
  const [error, setError] = useState(null);
  const [userList,setUserList] = useState([])
  const [projectList,setProjectList] = useState([])
  const [adminId,setAdminId] = useState()
  const [copied,setCopied] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    const getTeamById = async () => {
      try {
        const response = await ApiService.getTeamByTeamId(user.id,teamId);

        if(response.message==="invalid"){
          navigate("/home/dashboard")
          return;
        }

        setAdminId(response.user.id)
        setUserList(response.userList);
        setTeamData(response.teamDto);  // Assuming `response` contains team data
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      }

    };

    const getProjectById = async()=>{
      try{
        const response = await ApiService.getAllProjectsByTeamId(user.id,teamId);
        if(response.message==="invalid"){
          navigate("/home/dashboard")
          return;
        }
        setProjectList(response.projectList)
      }
      catch(err){
        setError(err.response?.data?.message || "An error occured")
      }
    }  
    getProjectById();
    getTeamById();
    if(copied){
        setTimeout(()=>{
          setCopied(false)
        },2000)
      }
  }, [teamId,copied,user]);

  const handleCopy=(content)=>{
    navigator.clipboard.writeText(content)
    setCopied(true)
  }

  const [showPopup, setShowPopup] = useState(false);

  const [showss,setShowss]= useState(false)

  const handleMouseEnter = () => {
    setShowss(true);
  };

  const handleMouseLeave = () => {
    setShowss(false);
  };
  

  return (
    <div style={{borderRadius:'20px 0 0 0',padding:"10px"}}>
        {teamData && <DynamicPage title={teamData.teamname} description={teamData.description} />}
      <div className='teamdetails1'>
      <div className='projectofteam'>
        {teamData && <div className='teamdatas'>
        <div className='teamdata1'>
          <h1>{teamData.teamname}</h1>
          <p style={{color:'grey',marginTop:'5px'}}>{teamData.description}</p>
        </div>
      </div>}
      {
        projectList &&
        <ProjectOfTeam projectList={projectList} adminId={adminId} teamId={teamData && teamData.id} userList={userList&& userList}/>
      }
    </div>
      <div className='team-members'>
        {teamData && <TeamMembers copied={copied} userList={userList&& userList} adminId={adminId} teamId={teamData && teamData.id} showPopup={showPopup} teamcode={teamData.teamcode && teamData.teamcode} teamName={teamData && teamData.teamname} teamsize={teamData.teamsize && teamData.teamsize} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} showss={showss} handleCopy={handleCopy} />}
      </div>
    </div></div>
  );
};

export default TeamDetails;
