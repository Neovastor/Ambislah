import React from "react";
import PlayerTable from "./PlayerTable";
import { useParams } from "react-router-dom";
import SpeechRecognition from "./SpeechRecognition";

export default function WaitingRoomHost({ players, onClickStartHandler }) {
  let { idroom: idparams } = useParams();

  return (
    <div className=" flex flex-col justify-center h-screen bg-red-400 ">
      <div className="m-4 flex justify-center">
        <div className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white">
          PIN JOIN QUIZ
        </div>
        <div className=" p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white">
          {idparams}
        </div>
        <div className="rounded-r-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white">
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => onClickStartHandler(e)}
          >
            Start
          </button>
        </div>
      </div>
      <div className="m-4 ">
        <h2>Peserta</h2>
        <div className="m-4  ">
          {players.length > 0 ? <PlayerTable players={players} /> : null}
        </div>
      </div>
      
    </div>
  );
}
