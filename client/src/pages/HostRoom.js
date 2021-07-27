import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Question from "../components/Question";

import Leaderboard from "./Leaderboard";
import WaitingRoomHost from '../components/WaitingRoomHost'
import PausePhaseHost from "../components/PausePhaseHost";

function WaitingRoom({ db }) {
  let { idroom: idparams } = useParams();
  const [quizzes, setQuizzes] = useState({});
  const [players, setPlayers] = useState([]);
  const [statusGame, setStatusGame] = useState("waiting");
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [delay, setDelay] = useState(1000);
  const [indexSoal, setIndexSoal] = useState(0);

  const livegamesRef = db.collection("livegames").doc(idparams);

  useEffect(() => {
    livegamesRef
      .get()
      .then((doc) => {
        if (doc.data().status) {
          livegamesRef.onSnapshot((doc) => {
            // if (doc.data()) {
            setStatusGame(doc.data().status);
            // }
          });

          db.collection("quizzes").onSnapshot((querySnapshot) => {
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
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
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
      if (result.dismiss === Swal.DismissReason.timer) {
        livegamesRef
          .set({
            status: "live",
            indexSoal: 0,
            players,
            leaderboard: [],
          })
          .then(() => {
            setStatusGame("live");
            setCount(0);
            setIsRunning(true);
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
        setStatusGame("pause");
        return livegamesRef
          .update({
            indexSoal: indexSoal + 1,
            status: "pause",
          })
          .then(() => {            
            setIsRunning(false);
            setCount(0);
            setIndexSoal(indexSoal + 1);
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      } else if (
        count > quizzes.timer &&
        indexSoal === quizzes.questions.length - 1
      ) {
        setIsRunning(false);
        setCount(0);
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
  }, [count, statusGame]);

  function nextClickHandler(e) {
    return livegamesRef
      .update({
        status: "live",
      })
      .then(() => {
        setStatusGame("live");
        setCount(0);
        setIsRunning(true);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  if (statusGame === "pause") {
    return (
      <div>        
        <PausePhaseHost nextClickHandler={nextClickHandler} />
      </div>
    );
  }

  if (statusGame === "done") {
    return (
      <div>        
        <Leaderboard db={db} idparams={idparams} />
      </div>
    );
  }

  if (statusGame === "waiting") {
    return (
      <WaitingRoomHost
        players={players}
        onClickStartHandler={onClickStartHandler}
      />
    );
  }
  return (
    <>
      {/* {statusGame === "live" ? <h2>{count}</h2> : null} */}

      {Object.keys(quizzes).length > 0 &&
      statusGame === "live" &&
      count < quizzes.timer ? (
        <section>
          
          <div>
            <Question
              question={quizzes.questions[indexSoal]}
              duration={quizzes.timer}
              i={indexSoal}
              key={100 + indexSoal}
            />
          </div>
        </section>
      ) : null}
    </>
  );
}

export default WaitingRoom;

