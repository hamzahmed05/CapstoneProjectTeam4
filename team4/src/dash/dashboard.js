import React, { Component } from 'react'
import notifications from './notifications'
import projects from '../projects/projects'

class dashboard extends Component {
    render() {
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6"> 
                        <projects/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <notifications/>
                    </div>
                </div>
            </div>
        )
    }
}

export default dashboard;