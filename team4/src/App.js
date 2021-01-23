import React, {useState } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

// imports for classes
import Title from './Title';


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBHBiTi2fCc0NY3VjVyp8XGQxzfY9jzob0",
    authDomain: "capstone-301501.firebaseapp.com",
    projectId: "capstone-301501",
    storageBucket: "capstone-301501.appspot.com",
    messagingSenderId: "33802467815",
    appId: "1:33802467815:web:ed9cb7074d72afbc98a542",
    measurementId: "G-6QP6F6T38K"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    
    <div className="App">
      <Title/>
      <div> 
        <section className="chatroom">
          {user ? <ChatRoom/> : <SignIn/> } 
        </section>
      </div>

    </div>
  );
}

function SignIn() {

  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={googleSignIn}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign out</button>
  )
}

function ChatRoom() {
  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(50);
  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const{uid, photoURL} = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');

  }
  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
      </div>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Send a message!" />

        <button type="submit" disabled={!formValue}>Send</button>
      </form>
    </>
  )
}

function ChatMessage(props){

  const {text, uid, photoURL} = props.message;

  const messageClass = uid == auth.currentUser.uid ? 'sent' : 'recieved';

  return (
    <div className={`message ${messageClass}`}>
      <img src = {photoURL}/>
      <p>{text}</p>
    </div>
  )
}

export default App;
