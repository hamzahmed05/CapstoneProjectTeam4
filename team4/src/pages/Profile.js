import React, { Component } from 'react';
import { auth, firestore } from "../services/firebase";
import firebase from 'firebase/app'
import Collapsible from 'react-collapsible';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uid: props.match.params.user,
      user: null,
      authUser: null,
      isLoaded: false,
      usernameChange: null,
      docID: null
    };
  }

  handleChange = (e) => {
    e.target.value = e.target.value.replace(/ /g, '').toLowerCase();
    this.setState({
      usernameChange: e.target.value.replace(/ /g, '')
    })

  }

  handleSubmit = (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'CONFIRM USERNAME CHANGE',
      message: 'Are you sure you want to change your username to ' + this.state.usernameChange + '?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {


            firestore.collection('userInfo').where("uid", "==", this.state.usernameChange).get()
              .then(querySnapshot => {
                if (querySnapshot.docs[0]) {
                  alert("That username already exists!");
                }
                else {

                  firestore
                    .collection("userInfo")
                    .doc(this.state.docID)
                    .set({
                      displayName: this.state.user.displayName,
                      email: this.state.user.email,
                      photoURL: this.state.user.photoURL,
                      accountType: this.state.user.accountType,
                      university: this.state.user.university,
                      uid: this.state.usernameChange,
                    })
                    .then((res) => {
                      this.props.history.push({
                        pathname: "/profile/" + this.state.usernameChange
                      });
                      window.location.reload(false);
                    });

                }
              }
              );




          }
        },
        {
          label: 'No'
        }
      ]
    });

  }

  authListener() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        firestore.collection('userInfo').doc(user.uid).get()
          .then(res => {
            this.setState({
              authUser: res.data().uid,
              isLoaded: true
            });
          }
          );
      }
      else {
        this.setState({ user: null });
      }
    });
  };

  componentDidMount() {
    firestore.collection('userInfo').where("uid", "==", this.state.uid).get()
      .then(querySnapshot => {
        if (querySnapshot.docs[0]) {
          this.setState({
            user: querySnapshot.docs[0].data(),
            docID: querySnapshot.docs[0].id
          })
          this.authListener();
        }
        else {
          this.setState({
            isLoaded: true
          })
        }
      }
      );

  }

  render() {
    console.log(this.state)
    try {
      return (
        <div>
          {this.state.isLoaded ?
            <div>
              <h2 style={{ textAlign: 'center' }}>User Profile</h2>
              <div class="card">
                <img src={this.state.user.photoURL} style={{ width: '100%' }} alt={this.state.user.displayName} />
                <h1>{this.state.user.displayName}</h1>
                <p style={{ textTransform: 'capitalize' }} class="profile-title">{this.state.user.accountType}</p>
                <p>Email: {this.state.user.email}</p>
                <p>My ID: {this.state.uid} </p>
                <p style={{ paddingBottom: '24px' }}>University: {this.state.user.university}</p>
              </div>
              <div>
                {this.state.authUser == this.state.uid ?
                  <Collapsible trigger="Profile Settings">
                    <p> Change Username:</p>
                    <form onSubmit={this.handleSubmit}>
                      <div style={{ backgroundColor: 'white', borderRadius: '10px' }} className="input-field" >
                        <input type="text" id="username" maxLength="30" placeholder="Username" required onChange={this.handleChange} />
                      </div>
                      <div className="input-field">
                        <button className="btn grey lighten-1 z-depth-0">Set</button>

                      </div>
                    </form>
                  </Collapsible>
                  :
                  <p></p>
                }
              </div>

            </div>

            :

            <h3> Loading </h3>}
        </div>
      );
    }
    catch {
      return (
        <div>
          <h3> The username entered is invalid </h3>
        </div>
      )
    }
  }
}


export default Profile