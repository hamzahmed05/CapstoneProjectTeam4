import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'
import {auth}  from '../services/firebase';
import {useState} from 'react';



const Navbar = (props) => {
    const [authUser, setAuthUser] = useState(false);
    auth.onAuthStateChanged(user => {
        if (user){
            setAuthUser(true);
        }
        else{
            setAuthUser(false);
        }
    })

    return(
        <nav className="nav-wrapper blue">
            <div className="container">
                <Link to='/' className="navbar left"> Capstone - 4 </Link>
                {authUser ? <SignedInLinks/> : <SignedOutLinks/>}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => { // mapping the state to our props (takes in the state)

    return {
        
    }
}
export default connect(mapStateToProps)(Navbar)