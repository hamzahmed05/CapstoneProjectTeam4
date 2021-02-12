import React, {Component} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {getUserById} from '../helpers/auth'
import { auth, firestore} from "../services/firebase";
import { withRouter } from 'react-router';



class UserSettings extends Component{

  constructor (props) {
    super(props);
    this.state = {
      selected: 'student',
      user: props.location.state
    };
  }

  onChange = e => {
    this.setState({selected: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.state.user.accountType = this.state.selected;
    firestore.collection('userInfo').doc(this.state.user.uid).set({
      displayName : this.state.user.displayName,
      email : this.state.user.email,
      photoURL: this.state.user.photoURL,
      accountType: this.state.user.accountType,
      uid: this.state.user.uid
    }).then(res => {
      this.props.history.push({ 
        pathname: '/home',
			  state: this.state.user
      }
      );
      window.location.reload(false);
    });
    
    
    

  }

    render() {
      return(
      <form onSubmit={this.handleSubmit}>
      <h1> Welcome! </h1>
      <h4> Are you a: </h4>
      <br />
      <br />
          <label>
            <input
              type="radio"
              name="usertype"
              value="student"
              onChange={this.onChange}
              defaultChecked
            />
            <span> Student </span>
          </label>
          
            &nbsp; &nbsp;&nbsp;&nbsp;
          
          <label>
            <input
              type="radio"
              name="usertype"
              value="professor"
              onChange={this.onChange}
            />
            <span> Professor </span>
          </label>
          <br />
          <br />
          <br />

      <button type="submit">Submit</button>
    </form>
    
      )
    
  }
}
  
  export default UserSettings