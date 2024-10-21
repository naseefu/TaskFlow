import React from 'react'
import './dashboard.css'
import profile3 from '../images/profile.jpg'
import { MdOutlineCalendarMonth } from "react-icons/md";
import Calendar from '../Date/Calender';
import ActivityBar from '../Activity/ActivityBar';
import TaskBoard from '../Task/TaskBoard';
import Project from '../Projects/Project';

const ProgressBar = ({ progress }) => {
  // Calculate the number of filled segments based on progress
  const filledSegments = Math.floor(progress / 20); // Whole segments filled
  const hasPartialSegment = progress % 20 > 0; // Check if there's a partial segment

  return (
    <div className="progress-bar-container">
      {/* Create 5 segments */}
      {Array.from({ length: 5 }, (_, index) => {
        if (index < filledSegments) {
          return <div key={index} className="progress-segment filled"></div>;
        }
        if (index === filledSegments && hasPartialSegment) {
          return <div key={index} className="progress-segment partial"></div>;
        }
        return <div key={index} className="progress-segment"></div>;
      })}
      <span className="progress-text"></span> {/* Display percentage */}
    </div>
  );
};
const Dashboard = () => {

  const progress = 55;

  return (
    <div className='dash'>
      <div className='dash1'>
        <div className='project-card' style={{}}>
          <Project isDashboard={true}/>
        </div>
        <div className='dash1-2'>
          <Calendar/>
        </div>    
      </div>
      <div className='dash2'>
        <div className='dash2-1'>
          <ActivityBar/>
        </div>
        <div className='dash2-2'>
          <TaskBoard isDashboard={true}/>
        </div>    
      </div>
    </div>
  )
}

export default Dashboard
