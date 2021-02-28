import React, {useState,  Component } from 'react';


import './App.css';


// imports for classes
import Title from './Title';
import Navbar from'./layout/Navbar'
import Dashboard from './dash/dashboard';
import ProjectDetails from './projects/projectDetails'
import ChatRoom from './chat/chat';
import Home from './pages/Home';
import UserSettings from './pages/UserSettings';
import SignIn from './auth/SignIn';
import Login from './pages/Login';
import { fb , auth, firestore}  from './services/firebase';


import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import Profile from './pages/Profile';

import AllStudents from './professor/allstudents';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: {
        accountType: null,
        displayName: null,
        email: null,
        photoURL : null,
        uid: null
      },
      isLoaded: false,
      isNewUser: false
    }
  }

  componentDidMount(){
    this.authListener();
    }

  authListener() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        firestore.collection('userInfo').doc(user.uid).get()
        .then(res => { 
          this.setState({user: res.data(), isLoaded: true, isNewUser: res.data().accountType === "new"});
        }
      );
      }
      else {
        this.setState({user: null});
      }
    });
  };

  render(){ 
    return (
      <div className="App">
        <Router>
          <Navbar currentUser={this.state.user}/>
          <Switch>
            
          
            
            <PrivateRoute isLoggedIn={ this.state.user } isNew={this.state.isNewUser} path="/home" render={(props) => <Home currentUser={this.state.user} {...props}/>} />
            <PrivateRoute isLoggedIn={ this.state.user } isNew={this.state.isNewUser} path="/profile/:user" render={(props) => <Profile currentUser={this.state.user} {...props}/>} />
            <PrivateRoute isLoggedIn={ this.state.user } isNew={this.state.isNewUser} exact path="/project" component={Dashboard} />
            <PrivateRoute isLoggedIn={ this.state.user } isNew={this.state.isNewUser} path="/chat" component={ChatRoom} />
            <PrivateRoute isLoggedIn={ this.state.user } isNew={this.state.isNewUser} path="/usersettings" component={UserSettings} />
            <PrivateRoute isLoggedIn={ this.state.user } isNew={this.state.isNewUser} path="/project/:id" component={ProjectDetails} />


            <Route exact path="/">
                {this.state.user ? <Redirect to="/home" /> : <Login />}
            </Route>

            <Route exact path="/login">
                {this.state.user ? <Redirect to="/home" /> : <Login />}
            </Route>

            <Route exact path="/profile">
                {this.state.user ? <Redirect to={`profile/${this.state.user.uid}`} /> : <Login />}
            </Route>

            <Route exact path="/prof">
                 <AllStudents/>
            </Route>

            
          </Switch>
        </Router>
     </div>
      );
    } 
}


const PrivateRoute = ({ isLoggedIn, isNew, ...props }) => 
     isLoggedIn? <Route { ...props } /> : <Redirect to="/login" />





export default App;
