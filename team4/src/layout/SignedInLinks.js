import React from 'react'
import { NavLink } from 'react-router-dom'
import {signout } from '../helpers/auth'

const SignedInLinks = () => {
    return(
        <ul className="right">
            <li><NavLink to='/home'>Home</NavLink></li>
            <li><NavLink to='/project'>Project</NavLink></li>
            <li><NavLink to='/chat'>Chat</NavLink></li>
            <li><NavLink to='/' onClick={signout}>Log Out</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating blue lighten-4'>TP</NavLink></li>
        </ul>
    )
}

export default SignedInLinks