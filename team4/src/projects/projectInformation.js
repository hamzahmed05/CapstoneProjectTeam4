import React from 'react'


const ProjectInformation = (props) => {

    var finished = false; 
    

    if (props.project){
        finished = true; 
    }

        if (finished){ 
            let urlString = "/project/" + props.project.id;
        return(
            
            <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
            <span className="card-title"><a href={urlString}> {props.project.title}</a></span>
            <p className="grey-text">{props.project.contents}</p> 
            <p className={props.project.status === "Incomplete" ? "red-text" : "green-text"}> Due: {props.project.date}</p>
            <p className={props.project.status === "Incomplete" ? "red-text" : "green-text"}> Completed: {props.project.status}</p>
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




