import React from 'react'


const ProjectInformation = (props) => {

    var finished = false; 
    
    console.log("WE IN")

    if (props.project){
        finished = true; 
    }

        if (finished){ 
        return(
            <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
            <span className="card-title"><a href="/project/:1">{props.project.title}</a></span>
            <p className="grey-text">{props.project.contents}</p> 
            <p> Posted by {props.project.createdUser}</p>
            </div>
            </div>    
            )
        }
        else{
            return(
                <div> error loading</div>
            )
        }
    }

export default ProjectInformation




