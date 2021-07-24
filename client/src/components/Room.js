import { useState, useEffect } from "react";
import firebase from "firebase/app";

const Channel = ({ db = null }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  //   console.log(db.collection("messages"), "Ini database");

  useEffect(() => {
    fetch("http://localhost:3000/quizzes/1")
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);

        if (db) {
          const unsubcribe = db
            .collection("Quizzes")
            .limit(100)
            .onSnapshot((querySnapshot) => {
              //   console.log(querySnapshot);
              const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));

              //update state
              setQuizzes(data);
            });

          return unsubcribe;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [db]);

  function handleOnChange(e) {
    setNewMessage(e.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    if (db) {
      db.collection("Quizzes").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  }

  return (
    <>
      <p>{JSON.stringify(quizzes)}</p>

      {}

      {/* <form onSubmit={(e) => handleOnSubmit(e)}>
        <input type="text" value={newMessage} onChange={(e) => handleOnChange(e)} />
        <button type="submit" disabled={!newMessage}>
          Send
        </button>
      </form> */}
    </>
  );
};

export default Channel;
