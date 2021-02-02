import React from 'react'

const ProjectDetails = (props) => {    // props come from the React Router, that contain details about the router
    const id = props.match.params.id;  // It shows us an object with history, location, and match (route parameter)
    return (
        <div classname ="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Project Title - {id} </span>
                    <p> Information over here...</p>
                </div>
                <div classname=" card-action gret lighten-4 grey-text">
                    <div> Posted by Team 4</div>
                    <div> Feburary 1st, 2020</div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails