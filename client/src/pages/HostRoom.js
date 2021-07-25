import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Question from "../components/Question";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function WaitingRoom({ db }) {
  let { idroom: idparams } = useParams();
  const [quizzes, setQuizzes] = useState({});
  const [players, setPlayers] = useState([]);
  const [statusGame, setStatusGame] = useState("waiting");
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [delay, setDelay] = useState(1000);
  const [indexSoal, setIndexSoal] = useState(0);

  // const [seconds, setSeconds] = useState(0);
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
        console.log(playersInSpecificRoomId);
        //update state
        setPlayers(playersInSpecificRoomId);
      });

      return unsubcribe;
    }
  }, [db]);

  function onClickStartHandler(e) {
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
      /* Read more about handling dismissals below */

      if (result.dismiss === Swal.DismissReason.timer) {
        const livegamesRef = db.collection("livegames").doc(idparams);

        livegamesRef
          .set({
            status: "live",
            players,
          })
          .then(() => {
            console.log("Game Live!");
            setStatusGame("live");
            setCount(0);
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
        setIndexSoal(indexSoal + 1);
      }
    }
  }, [count]);

  return (
    <>
      <h1>Waiting Room</h1>
      <h2>Peserta</h2>
      
      {statusGame === "live" ? <h2>{count}</h2> : null}
      {players.length > 0 ? (
        <ul className="list-disc">
          {players.map((player, i) => {
            return (
              <li key={2000 + i}>
                <h3>{player.playername}</h3>{" "}
              </li>
            );
          })}
        </ul>
      ) : null}

      <button
        type="button"
        className="btn btn-primary"
        onClick={(e) => onClickStartHandler(e)}
      >
        Start
      </button>

      {Object.keys(quizzes).length > 0 && statusGame === "live" && count < quizzes.timer ? (
        <CountdownCircleTimer
          isPlaying
          duration={quizzes.timer}
          colors={[
            ["#004777", 0.33],
            ["#F7B801", 0.33],
            ["#A30000", 0.33],
          ]}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      ) : null}

      {Object.keys(quizzes).length > 0 && statusGame === "live" ? (
        <div>
          {/* {quizzes.questions.map((question, i) => {
            return ( */}

          <div>
            <Question
              question={quizzes.questions[indexSoal]}
              i={indexSoal}
              key={100 + indexSoal}
            />
          </div>

          {/* );
          })} */}
        </div>
      ) : null}
    </>
  );
}

export default WaitingRoom;
