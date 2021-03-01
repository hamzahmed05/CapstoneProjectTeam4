import React from 'react'
import { db, firestore } from '../services/firebase'
import ProjectDetails from './projectDetails';


const ProjectInformation = () => {
    const studentProjects = [];
    firestore.collection("projects").get().then((querySnapshot) => {
        querySnapshot.forEach(doc => {
            studentProjects.push(
                {contents:  `${doc.data().content}`, 
                createdInfo: `${doc.data().createdAt}`,
                createdUser: `${doc.data().createdBy}`,
                material: `${doc.data().materialize_textarea}`,
                status: `${doc.data().status}`,
                title: `${doc.data().title}`
                }
            );

        });
    })

        const printer = studentProjects.map((projects) =>  {
            return (
                <div className="card z-depth-0 project-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title"><a href="/project/:1">{projects.title}</a></span> 
                    <p> Posted by {projects.createdUser}</p>
                    <p className="grey-text">{projects.createdInfo}</p>
                </div>
                </div>
            )


        })
        return (
            <div>
                projects
            </div>
        )
    }

export default ProjectInformation



