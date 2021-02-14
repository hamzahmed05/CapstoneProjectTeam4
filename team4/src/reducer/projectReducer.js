import { firestore } from "../services/firebase"

const initState = {}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('Created a new project', action.project)
            firestore.collection("projects").add( action.project
            )
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
            
    }
    return state
}

export default projectReducer