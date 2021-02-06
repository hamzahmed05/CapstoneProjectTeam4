export const createProject = (project) => {
    // dispatches an action to our reducers
    return (dispatch, getState) => {
        // makes the async call to our database
        dispatch({ type: 'CREATE_PROJECT', project});
    }
};