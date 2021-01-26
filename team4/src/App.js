import React, {useState,  Component } from 'react';

import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app'



// imports for classes
import Title from './Title';
import Navbar from'./layout/Navbar'
import dashboard from './dash/dashboard';
import chat from './chat/chat';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { fb , auth, firestore}  from './services/firebase';


import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { render } from 'react-dom';


function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="App">
        <Navbar/>

        <Switch>
          <Route path='/dash' exact component={dashboard}/>
        </Switch>
        <div> 
            <section className="chatroom">
                {user ? <ChatRoom/> : <SignIn/> } 
            </section>
        </div>
        
      </div>
    </Router>
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
