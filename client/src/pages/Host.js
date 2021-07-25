import { useState, useEffect } from "react";
import firebase from "firebase/app";

import {useHistory} from 'react-router-dom'

const Channel = ({ db = null }) => {

  const [id, setId] = useState("")
  const history = useHistory()

  function handleOnSubmit(e) {
    e.preventDefault();
    let roomkey = "";

    fetch(`http://localhost:3000/quizzes/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);

        if (db) {

          for (let i = 0; i < 6; i++) {
            roomkey = roomkey + String (Math.floor(Math.random() * 10))            
          }

          const livegamesRef = db.collection("livegames").doc(roomkey);


          db.collection("quizzes").add({
            ...myJson,
            roomkey
          });
          

          livegamesRef
          .set({
            status: "waiting", // live / waiting / done
            indexSoal: 0
          })
          .then(() => {
            console.log("Document successfully written!");
            history.push(`/waitingroom/${roomkey}`)
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        
        
          
        }


      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onChangeHandler(e){
    setId(e.target.value)
    
  }

  return (
    <>      
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input type="text" placeholder="input id soal" onChange={(e) =>onChangeHandler(e)}/>
        <button type="submit">Host</button>
      </form>
    </>
  );
};

export default Channel;
