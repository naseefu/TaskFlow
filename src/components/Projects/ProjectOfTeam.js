import React from 'react';
import profile3 from '../profiles/img1.PNG';
import profile4 from '../profiles/img2.PNG';
import profile5 from '../profiles/img3.PNG';
import profile6 from '../profiles/img4.PNG';
import { MdOutlineCalendarMonth } from "react-icons/md";
import '../Dashboard/dashboard.css';
import '../Projects/project.css';
import { useUser } from '../Context/UserContext';
import { useState } from 'react';
import AddProject from '../commons/AddProject';
import { useNavigate } from 'react-router-dom';

const ProgressBar = ({ progress }) => {
  const filledSegments = Math.floor(progress / 20); // Whole segments filled
  const hasPartialSegment = progress % 20 > 0; // Check if there's a partial segment
  return (
    <div className="progress-bar-container">
      {Array.from({ length: 5 }, (_, index) => {
        if (index < filledSegments) {
          return <div key={index} className="progress-segment filled"></div>;
        }
        if (index === filledSegments && hasPartialSegment) {
          return <div key={index} className="progress-segment partial"></div>;
        }
        return <div key={index} className="progress-segment"></div>;
      })}
      {/* Display percentage */}
    </div>
  );
};

const getMonthName = (monthNumber)=> {
  const date = new Date();
  date.setMonth(monthNumber - 1); // Subtract 1 because months are 0-indexed in JavaScript
  return date.toLocaleString('default', { month: 'long' });
}

const ProjectOfTeam = ({projectList,adminId,teamId,userList}) => {

  const {user} = useUser()

  const colors = ['#0055ff', 'black', '#ff5d39', '#2abf4b', '#FF69B4', '#40E0D0'];
  const pro = [profile3,profile4,profile5,profile6]
  const [showPopup,setShowPopup] = useState(false)

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const navigate = useNavigate()

  const handleEachProject=(teamId,projectId)=>{
    navigate(`/home/project/${teamId}/${projectId}`)
  }
  

  return (
    <div className='dashs' style={{ backgroundColor:'#f9f9f9', borderRadius:'20px 20px 20px 20px',height:'fit-content' }}>
      <AddProject showPopup={showPopup} togglePopup={togglePopup} teamId={teamId}/>
      <div className='dash1-1 dash111'>
        <div className='dash1-11'>
          <div className='dash1-111'>
            <h1>Projects</h1>
            <p>You have <span>{projectList.length}</span> Projects</p>
          </div>
          <div className='dash1-112'>
            {user.id===adminId && <button onClick={()=>setShowPopup(true)}>+ Add</button>}
          </div>
        </div>
        <div className='dash1-12' style={{ flexWrap:'wrap',padding:'15px' }}>
          {projectList.length === 0 ? (
          <div className='no-projects' style={{padding:'20px 0',color:'grey'}}>
            <p>No projects to display. {user.id===adminId &&"Start by adding a new project!"}</p>
          </div>
        ) : (
        projectList.map((project, index) => (
          
            <div className='dash1-12-card1' key={index} style={{ backgroundColor: `${colors[index % colors.length]}`,cursor:'pointer' }} onClick={()=>handleEachProject(teamId,project.id)}>
              <div className='card-title'>
                <h1>{project.projectname.length > 20 ?project.projectname.slice(0,19)+'..':project.projectname}</h1>
              </div>
              <div className='card-progress'>
                <div className='progress'>
                  <p>Progress</p>
                  <p>{project.projectprogress}%</p>
                </div>
                <div className='progress-bar'>
                  <ProgressBar progress={project.projectprogress} />
                </div>
              </div>
              <div className='card-members'>
                <div className='member-pics'>
                  {userList.slice(0,3).map((user,index)=>(
                    <img src={user.profilepicture} style={{marginLeft:index>0&&'-15px'}} alt='members' />
                  ))}
                  {userList.length>3 && <p style={{marginLeft:"-15px",backgroundColor:colors[index+2%colors.length],padding:'8px 8px',borderRadius:"35px"}}>+{userList.length -3}</p>}
                </div>
                <div className='deadline'>
                  <p><span><MdOutlineCalendarMonth /></span>{getMonthName(project.enddate[1]).slice(0,3)} {project.enddate[2]}</p>
                </div>
              </div>
            </div>
          
        )))}</div>
      </div>
    </div>
  );
};

export default ProjectOfTeam;
