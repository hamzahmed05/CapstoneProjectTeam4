const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state, // connecting an error to the auth property
                authError: 'Login Failed'
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null
            }
        default: // default case
            return state;
    }
}

export default authReducer