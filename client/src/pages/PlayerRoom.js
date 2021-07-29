import React, { useEffect, useRef, useState } from "react";
import { useLocation, Prompt, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import firebase from "firebase/app";
// import WaitingRoomPlayer from "../components/WaitingRoomPlayer";
import PausePhasePlayer from "../components/PausePhasePlayer";
// import PausePhaseHost from "../components/PausePhaseHost";

import TextToSpeech from "../components/TextToSpeech";
import SpeechRecognition from "../components/SpeechRecognition";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
`;

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

function PlayerRoom({ db }) {
  const location = useLocation();
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const { idroom } = useParams();

  const buttonRight =
    "absolute top-0 h-11 rounded-lg p-2 transform translate-x-[100px] translate-y-[25px] text-xl bg-transparant bg-green-500 hover:bg-green-600 text-gray-200";
  const buttonWrong =
    "absolute top-0 h-11 rounded-lg p-2 transform translate-x-[100px] translate-y-[25px] text-xl bg-transparant bg-red-500 hover:bg-red-600 text-gray-200";
  const buttonNormal =
    "absolute top-0 h-11 rounded-lg p-2 transform translate-x-[100px] translate-y-[25px] text-xl bg-transparant hover:bg-blue-600 text-gray-200";
  const [status, setStatus] = useState("waiting");
  const [indexSoal, setIndexSoal] = useState(0);
  const [quizzes, setQuizzes] = useState({});
  const [optionA, setOptionA] = useState(buttonNormal);
  const [optionB, setOptionB] = useState(buttonNormal);
  const [optionC, setOptionC] = useState(buttonNormal);
  const [optionD, setOptionD] = useState(buttonNormal);
  const [scores, setScores] = useState([]);

  const livegamesRef = db.collection("livegames").doc(location.state.idroom);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function Video(props) {
    const ref = useRef();

    useEffect(() => {
      props.peer.on("stream", (stream) => {
        ref.current.srcObject = stream;
      });
    }, []);

    return <StyledVideo playsInline autoPlay ref={ref} />;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  useEffect(() => {
    socketRef.current = io.connect("/");
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", idroom);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

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
      if (
        payload.toLowerCase() ===
        quizzes.questions[indexSoal].answer.toLowerCase()
      ) {
        Swal.fire({
          icon: "success",
          title: "Your answer is right",
          timer: 1500,
        });
        setOptionA(buttonRight);
        setOptionB(buttonRight);
        setOptionC(buttonRight);
        setOptionD(buttonRight);
        setScores((scores) => [...scores, 1]);
      } else {
        Swal.fire({
          icon: "error",
          title: "wrong answer",
          timer: 1500,
        });
        setOptionA(buttonWrong);
        setOptionB(buttonWrong);
        setOptionC(buttonWrong);
        setOptionD(buttonWrong);
        setScores((scores) => [...scores, 0]);
      }
    }
  }

  if (status === "waiting") {
    return (
      <div className="bg-[#9e2727] min-h-screen mmd:h-full flex flex-auto justify-center items-end">
        <div className="bg-[#da4242] h-[80%] w-[90%] mmd:pt-8 mt-20">
          <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
              return <Video key={index} peer={peer} />;
            })}
          </Container>
        </div>
      </div>
    );
  }

  if (status === "pause") {
    // return <PausePhasePlayer />;
    return (
      <div className="overflow-x-auto pt-14">
        <PausePhasePlayer />
        {/* <div className="min-w-screen min-h-[777px] bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full lg:w-5/6  pt-5">
            <div className="bg-white shadow-md rounded-lg my-6">
              <Container>
                <StyledVideo muted ref={userVideo} autoPlay playsInline />
                {peers.map((peer, index) => {
                  return <Video key={index} peer={peer} />;
                })}
              </Container>
            </div>
          </div>
        </div> */}
      </div>
    );
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
        <div
          className="my-2 p-2 col-span-7 min-h-screen"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02)), url(/finish.jpg)",
            "background-size": "100% 100%",
          }}
        >
          <div className="flex justify-center mt-[350px]">
            <div className="px-8 py-2 bg-[#E87A2A] rounded-lg">
              <h1 className="text-center text-white font-extrabold text-2xl">Game Finished</h1>
              <h2 className="text-center text-white font-extrabold text-2xl">Your Score</h2>
              <h2 className="text-center text-white font-semibold text-xl"> {playerTotalScore} </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "live") {
    return (
      <section>
        <div
          className="my-2 p-2 col-span-7 h-auto"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/million3.jpg)",
            "background-size": "100% 100%",
          }}
        >
          {Object.keys(quizzes).length > 0 ? (
            <div className="pt-12 md-max:flex md-max:flex-col-reverse">
              <div className="bg-transparant my-2 p-2 col-span-7 h-auto">
                <div className="flex justify-between">
                  <div className=" p-3 rounded-lg"></div>
                  <button className="hover:bg-red-600 bg-green-600 text-black hover:text-white p-3 rounded-lg">
                    <TextToSpeech
                      text={quizzes.questions[indexSoal].question}
                    />
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
                    <div className="relative flex">
                      <img
                        className="top-0 object-fill"
                        src="/mil-but.png"
                        alt=".."
                      />
                      <button
                        onClick={(e) => onClickHandler("a")}
                        className={optionA}
                      >
                        A. {quizzes.questions[indexSoal].choose[0]}
                      </button>
                    </div>
                    <div className="relative flex">
                      <img
                        className="top-0 object-fill"
                        src="/mil-but.png"
                        alt=".."
                      />
                      <button
                        onClick={(e) => onClickHandler("b")}
                        className={optionB}
                      >
                        B. {quizzes.questions[indexSoal].choose[1]}
                      </button>
                    </div>
                    <div className="relative flex">
                      <img
                        className="top-0 object-fill"
                        src="/mil-but.png"
                        alt=".."
                      />
                      <button
                        onClick={(e) => onClickHandler("c")}
                        className={optionC}
                      >
                        C. {quizzes.questions[indexSoal].choose[2]}
                      </button>
                    </div>
                    <div className="relative flex">
                      <img
                        className="top-0 object-fill"
                        src="/mil-but.png"
                        alt=".."
                      />
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
        </div>
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
