import authReducer from './authReducer'
import projectReducer from './projectReducer'
import groupReducer from './groupReducer'
import {combineReducers} from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    // combining the reducers
    auth: authReducer,
    usergroups: groupReducer,
    project: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer
