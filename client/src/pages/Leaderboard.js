import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
function Leaderboard({ db, idparams }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [livegamesData, setlivegamesData] = useState({});

  const livegamesRef = db.collection("livegames").doc(idparams);

  const history = useHistory();
  useEffect(() => {
    if (db) {
      livegamesRef.onSnapshot((doc) => {
        if (doc.data().leaderboard) {
          setlivegamesData(doc.data());
          let sortedLeaderboard = doc.data().leaderboard.sort((a, b) => {
            if (a.score > b.score) {
              return -1;
            }
            if (a.score < b.score) {
              return 1;
            }
            return 0;
          });

          setLeaderboard(sortedLeaderboard);
        }
      });
    }
  }, [db]);

  function finishHandler(e) {
    db.collection("quizzes").onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      const choosenQuiz = data.find(({ roomkey }) => +roomkey === +idparams);
      let payload = {
        playersCount: livegamesData.players.length,
        players: livegamesData.leaderboard,
        date: new Date(),
        quizTitle: choosenQuiz.title,
        quizId: choosenQuiz.id,
      };
      console.log(payload);
      //Kirim PAYLOAD

      //pindah halaman
      history.push("/host");

      //Hapus dari data base
      //   livegamesRef.delete();

      //   const deletePlayers = db
      //     .collection("players")
      //     .where("idroom", "==", idparams);

      //   deletePlayers.get().then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       doc.ref.delete();
      //     });
      //   });

      //   const deleteQuizzes = db
      //     .collection("quizzes")
      //     .where("roomkey", "==", idparams);

      //   deleteQuizzes.get().then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       doc.ref.delete();
      //     });
      //   });
    });
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((row, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={(e) => finishHandler(e)}>
        Finish
      </button>
    </div>
  );
}

export default Leaderboard;
