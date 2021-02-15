import React from 'react'
import { db, firestore } from '../services/firebase'


const ProjectInformation = () => {
    
    
    return(
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">Project Title</span>
                <p> Posted by Team 4</p>
                <p className="grey-text">1/25/2021</p>
            </div>
        </div>
    )
}

export default ProjectInformation