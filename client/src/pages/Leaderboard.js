import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
function Leaderboard({ db, idparams }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [livegamesData, setlivegamesData] = useState({});

  const livegamesRef = db.collection("livegames").doc(idparams);

  const history = useHistory();
  useEffect(() => {
    livegamesRef.onSnapshot((doc) => {
      setlivegamesData(doc.data());

      // sortedLeaderboard = doc.data().leaderboard.sort((a, b) => {
      //   if (a.score > b.score) {
      //     return -1;
      //   }
      //   if (a.score < b.score) {
      //     return 1;
      //   }
      //   return 0;
      // });
      let sortedLeaderboard = doc.data().leaderboard;
      console.log(doc.data(), "DATA");
      setLeaderboard(sortedLeaderboard);
    });
  }, []);

  function finishHandler(e) {
    db.collection("quizzes").onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      const choosenQuiz = data.find(({ roomkey }) => +roomkey === +idparams);

      let payload = {
        playersCount: livegamesData.players.length,
        date: new Date(),
        players: livegamesData.leaderboard,
        quizTitle: choosenQuiz.title,
        quizId: choosenQuiz.id,
      };
      console.log(payload);
      //Kirim PAYLOAD

      //pindah halaman
      history.push("/");

      // Hapus dari data base
      // setTimeout(function () {
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
      // }, 3000);
    });
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      {leaderboard.length > 0 ? (
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
      ) : null}
      <button className="btn btn-primary" onClick={(e) => finishHandler(e)}>
        Finish
      </button>
    </div>
  );
}

export default Leaderboard;
