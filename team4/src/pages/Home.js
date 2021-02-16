import React, {Component} from 'react';
import './Home-Style.css';
import {useHistory} from 'react-router-dom'
import Chat from '../chat/chat'
import ProjectModule from '../projects/projects'
import { render } from 'react-dom';
import Profile from './Profile';


export default function Home(props){
	

	const history = useHistory();
	function isNewUser(){
		if(props.currentUser.accountType == "new"){
		  history.push({
			pathname: '/usersettings',
			state: props.currentUser
		  });
		}
	  }

	  function isAlreadyAUser() {
		  if (props.currentUser.accountType == "student"){
				//console.log(props.currentUser)
				return(
					<>
						<div>
							<p> {props.currentUser.accountType} page</p>
							<img src={props.currentUser.photoURL}/>
							<p> {props.currentUser.displayName}</p>
						</div>
					</>

					)
		  }
	  }

      return (
          <div id="homepage-grid">
			<div class="wrapper">
			  <div class="box sidebar">
				  {isAlreadyAUser()}
				  
				  </div>
			  <div class="box sidebar2"><Chat/></div>
			  <div class="box content">Project Overview
				<br /> 
				<ProjectModule/></div>
			  <div class="box footer">ECampus ©</div>
			</div>
			{isNewUser()}
		 </div>
      )
  }





