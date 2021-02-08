import React, {Component} from 'react';
import './Home-Style.css';

class Home extends Component{
    render() {
      return (
          <div id="homepage-grid">
     
			<div class="wrapper">
			  <div class="box sidebar">Profile</div>
			  <div class="box sidebar2">Chat</div>
			  <div class="box content">Project Overview
				<br /> This is where the middle content goes.</div>
			  <div class="box footer">Footer</div>
			</div>
		 </div>
      )
    }
  }
  
  export default Home
