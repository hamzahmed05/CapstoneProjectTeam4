import React, {Component} from 'react';

class Profile extends Component{
    render() {
      console.log(this.props.currentUser);
      return (
          <div>
            <img src={this.props.currentUser.photoURL}/>
            <h3>Name: {this.props.currentUser.displayName}</h3>
            <h3>Email: {this.props.currentUser.email}</h3>
            <h3>ID: {this.props.currentUser.uid}</h3>
          </div>       
      )
    }
  }
  
  export default Profile