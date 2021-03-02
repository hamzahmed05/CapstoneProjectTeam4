import React, {Component } from 'react'
import {firestore} from '../services/firebase'


class AllStudents extends Component {


    constructor(props) {
        super(props);
        this.state = {student_list: [], isLoaded: false}

    }


    componentDidUpdate(){
        if (this.state.isLoaded == false){
            this.componentDidMount();
        }
    }
    componentDidMount(){
        const students = [];
        firestore.collection("userInfo").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (`${doc.data().accountType}` === "student"){
                    students.push({
                        name: `${doc.data().displayName}`,
                        type: `${doc.data().accountType}`,
                        img: `${doc.data().photoURL}`,
                        uni: `${doc.data().university}`,
                        uid: `${doc.data().uid}`
                    });
                }
            });
        })

        this.setState({student_list: students, isLoaded: true});
            
    }

    
    render(){
        
        const info = this.state.student_list.map((student) => { 
                        return <div className="student_list_container" key={student.uid}>
                            <img src={student.img}></img>
                            <p>{student.name} | {student.type} at {student.uni}.</p>
                            </div>
                        })

        return (
            <div>
                {this.state.isLoaded ? 
                <div>
                    <h1>Current Students</h1>
                        <div>
                            Information: 
                            <ul className="student_list_box">{info}</ul>
                        </div>
                </div>
                :
                <h3>Loading</h3>
                }
            </div>
        );
    }

}

export default AllStudents
