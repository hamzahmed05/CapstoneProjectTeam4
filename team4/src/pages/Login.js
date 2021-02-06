import firebase from 'firebase/app'
import { render } from 'react-dom';
import { auth }  from '../services/firebase';
import React, {Component} from 'react';
import SignIn from '../auth/SignIn';

const googleSignIn = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);      
    }

// const Login = () => {
        
//   return (
//       <div>
//         <h1> Please login</h1>
//         <SignIn/>
//           <button onClick={googleSignIn}>Sign in with Google</button>
//       </div>       

//         )
 
// }

// export default Login

class Login extends Component{
  render() {
    return (
        <div>
          <h3> Please login</h3>
          <SignIn/>
            <button onClick={googleSignIn}>Sign in with Google</button>
        </div>       
    )
  }
}

export default Login


    
