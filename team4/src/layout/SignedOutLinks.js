import React from 'react'
import { NavLink } from 'react-router-dom'
import LogIn from '../pages/Login'
import {signin} from '../helpers/auth'

const SignedInLinks = () => {
    return(
        <ul className="right">
            <li><NavLink to='login' >Log in</NavLink></li>
        </ul>
    )
}

export default SignedInLinks