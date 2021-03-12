import React, {Component } from 'react'
import {firestore} from '../services/firebase'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

class AllStudents extends Component {


    constructor(props) {
        super(props);
        this.state = {group_list: [], isLoaded: false}

    }


    componentDidUpdate(){
        if (this.state.isLoaded == false){
            this.componentDidMount();
        }
    }
    componentDidMount(){
        const students = [];
        firestore.collection("usergroups").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                    students.push({
                        userID: `${doc.data().content}`,
                        groupName: `${doc.data().title}`,
                        createdBy: `${doc.data().createBy}`,
                    });
                
            });
        }).then(() => {
            this.setState({
                isLoaded: true,
                group_list: students
            })
        })
      
    }

    

    render(){
        
        const info = this.state.group_list.map((student) => { 
                        return <div className="student_list_container" key={student.userID}>
                            <a href={'profile/' + student.userID}>{student.userID} is in group "{student.groupName}".</a><br></br>
                            </div>
                        })

        return (
            <div>
                {this.state.isLoaded ? 
                <div>
                    <p>Current Groups</p>
                        <div>
                            <ul className="student_list_box">{info}</ul>
                        </div>
                </div>
                :
                <div class="loader"></div>
                }
            </div>
        );
    }

}

export default AllStudents
