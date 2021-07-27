import { useState } from "react";
import { useHistory } from "react-router-dom";
function Join({ db }) {
  const [roomkey, setRoomkey] = useState("");
  const [playername, setPlayername] = useState("");

  const history = useHistory();
  function handleOnSubmit(e) {
    e.preventDefault();

    if (db) {
      db.collection("livegames").add({
        playername,
        roomkey,
      });

      history.push(`/player`);
    }
  }

  function onChangeHandlerRoomkey(e) {
    setRoomkey(e.target.value);
  }

  function onChangeHandlerPlayername(e) {
    setPlayername(e.target.value);
  }

  return (
    <div className="container d-flex-col justify-content-center">
      <h1>Join room</h1>

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
