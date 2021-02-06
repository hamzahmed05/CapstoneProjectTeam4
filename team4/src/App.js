import React, {useState,  Component } from 'react';

import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app'


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


import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: {},
    }
  }

  componentDidMount(){
    this.authListener();
  }

  authListener() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      }
      else {
        this.setState({user: null});
      }
    });
  };

  render(){ 
    return (
      <Router>
        <div className="App">
          <Navbar currentUser={this.state.user}/>
          <Switch>
            <PrivateRoute isLoggedIn={ this.state.user } path="/home" component={Home} />
            <PrivateRoute isLoggedIn={ this.state.user } path="/project" component={Dashboard} />
            <PrivateRoute isLoggedIn={ this.state.user } path="/chat" component={ChatRoom} />
            <PrivateRoute isLoggedIn={ this.state.user } path="/project/:id" component={ProjectDetails} />

            <Route exact path="/">
                {this.state.user ? <Redirect to="/home" /> : <Login />}
            </Route>

            <Route exact path="/login">
                {this.state.user ? <Redirect to="/home" /> : <Login />}
            </Route>
          </Switch>
        </div>
      </Router>
      );
    } 
}

const PrivateRoute = ({ isLoggedIn, ...props }) =>
    isLoggedIn? <Route { ...props } /> : <Redirect to="/login" />


export default App;
