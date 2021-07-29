import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/client'
import { ADD_REPORT } from "../graphql/queiries";

function Leaderboard({ db, idparams }) {
  const [addReport] = useMutation(ADD_REPORT)
  const [leaderboard, setLeaderboard] = useState([]);
  const [livegamesData, setlivegamesData] = useState({});

  const livegamesRef = db.collection("livegames").doc(idparams);

  const history = useHistory();
  useEffect(() => {
    livegamesRef.onSnapshot((doc) => {
      setlivegamesData(doc.data());

      let sortedLeaderboard
      if (doc.data().leaderboard.length > 1) {
        sortedLeaderboard = doc.data().leaderboard.sort((a, b) => {
          if (a.score > b.score) {
            return -1;
          }
          if (a.score < b.score) {
            return 1;
          }
          return 0;
        });
      } else {
        sortedLeaderboard = doc.data().leaderboard;
      }
      setLeaderboard(sortedLeaderboard);
    });
  }, []);

  function finishHandler(e) {
    db.collection("quizzes").onSnapshot(async (querySnapshot) => {
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
      await addReport({
        variables: {
          input: payload,
          access_token: localStorage.access_token
        }
      })
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
    <div className="bg-[#27729e] min-h-screen mmd:h-full flex flex-auto justify-center items-center">
      <div className="bg-[#429dda] min-h-screen w-[90%] mmd:pt-8 mt-20">
        {leaderboard.length > 0 ? (<>
          <h1 className="text-center font-extrabold text-7xl bg-transparent m-4 text-white uppercase">Leaderboard</h1>
          <div className="bg-white shadow-md rounded m-6">
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
                      <td className="py-3 px-6 text-left bg-white">
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
        </>
        ) : null}
        <div className="flex justify-end m-6">
          <button className="px-8 rounded-lg bg-[#053742] font-bold p-4 uppercase hover:border-[#053742] hover:bg-[#053742] text-white border-2" onClick={(e) => finishHandler(e)}>
            Finish
          </button>
        </div>
      </div>
    </div >
  );
}

export default Leaderboard;
