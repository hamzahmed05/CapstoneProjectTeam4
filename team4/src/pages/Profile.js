import React, {Component} from 'react';
import { useParams } from 'react-router-dom';
import {getUserById} from '../helpers/auth'
import { auth, firestore} from "../services/firebase";
import { getBetterImage } from '../helpers/helper'


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
          <h2 style={{textAlign:'center'}}>User Profile</h2>
          <div class="card">
            <img src={this.state.user.photoURL} style= {{ width: '100%' }} alt={this.state.user.displayName} />
            <h1>{this.state.user.displayName}</h1>
            <p style={{ textTransform: 'capitalize' }} class="profile-title">{this.state.user.accountType}</p>
            <p>Email: {this.state.user.email}</p>
            <p>My ID: {this.state.uid} </p>
            <p style={{paddingBottom: '24px'}}>{this.state.user.university}</p>
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
                  <h3> The username entered is invalid </h3>
                </div>
              )
            }
          } 
        }

  
  export default Profile