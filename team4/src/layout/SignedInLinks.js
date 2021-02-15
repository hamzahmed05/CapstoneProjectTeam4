import React from 'react'
import { NavLink } from 'react-router-dom'
import {signout } from '../helpers/auth'
import { connect } from 'react-redux'

const SignedInLinks = (props) => {
    let isNew = props.user.accountType==="new";
    return(
        <ul className="right">
            <li><NavLink to='/home'>Home</NavLink></li>
            {isNew ? null : <li><NavLink to='/project'>Project</NavLink></li>}
            {isNew ? null : <li><NavLink to='/chat'>Chat</NavLink></li>}
            <li><NavLink to='/' onClick={signout}>Log Out</NavLink></li>
            {isNew ? null : <li><NavLink to='/profile' className='btn btn-floating blue lighten-4'><img style={{width: "100%", height: "100%"}} src={props.user.photoURL}></img></NavLink></li>}
        </ul>
    )
}

const mapDispathToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signout)
    }
}

export default connect(null, mapDispathToProps)(SignedInLinks)