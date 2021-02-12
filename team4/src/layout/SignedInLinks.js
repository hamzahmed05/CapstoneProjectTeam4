import React from 'react'
import { NavLink } from 'react-router-dom'
import {signout } from '../helpers/auth'
import { connect } from 'react-redux'

const SignedInLinks = (props) => {
    let isNew = props.user.accountType==="new";
    return(
        <ul className="right">
            <li><NavLink to='/home'>Home</NavLink></li>
            {isNew ? null : <li><NavLink to='/profile'>Profile</NavLink></li>}
            {isNew ? null : <li><NavLink to='/project'>Project</NavLink></li>}
            {isNew ? null : <li><NavLink to='/chat'>Chat</NavLink></li>}
            <li><NavLink to='/' onClick={signout}>Log Out</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating blue lighten-4'>TP</NavLink></li>
        </ul>
    )
}

const mapDispathToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signout)
    }
}

export default connect(null, mapDispathToProps)(SignedInLinks)