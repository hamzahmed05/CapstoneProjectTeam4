import React, {Component} from 'react';
import './Home-Style.css';
import {useHistory} from 'react-router-dom'
import ChatSmall from '../chat/chat'

export default function Home(props){
	const history = useHistory();
	function isNewUser(){
		if(props.currentUser.accountType === "new"){
		  history.push({
			pathname: '/usersettings',
			state: props.currentUser
		  });
		}
	  }
      return (
          <div id="homepage-grid">
			<div class="wrapper">
			  <div class="box sidebar">Profile</div>
			  <div class="box sidebar2"><ChatSmall/></div>
			  <div class="box content">Project Overview
				<br /> This is where the middle content goes.</div>
			  <div class="box footer">Footer</div>
			</div>
			{isNewUser()}
		 </div>
      )
  }
 

