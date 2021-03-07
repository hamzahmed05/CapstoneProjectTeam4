import React, {Component} from 'react';
import { auth, firestore} from "../services/firebase";
import moment from "moment";

class ProjectDetails extends Component{

    constructor (props) {
        super(props);
        this.state = {
          id: props.match.params.id,
          project: null,
          isLoaded: false,
          checked: null
        };
      }

      componentDidMount () {
        firestore.collection('projects').doc(this.state.id).get()
        .then(res => { 
          this.setState({
            project: res.data(),
            isLoaded: true,
            checked: res.data().status === "Completed"
            })
          }
        );
      }

      onCompletedChange = (e) => {
        this.setState({ checked: e.target.checked });
      }

      handleDelete = (e) =>{
        firestore.collection('projects').doc(this.state.id).delete()
        .then(res => { 
          this.props.history.push({
            pathname: "/project"
          });
          window.location.reload(false);
        });
      }

      handleSubmit = (e) => {
        if (this.state.checked){
          this.state.project.status = "Completed";
        }
        else{
          this.state.project.status = "Incomplete";
        }
        e.preventDefault();
        firestore
          .collection("projects")
          .doc(this.state.project.id)
          .set({
            content: this.state.project.content,
            createdAt: this.state.project.createdAt,
            createdBy: this.state.project.createdBy,
            date: this.state.project.date,
            id: this.state.project.id,
            status: this.state.project.status,
            title: this.state.project.title
          }).then((res) => {
            window.location.reload(false);
          });
      };

      render() {
        try{
          return (
            <div>
              {this.state.isLoaded ? 
                <div>



                    <div className ="container section project-details">
                            

                            <div className="card z-depth-0">
                                <div className="card-content">
                                    <span className="card-title">{this.state.project.title} </span>
                                    {this.state.project.content}
                                    <p className={this.state.project.status === "Incomplete" ? "red-text" : "green-text"}> Due: {this.state.project.date}</p>
                                    <p className={this.state.project.status === "Incomplete" ? "red-text" : "green-text"}> Completed: {this.state.project.status}</p>
                                </div>
                                
                                <div className=" card-action gret lighten-4 grey-text">
                                    <div> Posted by {this.state.project.createdBy }</div>
 
                                </div>
                            </div>


                        <form onSubmit={this.handleSubmit}> 
                            <div class="center-align">
                              <label>
                                <input
                                  id=""
                                  type="checkbox"
                                  
                                  value="completed"
                                  onChange={this.onCompletedChange}
                                  defaultChecked={this.state.project.status === "Completed"}
                                />
                                <span> Completed </span>
                              </label>
                            </div>
                            <br/>
                            <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                              <i class="material-icons right"></i>
                            </button>
                            </form>
                            <br/>

                            <a class="waves-effect waves-light btn-small" onClick={this.handleDelete}>Delete Project</a>
                        </div>


            
              </div>
                    
                    : 
                    
                    <h3> Loading </h3>}
                  </div>
                );
              }
              catch{
                return(
                  <div>
                    <h3> The project selected is invalid </h3>
                  </div>
                )
              }
            } 
}

export default ProjectDetails