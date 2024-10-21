import React from 'react'
import Project from './Project'
import './project.css'
import { ProjectProvider } from '../Context/ProjectContext'
const ProjectPage = () => {
  return (
    <div className='projectpage' style={{borderRadius:'20px 0 0 0'}}>
        <Project isDashboard={false}/>
    </div>
  )
}

export default ProjectPage
