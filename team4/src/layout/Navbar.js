import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'

const Navbar = (props) => {
    const {auth} = props
    console.log(auth)

    return(
        <nav className="nav-wrapper blue">
            <div className="container">
                <Link to='/' className="navbar left"> Capstone - 4 </Link>
                <SignedInLinks/>
                <SignedOutLinks/>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => { // mapping the state to our props (takes in the state)
    console.log(state);
    return {
        
    }
}
export default connect(mapStateToProps)(Navbar)