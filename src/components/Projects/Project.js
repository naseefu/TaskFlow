import React from 'react';
import profile3 from '../images/profile.jpg';
import { MdOutlineCalendarMonth } from "react-icons/md";
import '../Dashboard/dashboard.css';
import './project.css';
import { useEffect } from 'react';
import ApiService from '../../Sevices/Apiservices';
import { useUser } from '../Context/UserContext';
import { useState } from 'react';
import { useProjects, useTeamDeta } from '../Context/ProjectContext';
import { Dot } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProgressBar = ({ progress }) => {
  const filledSegments = Math.floor(progress / 20);
  const hasPartialSegment = progress % 20 > 0;
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
    </div>
  );
};

const getMonthName = (monthNumber)=> {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('default', { month: 'long' });
}

const Project = ({ isDashboard }) => {

  const colors = ['#0055ff', 'black', '#ff5d39', '#2abf4b', '#FF69B4', '#40E0D0'];
  const pro = [profile3,profile3,profile3]
  const projects = useProjects();
  const teamDeta = useTeamDeta();
  const navigate = useNavigate()
  return (
    <div className='dashs' style={{ backgroundColor: isDashboard ? 'white' : '#f9f9f9', borderRadius: isDashboard ? '20px' : '20px 0 0 0' }}>
      <div className='dash1-1 dash111'>
        <div className='dash1-11'>
          <div className='dash1-111'>
            <h1>Projects</h1>
            <p>You have <span>{projects.length}</span> Projects</p>
          </div>
          <div className='dash1-112'>
            <button>+ Add</button>
          </div>
        </div>
        <div className='dash1-12' style={{ flexWrap: isDashboard ? 'nowrap' : 'wrap' }}>
          {projects.length === 0 ? (
          <div className='no-projects' style={{padding:'20px 0',color:'grey'}}>
            <p>No projects to display. Start by adding a new project!</p>
          </div>
        ) : (
        projects.map((project, index) => (
          
            <div className='dash1-12-card1' onClick={()=>navigate(`/home/project/${teamDeta[index].id}/${project.id}`)} key={index} style={{ backgroundColor: `${colors[index % colors.length]}`,cursor:'pointer' }}>
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
                <div className='project-priority'>
                  <p className={project.priority==='High' && 'card-priority high' || project.priority==='Medium' && 'card-priority medium' || project.priority==='Low' && 'card-priority low'} style={{fontSize:'11px'}} ><span><Dot/></span>{project.priority}</p>
                </div>
                <div className='deadline'>
                  {project.status=="Completed" ? <p style={{color:'rgb(0, 255, 0)',fontSize:'10px'}}>completed</p>:<p><span><MdOutlineCalendarMonth /></span>{getMonthName(project.enddate[1]).slice(0,3)} {project.enddate[2]}</p>}
                </div>
              </div>
            </div>
          
        )))}</div>
      </div>
    </div>
  );
};

export default Project;
