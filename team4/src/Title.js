// Header for web app

import React from 'react';
import ReactDOM from 'react-dom';
import './Title.css'

class Title extends React.Component {
  render() {
    return (
      <div class="header" id="myHeader">
          <h2>CTF</h2>
      </div>
    );
  }
}


ReactDOM.render(<Title />, document.getElementById('root'));


export default Title