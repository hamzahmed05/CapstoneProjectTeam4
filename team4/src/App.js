import React, {useState,  Component } from 'react';

import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app'


// imports for classes
import Title from './Title';
import Navbar from'./layout/Navbar'
import dashboard from './dash/dashboard';
import ChatRoom from './chat/chat';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { fb , auth, firestore}  from './services/firebase';


import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';


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
                {user ? <ChatRoom/> : <Login/> } 
            </section>
        </div>
        
      </div>
    </Router>
  );
}


export default App;
