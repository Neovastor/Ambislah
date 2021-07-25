import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Question from "../components/Question";
import CircleTimer from "../components/CircleTimer";
import PlayerTable from "../components/PlayerTable";
import Leaderboard from "./Leaderboard";

function WaitingRoom({ db }) {
  let { idroom: idparams } = useParams();
  const [quizzes, setQuizzes] = useState({});
  const [players, setPlayers] = useState([]);
  const [statusGame, setStatusGame] = useState("waiting");
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [delay, setDelay] = useState(1000);
  const [indexSoal, setIndexSoal] = useState(0);

  const livegamesRef = db.collection("livegames").doc(idparams);

  useEffect(() => {
    if (db) {
      livegamesRef.onSnapshot((doc) => {
        setStatusGame(doc.data().status);
      });

      const unsubcribe = db
        .collection("quizzes")
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));

          const choosenQuiz = data.find(
            ({ roomkey }) => +roomkey === +idparams
          );

          //update state
          setQuizzes(choosenQuiz);
        });

      db.collection("players").onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        const playersInSpecificRoomId = data.filter(
          ({ idroom }) => +idroom === +idparams
        );

        //update state
        setPlayers(playersInSpecificRoomId);
      });

      return livegamesRef
        .update({
          indexSoal: 0,
        })
        .then(() => {
          // console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  }, [db]);

  function onClickStartHandler(e) {
    setIsRunning(true);

    let timerInterval;

    Swal.fire({
      title: "Start the game",
      html: "the game with start in <b></b> ",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        livegamesRef
          .set({
            status: "live",
            indexSoal: 0,
            players,
          })
          .then(() => {
            setStatusGame("live");
            setCount(0);
            setIndexSoal(0);
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
    });
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(
    () => {
      setCount(count + 1);
    },
    isRunning ? delay : null
  );

  useEffect(() => {
    if (statusGame === "live") {
      if (count > quizzes.timer && indexSoal < quizzes.questions.length - 1) {
        setCount(0);

        return livegamesRef
          .update({
            indexSoal: indexSoal + 1,
          })
          .then(() => {
            setIndexSoal(indexSoal + 1);
          })
          .catch((error) => {

            console.error("Error updating document: ", error);
          });
      } else if (count > quizzes.timer && indexSoal === quizzes.questions.length - 1) {
        setIsRunning(false);
        return livegamesRef
          .update({
            status: "done",
          })
          .then(() => {
            setStatusGame("done");
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      }
    }
  }, [count]);

  if (statusGame === "done") {
    return (
      <div>
        <h1>Game Finished</h1>
        <Leaderboard db={ db } idparams={idparams} />
      </div>
    );
  }

  return (
    <>
      <h1>Waiting Room</h1>
      <h2>Peserta</h2>

      {statusGame === "live" ? <h2>{count}</h2> : null}

      {players.length > 0 ? <PlayerTable players={players} /> : null}

      {statusGame !== "test" ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => onClickStartHandler(e)}
        >
          Start
        </button>
      ) : null}

      {Object.keys(quizzes).length > 0 &&
      statusGame === "live" &&
      count < quizzes.timer ? (
        <div>
          <CircleTimer duration={quizzes.timer} />
          <div>
            <Question
              question={quizzes.questions[indexSoal]}
              i={indexSoal}
              key={100 + indexSoal}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default WaitingRoom;


