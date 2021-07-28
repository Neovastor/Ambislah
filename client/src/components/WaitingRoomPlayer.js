import React from "react";

export default function WaitingRoomPlayer({}) {
  return (<div className=" flex flex-col justify-center h-screen bg-red-400 ">
      <div className="m-4 flex justify-center">
        <div className="rounded-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white">
          Waiting host to start the game
        </div>
      </div>
    </div>
  )
}