import firebase from 'firebase/app'
import { auth }  from '../services/firebase';

export default function Login() {

    const googleSignIn = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
    return (
      <button onClick={googleSignIn}>Sign in with Google</button>
    )
  }