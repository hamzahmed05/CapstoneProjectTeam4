import firebase from 'firebase/app'
import { render } from 'react-dom';
import React, {Component} from 'react';
import SignIn from '../auth/SignIn';
import { fb , auth, firestore}  from '../services/firebase';
import { getBetterImage } from '../helpers/helper'

const googleSignIn = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then((result) => {
        if (result.additionalUserInfo.isNewUser){
          addUserToDb(result.user);
        }
      });   
    }


class Login extends Component{
  render() {
    return (
        <div>
          <h1> Welcome to ECampus!</h1>
		<h4>Please sign in or create a new account</h4>
 		<br/>

		<input onClick={googleSignIn} type="image" src="./google_sign_in_button.png"/>
        </div>
    )
  }
}

async function addUserToDb(user){
  const userRef = firestore.collection('userInfo').doc(user.uid).set({
    displayName : user.displayName,
    email : user.email,
    photoURL: getBetterImage(user.photoURL),
    accountType: "new",
    university: "new",
    uid: user.uid
  });
}


export default Login


    
