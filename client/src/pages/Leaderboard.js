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
    <div className="overflow-x-auto pt-14">
      <h1 className="text-center font-extrabold text-7xl bg-transparent">Leaderboard</h1>
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        {leaderboard.length > 0 ? (
          <div className="w-full lg:w-5/6 pt-5">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Number</th>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-center">Score</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {leaderboard.map((row, index) => {
                    return (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{index + 1}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left bg-yellow-300">
                          <div className="flex items-center">

                            <span>{row.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className=" py-1 px-3 rounded-full text-xs">
                            {row.score}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
        <div className="grid">
          <button className="px-6 py-4 rounded-full bg-yellow-500 text-white hover:bg-red-500 hover:text-red-300" onClick={(e) => finishHandler(e)}>
            Finish
          </button>
        </div>
      </div>

    </div>
  );
}

export default Leaderboard;
