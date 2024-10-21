import React from 'react';
import './taskBoard.css';
import { Dot, Timer } from 'lucide-react';
import { useEffect } from 'react';
import { useUser } from '../Context/UserContext';
import ApiService from '../../Sevices/Apiservices';
import { useState } from 'react';
import { useTaskData, useTodayTaskData } from '../Context/ProjectContext';

const TodayTaskPage = ({ isDashboard }) => {
  const colors = ['#0055ff', 'black', '#ff5d39', '#2abf4b', '#FF69B4', '#40E0D0'];
  const tasks = useTodayTaskData()
  
const getMonthName = (monthNumber)=> {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('default', { month: 'long' });
}

  const handleColor = (priority) => {
    switch (priority) {
      case 'Low':
        return 'rgb(0, 81, 255)';
      case 'Middle':
        return 'rgb(0, 240, 0)';
      default:
        return 'red';
    }
  };
    const handleBg = (priority) => {
    switch (priority) {
      case 'Low':
        return 'rgba(0, 81, 255,0.2)';
      case 'Middle':
        return 'rgba(255, 184, 52, 0.2)';
      default:
        return 'rgba(255, 30, 30, 0.2)';
    }
  };

  return (
    <div className='taskboard tasksboard'>
      <div className='task1-1'>
        <h1>Task Board</h1>
        <p>Today tasks</p>
      </div>
      <div
        className='task1-2'
        style={isDashboard ? { display: 'flex', flexDirection: 'column' } : { display: 'grid' }}
      >
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div className='task1-2-card1' key={index}>
              <div className='card1-title'>
                {task.status==='completed' ? <h1 style={{textDecoration:'line-through',textDecorationColor:'grey'}}>{task.taskname}</h1> : <h1>{task.taskname}</h1>}
                <p style={{ backgroundColor: `${colors[index % colors.length]}` }}>
                  {task.jobtype.split(" ")[0]}
                </p>
              </div>
              <div className='card1-desc'>
                <p>{task.taskdescription}</p>
              </div>
              <div className='card-underline'></div>
              <div
                className='card-priority'
                style={{ color: handleColor(task.priority), fontWeight: 'bold', fontSize: '14px' }}
              >
                {task.status==='completed' ? <p style={{color:'green'}}>Completed</p >: <p className='task1-2-prio' style={{display:"flex",alignItems:"center",backgroundColor:handleBg(task.priority)}}><span><Dot/></span>{task.priority}</p>}
              </div>
              <div className='card-lefttime' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                {task.status==='completed' ?'':
                <p>
                  <Timer className='timer' /> Log : {task.duration}
                </p>}
                <div>
                {task.assignedUser.map((pic,index)=>(
                  <img src={pic} key={index} style={{maxHeight:"35px",borderRadius:'20px',marginLeft:index>0&&"-15px"}}/>
                ))}</div>
              </div>
              
            </div>
          ))
        ) : (
          <div className='no-tasks' style={{color:'grey',padding:'0px 0 20px 0px'}}>
            <p>No tasks available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayTaskPage;
