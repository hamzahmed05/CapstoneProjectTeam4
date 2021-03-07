import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../actions/projectActions'
import {auth, firestore}  from '../services/firebase'
import firebase from 'firebase/app'
import { useHistory, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';






class CreateProject extends Component {
    

    state = {
        status: 'Incomplete',
        content: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: '',
        date: '',
        id: uuidv4()
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

        var element = document.getElementById(e.target.id + "Label");
        if (e.target.value != "") {
            element.classList.add("active");
            this.setState({ text: e.target.value });
          } else {
            element.classList.remove("active");
          }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.state.createdBy = firebase.auth().currentUser.displayName;
        this.props.createProject(this.state);
        
    }
      
    render () {
        return (
             
            <div className="container">
                
                
                
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3"> Create new project</h5>

                    <div className="input-field">
                        <label htmlFor="title" id="titleLabel">Title</label>
                        <input type="text" id="title" required onChange={this.handleChange}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="content" id="contentLabel">Project Content</label>
                        <input type="text" id="content" required onChange={this.handleChange}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="date" id="dateLabel"></label>
                        <input type="date" id="date" required onChange={this.handleChange}/>
                    </div>
                    

                    <div className="input-field">
                        <button className="btn blue lighten-1 z-depth-0">Create</button>
                        
                    </div>
                    
                    
                    </form>
                    
                    
            </div>
        
        )
   
        

    }
}

const mapDispathToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(null, mapDispathToProps)(CreateProject)