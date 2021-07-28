import { useState, useEffect } from "react";
import firebase from "firebase/app";

import { useHistory } from "react-router-dom";

const Channel = ({ db = null }) => {
  const [id, setId] = useState("");
  const [deadline, setDeadline] = useState("");
  const history = useHistory();

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
            roomkey = roomkey + String(Math.floor(Math.random() * 10));
          }

          const livegamesRef = db.collection("livegames").doc(roomkey);

          db.collection("quizzes").add({
            ...myJson,
            roomkey,
          });

          livegamesRef
            .set({
              status: "waiting", // live / waiting / done
              indexSoal: 0,
              leaderboard: [],
            })
            .then(() => {
              history.push(`/waitingroom/${roomkey}`);
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

  function onChangeHandler(e) {
    setId(e.target.value);
  }

  function onChangeChallenge(e){
    setDeadline(e.target.value)
  }

  function handleChallenge(e){
    e.preventDefault();
    console.log(deadline);
    console.log(typeof(deadline));
  }

  return (
    <div className="m-5">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1>Live</h1>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <input
            type="text"
            placeholder="input id soal"
            onChange={(e) => onChangeHandler(e)}
          />
          <button type="submit">Host</button>
        </form>
      </div>
      <br />

      <div>
        <h1>Challenge</h1>
        <form onSubmit={(e) => handleChallenge(e)}>
          <input 
          onChange={(e) => onChangeChallenge(e)}
          type="datetime-local" placeholder="date" />
          <button type="submit">Schedule</button>

        </form>
      </div>
    </div>
  );
};

export default Channel;
