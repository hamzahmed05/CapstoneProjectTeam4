import firebase from 'firebase/app'
import { render } from 'react-dom';
import React, {Component} from 'react';
import SignIn from '../auth/SignIn';
import { fb , auth, firestore}  from '../services/firebase';

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
          <h3> Please login</h3>
            <button onClick={googleSignIn}>Sign in with Google</button>
        </div>       
    )
  }
}

async function addUserToDb(user){
  const userRef = firestore.collection('userInfo').doc(user.uid).set({
    displayName : user.displayName,
    email : user.email,
    photoURL: user.photoURL,
    accountType: "new",
    university: "new",
    uid: user.uid
  });
}


export default Login


    
