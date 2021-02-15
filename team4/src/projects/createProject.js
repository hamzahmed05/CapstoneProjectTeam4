import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../actions/projectActions'
import {auth, firestore}  from '../services/firebase'
import firebase from 'firebase/app'
import { useHistory, useParams } from 'react-router-dom';


class CreateProject extends Component {

    state = {
        status: '',
        content: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createProject(this.state)
    }
    render () {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3"> Create new project</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="content">Project Content</label>
                        <input type="content" id="materialize-textarea" onChange={this.handleChange}/>
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