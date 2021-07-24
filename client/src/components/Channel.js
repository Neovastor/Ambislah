import { useState, useEffect } from "react";
import firebase from "firebase/app";

const Channel = ({ user = null, db = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { uid, displayName, photoURL } = user;
  //   console.log(db.collection("messages"), "Ini database");

  useEffect(() => {
    if (db) {
      const unsubcribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          //   console.log(querySnapshot);
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          //update state
          setMessages(data);
        });

      return unsubcribe;
    }
  }, [db]);

  function handleOnChange(e){
    
    setNewMessage(e.target.value);
  };

  function handleOnSubmit(e) {
    e.preventDefault();
    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL,
        uid,
        displayName,
      });
    }
  }

  return (
    <>
      <p>{JSON.stringify(messages)}</p>
      <ul>
        {messages.map((message) => {
          return <li key={message.id}>{message.text}</li>;
        })}
      </ul>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input type="text" value={newMessage} onChange={(e) => handleOnChange(e)} />
        <button type="submit" disabled={!newMessage}>
          Send
        </button>
      </form>
    </>
  );
};

export default Channel;
