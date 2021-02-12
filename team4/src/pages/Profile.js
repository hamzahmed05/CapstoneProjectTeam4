import React, {Component} from 'react';
import { useParams } from 'react-router-dom';
import {getUserById} from '../helpers/auth'
import { auth, firestore} from "../services/firebase";


class Profile extends Component{

  constructor (props) {
    super(props);
    this.state = {
      uid: props.match.params.user,
      user: null,
      isLoaded: false
    };
  }

  componentDidMount () {
    firestore.collection('userInfo').doc(this.state.uid).get()
    .then(res => { 
      this.setState({
        user: res.data(),
        isLoaded: true
        })
      }
    );
  }

    render() {
      console.log(this.state.user);
      try{
        return (
          <div>
            {this.state.isLoaded ? 
  
            <div>
              <img src={this.state.user.photoURL}/>
              <h3>Name: {this.state.user.displayName}</h3>
              <h3>Email: {this.state.user.email}</h3>
              <h3>Account Type: {this.state.user.accountType}</h3>
              <h3>ID: {this.state.uid}</h3>
            </div>    
            
            : 
            
            <h3> Loading </h3>}
          </div>
        );
      }
      catch{
        return(
          <div>
            <h3> The username entered is invalid </h3>
          </div>
        )
      }
    } 
  }

  
  export default Profile