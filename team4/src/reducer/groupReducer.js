import { firestore } from "../services/firebase"

const initState = {}

const groupReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_USERGROUP':
            console.log('Created a new user group', action.usergroups)
            firestore.collection("usergroups").doc(action.usergroups.id).set( action.usergroups
            )
            .then(() => {
                console.log("Document successfully written!");
                window.location.reload(false);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
            
    }
    return state
}

export default groupReducer