import { useState, useEffect } from "react";
import { useLocation, Prompt } from "react-router-dom";
import Swal from "sweetalert2";
import firebase from "firebase/app";

function PlayerRoom({ db }) {
  const buttonRight = "btn btn-success m-3";
  const buttonWrong = "btn btn-danger m-3";
  const buttonNormal = "btn btn-primary m-3";
  const [status, setStatus] = useState("waiting");
  const [indexSoal, setIndexSoal] = useState(0);
  const [quizzes, setQuizzes] = useState({});
  const [optionA, setOptionA] = useState("btn btn-primary m-3");
  const [optionB, setOptionB] = useState("btn btn-primary m-3");
  const [optionC, setOptionC] = useState("btn btn-primary m-3");
  const [optionD, setOptionD] = useState("btn btn-primary m-3");
  const [scores, setScores] = useState([]);

  const location = useLocation();

  const livegamesRef = db.collection("livegames").doc(location.state.idroom);

  useEffect(() => {
    if (db) {
      db.collection("quizzes").onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        const choosenQuiz = data.find(
          ({ roomkey }) => +roomkey === +location.state.idroom
        );

        //update state
        setQuizzes(choosenQuiz);
      });

      livegamesRef.onSnapshot((doc) => {
        setStatus(doc.data().status);
        setIndexSoal(doc.data().indexSoal);
      });
    }
  }, [db]);

  useEffect(() => {
    setOptionA(buttonNormal);
    setOptionB(buttonNormal);
    setOptionC(buttonNormal);
    setOptionD(buttonNormal);
  }, [indexSoal]);

  function onClickHandler(payload) {
    if (
      !(
        optionA === buttonNormal &&
        optionB === buttonNormal &&
        optionC === buttonNormal &&
        optionD === buttonNormal
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "You already choose an answer",
      });
    } else {
      let indexChoose;
      switch (payload) {
        case "a":
          indexChoose = 0;
          quizzes.questions[indexSoal].answer ===
          quizzes.questions[indexSoal].choose[indexChoose]
            ? setOptionA(buttonRight)
            : setOptionA(buttonWrong);

          break;
        case "b":
          indexChoose = 1;
          quizzes.questions[indexSoal].answer ===
          quizzes.questions[indexSoal].choose[indexChoose]
            ? setOptionB(buttonRight)
            : setOptionB(buttonWrong);
          break;
        case "c":
          indexChoose = 2;
          quizzes.questions[indexSoal].answer ===
          quizzes.questions[indexSoal].choose[indexChoose]
            ? setOptionC(buttonRight)
            : setOptionC(buttonWrong);
          break;
        case "d":
          indexChoose = 3;
          quizzes.questions[indexSoal].answer ===
          quizzes.questions[indexSoal].choose[indexChoose]
            ? setOptionD(buttonRight)
            : setOptionD(buttonWrong);
          break;
        default:
          break;
      }
      if (
        quizzes.questions[indexSoal].answer ===
        quizzes.questions[indexSoal].choose[indexChoose]
      ) {
        Swal.fire({
          icon: "success",
          title: "Your answer is right",
          timer: 1500,
        });

        setScores((scores) => [...scores, 1]);
      } else {
        Swal.fire({
          icon: "error",
          title: "wrong answer",
          timer: 1500,
        });

        setScores((scores) => [...scores, 0]);
      }
    }
  }

  //   console.log(scores);

  if (status === "waiting") {
    return <h1>Waiting host to start the game</h1>;
  }
  if (status === "pause") {
    return <h1>Pause the game</h1>;
  }

  if (status === "done") {
    const playerTotalScore = scores.reduce((a, b) => a + b, 0);
    livegamesRef.update({
      leaderboard: firebase.firestore.FieldValue.arrayUnion({
        name: location.state.playername,
        score: playerTotalScore,
      }),
    });
    return (
      <div>
        <h1>Game Finished</h1>
        <h2>Your Score</h2>
        <h2> {playerTotalScore} </h2>
      </div>
    );
  }

  if (status === "live") {
    return (
      <div>
        <Prompt
          when={status==="live"}
          message="Are you sure you want to leave?"
        />
        {Object.keys(quizzes).length > 0 ? (
          <div>
            <h1>Host start the game </h1>
            <h1>Soal ke - {indexSoal + 1} </h1>

            <button onClick={(e) => onClickHandler("a")} className={optionA}>
              A. {quizzes.questions[indexSoal].choose[0]}{" "}
            </button>
            <button onClick={(e) => onClickHandler("b")} className={optionB}>
              B. {quizzes.questions[indexSoal].choose[1]}{" "}
            </button>

            <button onClick={(e) => onClickHandler("c")} className={optionC}>
              C. {quizzes.questions[indexSoal].choose[2]}{" "}
            </button>

            <button onClick={(e) => onClickHandler("d")} className={optionD}>
              D. {quizzes.questions[indexSoal].choose[3]}{" "}
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PlayerRoom;
