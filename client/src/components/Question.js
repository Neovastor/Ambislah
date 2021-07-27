import Choice from "./Choice";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faMicrophone,
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import CircleTimer from "./CircleTimer";

function Question({ question, i,duration }) {
  return (
    <div className="pt-12 md-max:flex md-max:flex-col-reverse">
      <div className="bg-gray-200 my-2 p-2 col-span-7 h-auto">
        <div className="flex justify-between">
          <button className="hover:bg-red-600 text-black hover:text-white p-3 rounded-lg">
          <CircleTimer duration={duration} />
            
          </button>
          <button className="hover:bg-red-600 text-black hover:text-white p-3 rounded-lg">
            <FontAwesomeIcon size="2x" icon={faVolumeUp}></FontAwesomeIcon>
          </button>
          <button className="hover:bg-red-600 text-black hover:text-white p-3 rounded-lg">
            <FontAwesomeIcon
              size="2x"
              icon={faChevronCircleRight}
            ></FontAwesomeIcon>
          </button>
        </div>
        <div className="flex flex-col gap-y-4 items-center p-5">
          <div className="w-full px-4 py-2 border border-gray-300 bg-white rounded  text-center">
            {`${i + 1}. ${question.question}`}
          </div>
          <div className="box-border w-64 border-4">
            <img
              src={
                "https://asset.kompas.com/crops/sn--2PkUfeAmtszsB-wnqXmwBkM=/0x0:5184x3456/750x500/data/photo/2020/12/11/5fd303549b2c9.jpg"
              }
              className="h-32 rounded-lg w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-1">
            {question.choose.map((choice, j) => {
              return <Choice choice={choice} key={j} />;
            })}            
          </div>

          <div>
            <div className=" text-white">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;

{
  /* <div >
          <p>{`${i + 1}. ${question.question}`}</p>
          <ul>
            {question.choose.map((choice, j) => {
              return <Choice choice={choice} key={j}/>
            })}
          </ul>
        </div> */
}
