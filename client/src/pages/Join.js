import { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
function Join({ db }) {
  const [idroom, setIdroom] = useState("");
  const [playername, setPlayername] = useState("");

  const history = useHistory();

  function handleOnSubmit(e) {
    e.preventDefault();
    //chekck dulu ada engga room dengan room key segitu
    let choosenQuiz;
    if (db) {
      db.collection("quizzes")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));

          choosenQuiz = data.find(({ roomkey }) => +roomkey === +idroom);

          if (choosenQuiz === undefined) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "room key not found, please enter valid room key",
              showConfirmButton: true,
            });
          } else {
            db.collection("players").add({
              playername,
              idroom,
            });
            
            history.push({
              pathname: "/player",
              state: { idroom }
            });
          }
        });
    }
  }

  function onChangeHandlerRoomkey(e) {
    setIdroom(e.target.value);
  }

  function onChangeHandlerPlayername(e) {
    setPlayername(e.target.value);
  }

  return (
    <div className="container d-flex-col justify-content-center">
      <h1>Join room</h1>
      <ul>
        <li>TEST</li>
      </ul>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <div className="row mt-3">
          <input
            type="text"
            placeholder="input id room"
            onChange={(e) => onChangeHandlerRoomkey(e)}
          />
        </div>
        <div className="row mt-3">
          <input
            type="text"
            placeholder="input playername"
            onChange={(e) => onChangeHandlerPlayername(e)}
          />
        </div>
        <div className="row mt-3">
          <button type="submit">Join</button>
        </div>
      </form>
    </div>
  );
}

export default Join;
