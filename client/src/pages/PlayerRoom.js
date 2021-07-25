import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
function PlayerRoom({ db }) {
  const [status, setStatus] = useState("waiting");
  const location = useLocation();

  useEffect(() => {
    if (db) {
      const livegamesRef = db
        .collection("livegames")
        .doc(location.state.idroom);

      livegamesRef.onSnapshot((doc) => {
        console.log("Current data: ", doc.data().status);
        setStatus(doc.data().status)
      });
    }
  }, [db]);

  if (status === "waiting"){
      return (
        <h1>Waiting host to start the game</h1>
      )
  }

  if (status === "live"){
    return (
        <h1>Host start the game Start</h1>
    )
  }
  
   
}

export default PlayerRoom;
