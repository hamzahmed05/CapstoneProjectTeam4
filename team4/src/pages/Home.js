import React, {Component} from 'react';
import './Home-Style.css';
import {useHistory} from 'react-router-dom'
import Chat from '../chat/chat'
import ProjectModule from '../projects/projects'
import { render } from 'react-dom';
import Profile from './Profile';
import AllStudents from '../professor/allstudents';
import UserGroups from '../professor/allgroups';

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

		  if (props.currentUser.accountType != "new"){
				//console.log(props.currentUser)
				return(
					<>
						<div>
							<b><p style={{color: "black", textTransform: "uppercase"}}> {props.currentUser.accountType} page</p></b>
							<img src={props.currentUser.photoURL}/>
							<p> {props.currentUser.displayName}</p>
							<p> {props.currentUser.university}</p>
						</div>
					</>

					)
		  } 
	  }


	  function studentOrProf() {

		if (props.currentUser.accountType == "student"){
			return(
				<>
					<h5> Project Information</h5>
			  		<ProjectModule/>
				</>
			)	  
	  }
	  if (props.currentUser.accountType == "professor"){  
		return(
			  <>
				<AllStudents/>
				<UserGroups/>
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
			  <div class="box content">
				{studentOrProf()}</div>
			  <div class="box footer">ECampus ©</div>
			</div>
			{isNewUser()}
		 </div>
      )
  }





