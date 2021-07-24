import Button from "./components/Button";
import Channel from "./components/Channel";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyC33_F7QhSbb0pvHpWawdF9UaNgyxumQdw",
  authDomain: "ambislah.firebaseapp.com",
  projectId: "ambislah",
  storageBucket: "ambislah.appspot.com",
  messagingSenderId: "242292821855",
  appId: "1:242292821855:web:ba7596c53f30af394cf0ea",
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      if (initializing) {
        setInitializing(false);
      }
    });

    //Clean up subcription
    return unsubcribe;
  }, []);

  const signInWithGoogle = async () => {
    //Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    //Set language to default browser preference
    auth.useDeviceLanguage();

    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  };

  const signOut = async () =>{
    try{
      await firebase.auth().signOut();
    }catch(err){
      console.log(err);
    }
  }

  if (initializing) return "Loading...";

  return (
    <div className="container m-5">
      {user ? (
        <div>
          <Button onClick={signOut}>Sign out</Button>
          <p>"Welcome to the chat"</p>
          <Channel user={user} db={db}></Channel>
        </div>
      ) : (
        <div className="container m-5">
          <h1>TEST</h1>
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        </div>
      )}
    </div>
  );
}

export default App;
