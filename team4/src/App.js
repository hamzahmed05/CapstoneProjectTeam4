import React, {useState,  Component } from 'react';


import './App.css';



// imports for classes
import Title from './Title';
import Navbar from'./layout/Navbar'
import Dashboard from './dash/dashboard';
import ProjectDetails from './projects/projectDetails'
import ChatRoom from './chat/chat';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import SignIn from './auth/SignIn';
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
          <Route path='/dash' exact component={Dashboard}/>
          <Route path='/chat' exact component ={ChatRoom}/>
          <Route path='/login' exact component={Login}/>
          <Route path='/project/:id' component={ProjectDetails}/>
        </Switch>

      </div>
    </Router>
  );
}


export default App;
