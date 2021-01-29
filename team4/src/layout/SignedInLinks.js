import React from 'react'
import { NavLink } from 'react-router-dom'
import {signout } from '../helpers/auth'

const SignedInLinks = () => {
    return(
        <ul className="right">
            <li><NavLink to='/dash'>Project</NavLink></li>
            <li><NavLink to='/' onClick={signout}>Log Out</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating blue lighten-4'>TP</NavLink></li>
        </ul>
    )
}

export default SignedInLinks