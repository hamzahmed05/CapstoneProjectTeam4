import React from 'react'
import ProjectInformation from './projectInformation'
import './project-page.css';

const ProjectModule = () => {
    return (
        <div className="project-list section">
            <div class="proj1"><ProjectInformation/></div>
            <ProjectInformation/>
            <ProjectInformation/>
            <ProjectInformation/>
            <ProjectInformation/>
            <ProjectInformation/>
            <ProjectInformation/>
            <ProjectInformation/>
        </div>
    )
    
}

export default ProjectModule