import React, { Component } from 'react'
import Notifications from './notifications'
import ProjectModule from '../projects/projects'
import Calendar from "./calendar";
class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6"> 
                        <ProjectModule/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications/>
                    </div>
                    <div className="col s12 m12 ">
                        <Calendar/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
