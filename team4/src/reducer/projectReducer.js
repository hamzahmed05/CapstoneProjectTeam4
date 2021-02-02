const initState = {}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('Created a new project', action.project)
    }
    return state
}

export default projectReducer