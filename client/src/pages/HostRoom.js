import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Question from "../components/Question";

import Leaderboard from "./Leaderboard";
import WaitingRoomHost from "../components/WaitingRoomHost";
import PausePhaseHost from "../components/PausePhaseHost";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import PlayerTable from "../components/PlayerTable";
const Container = styled.div`
  margin-top: 500px;
  padding: 20px;
  display: inline;
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

function WaitingRoom({ db }) {
  const location = useLocation();
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);

  let { idroom: idparams } = useParams();
  const [quizzes, setQuizzes] = useState({});
  const [players, setPlayers] = useState([]);
  const [statusGame, setStatusGame] = useState("waiting");
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [delay, setDelay] = useState(1000);
  const [indexSoal, setIndexSoal] = useState(0);

  const livegamesRef = db.collection("livegames").doc(idparams);

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

  // useEffect(() => {
  //   socketRef.current = io.connect("/");
  //   navigator.mediaDevices
  //     .getUserMedia({ video: videoConstraints, audio: true })
  //     .then((stream) => {
  //       userVideo.current.srcObject = stream;
  //       socketRef.current.emit("join room", idparams);
  //       socketRef.current.on("all users", (users) => {
  //         const peers = [];
  //         users.forEach((userID) => {
  //           const peer = createPeer(userID, socketRef.current.id, stream);
  //           peersRef.current.push({
  //             peerID: userID,
  //             peer,
  //           });
  //           peers.push(peer);
  //         });
  //         setPeers(peers);
  //       });

  //       socketRef.current.on("user joined", (payload) => {
  //         const peer = addPeer(payload.signal, payload.callerID, stream);
  //         peersRef.current.push({
  //           peerID: payload.callerID,
  //           peer,
  //         });

  //         setPeers((users) => [...users, peer]);
  //       });

  //       socketRef.current.on("receiving returned signal", (payload) => {
  //         const item = peersRef.current.find((p) => p.peerID === payload.id);
  //         item.peer.signal(payload.signal);
  //       });
  //     });
  // }, []);

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
      <>
        <div
          className="flex flex-col object-contain items-center justify-center min-h-screen bg-black"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02)), url(/quiz1.png)",
          }}
        >
          <div className="grid grid-cols-2">
            <div className=" flex flex-col justify-center items-center">
              <div className="bg-green-600 rounded-lg pb-4">
                <div className="m-4 flex justify-center">
                  <p className="rounded-lg text-xl font-bold px-6 py-4 mx-7 text-white bg-red-500">
                    your PIN
                  </p>
                  <p className="rounded-lg text-xl font-bold px-6 py-4 mx-7 text-white bg-red-500">
                    {idparams}
                  </p>
                </div>
                <div className="flex flex-row justify-center">
                  <button
                    type="button"
                    className="rounded-full text-xl font-bold px-16 py-4 mx-7 text-white bg-yellow-500"
                    onClick={(e) => onClickStartHandler(e)}
                  >
                    START
                  </button>
                </div>
              </div>
              <div className="bg-green-600 rounded-lg pb-4 mt-4 min-w-[400px]">
                <div className="m-4">
                  <div className="flex flex-row text-white font-extrabold text-xl">
                    {players.length > 0 ?
                      <h2 className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" > <path d="M12 14l9-5-9-5-9 5 9 5z" /> <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /> </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" > <path d="M12 14l9-5-9-5-9 5 9 5z" /> <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /> </svg>
                        Participants
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" > <path d="M12 14l9-5-9-5-9 5 9 5z" /> <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /> </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" > <path d="M12 14l9-5-9-5-9 5 9 5z" /> <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /> </svg>
                      </h2> :
                      <h2 className="text text-center text-white">waiting.....</h2>
                    }
                  </div>
                  <div className="m-4  ">
                    {players.length > 0 ? (
                      <PlayerTable players={players} />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-screen min-h-[777px] bg-transparent flex items-center justify-center font-sans overflow-hidden">
                <div className="w-full pt-5">
                              {/* <div className="bg-transparent shadow-md rounded-lg my-6 object-contain">
                                <Container>
                                <StyledVideo muted ref={userVideo} autoPlay playsInline />
                                {peers.map((peer, index) => {
                                  return <Video key={index} peer={peer} />;
                                })}
                                </Container>
                              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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
