import { useState, useEffect } from "react";
import { useLocation, Prompt } from "react-router-dom";
import Swal from "sweetalert2";
import firebase from "firebase/app";
import WaitingRoomPlayer from "../components/WaitingRoomPlayer";
import PausePhasePlayer from "../components/PausePhasePlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faMicrophone,
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import TextToSpeech from "../components/TextToSpeech";
import SpeechRecognition from "../components/SpeechRecognition";

function PlayerRoom({ db }) {
  const buttonRight =
    "h-20 rounded-lg p-2 bg-green-500 hover:bg-green-600 w-screen text-gray-200";
  const buttonWrong =
    "h-20 rounded-lg p-2 bg-red-500 hover:bg-red-600 w-screen text-gray-200";
  const buttonNormal =
    "h-20 rounded-lg p-2 bg-blue-500 hover:bg-blue-600 w-screen text-gray-200";
  const [status, setStatus] = useState("waiting");
  const [indexSoal, setIndexSoal] = useState(0);
  const [quizzes, setQuizzes] = useState({});
  const [optionA, setOptionA] = useState(buttonNormal);
  const [optionB, setOptionB] = useState(buttonNormal);
  const [optionC, setOptionC] = useState(buttonNormal);
  const [optionD, setOptionD] = useState(buttonNormal);
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

  function inputVoice(payload) {
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
      if (payload.toLowerCase() === quizzes.questions[indexSoal].answer.toLowerCase()) {
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

  if (status === "waiting") {
    return <WaitingRoomPlayer />;
  }
  if (status === "pause") {
    return <PausePhasePlayer />;
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
      <section>
        {Object.keys(quizzes).length > 0 ? (
          <div className="pt-12 md-max:flex md-max:flex-col-reverse">
            <div className="bg-gray-200 my-2 p-2 col-span-7 h-auto">
              <div className="flex justify-between">
                <div className=" p-3 rounded-lg"></div>
                <div>{quizzes.questions[indexSoal].question}</div>
                <button className="hover:bg-red-600 text-black hover:text-white p-3 rounded-lg">
                  <TextToSpeech text={quizzes.questions[indexSoal].question} />
                </button>
                <div className=" p-3 rounded-lg"></div>
              </div>
              <div className="flex flex-col gap-y-4 items-center p-5">
                {/* <div className="w-full px-4 py-2 border border-gray-300 bg-white rounded  text-center" >Question</div> */}
                <div className="box-border w-64 border-4">
                  <img
                    src={
                      "https://asset.kompas.com/crops/sn--2PkUfeAmtszsB-wnqXmwBkM=/0x0:5184x3456/750x500/data/photo/2020/12/11/5fd303549b2c9.jpg"
                    }
                    className="h-32 rounded-lg w-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <div className="flex">
                    <button
                      onClick={(e) => onClickHandler("a")}
                      className={optionA}
                    >
                      A. {quizzes.questions[indexSoal].choose[0]}
                    </button>
                  </div>
                  <div className="flex">
                    <button
                      onClick={(e) => onClickHandler("b")}
                      className={optionB}
                    >
                      B. {quizzes.questions[indexSoal].choose[1]}
                    </button>
                  </div>
                  <div className="flex">
                    <button
                      onClick={(e) => onClickHandler("c")}
                      className={optionC}
                    >
                      C. {quizzes.questions[indexSoal].choose[2]}
                    </button>
                  </div>
                  <div className="flex">
                    <button
                      onClick={(e) => onClickHandler("d")}
                      className={optionD}
                    >
                      D. {quizzes.questions[indexSoal].choose[3]}
                    </button>
                  </div>
                </div>
                <div>
                  {/* <button className="rounded-lg p-5 bg-red-500 hover:bg-red-600 text-white">
                    <FontAwesomeIcon size="2x" icon={faMicrophone} />
                  </button> */}
                  <SpeechRecognition inputVoice={inputVoice} />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    );
  }
}

export default PlayerRoom;

// <div>
// <Prompt
//   when={status==="live"}
//   message="Are you sure you want to leave?"
// />
// {Object.keys(quizzes).length > 0 ? (
//   <div>
//     <h1>Host start the game </h1>
//     <h1>Soal ke - {indexSoal + 1} </h1>

//     <button onClick={(e) => onClickHandler("a")} className={optionA}>
//       A. {quizzes.questions[indexSoal].choose[0]}{" "}
//     </button>
//     <button onClick={(e) => onClickHandler("b")} className={optionB}>
//       B. {quizzes.questions[indexSoal].choose[1]}{" "}
//     </button>

//     <button onClick={(e) => onClickHandler("c")} className={optionC}>
//       C. {quizzes.questions[indexSoal].choose[2]}{" "}
//     </button>

//     <button onClick={(e) => onClickHandler("d")} className={optionD}>
//       D. {quizzes.questions[indexSoal].choose[3]}{" "}
//     </button>
//   </div>
// ) : null}
// </div>
