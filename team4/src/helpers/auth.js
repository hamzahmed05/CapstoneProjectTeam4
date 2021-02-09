import { auth, firestore} from "../services/firebase";

export function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password){
    return auth().signInWithEmailAndPassword(email, password);
}

export function signout() {
    return auth.signOut();
  }

export async function getUserById(uid){
    firestore.collection('userInfo').doc(uid).get()
      .then(snapshot => {
        return(snapshot.data());
        })
      .catch(err => {
        return("Error");
      });
}
  
