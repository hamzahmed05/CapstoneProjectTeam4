import React, { Component } from 'react'
import ProjectInformation from './projectInformation'
import { auth, firestore} from "../services/firebase";


class project extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
          projects: null,
          isLoaded: false
        };
      }



    componentDidMount () {
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

        })
    }).then(() => {
        this.setState({
            isLoaded: true,
            projects: studentProjects
        })
    })
    }


    render(){
        return (
            
            <div> 
            {this.state.isLoaded ?
            <div className="project-list section">
             {this.state.projects.map((project) =>  ( 
                <ProjectInformation project={project}/>
             ))}
            </div>
            :
            <h3> loading </h3>
            
        }
         </div>
        )
    }

    
}




export default project