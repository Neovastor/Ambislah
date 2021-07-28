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
        <div className="flex justify-center">
          <button className="hover:bg-red-600 text-black hover:text-white p-3 rounded-lg">
          <CircleTimer duration={duration} />
          </button>
        </div>
        <div className="flex flex-col gap-y-4 items-center p-5">
          <div className="relative items-center">
            <img alt="" className="top-0 our-story-card-img transform scale-125" src="/mil-ques.png" data-uia="our-story-card-img"/>
            <div className="absolute top-0 w-full px-4 py-2 text-2xl transform translate-y-[50px] rounded text-white font-extrabold text-center">
              {`${i + 1}. ${question.question}`}
            </div>
          </div>
          <div className="box-border w-64 border-4">
            <img
              src={
                "https://asset.kompas.com/crops/sn--2PkUfeAmtszsB-wnqXmwBkM=/0x0:5184x3456/750x500/data/photo/2020/12/11/5fd303549b2c9.jpg"
              }
              className="h-32 rounded-lg w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-1 max-w-screen-lg">
            {/* {question.choose.map((choice, j) => {
              return <Choice choice={choice} key={j} />;
            })}    */}
            {/* <img src="/images/logo.png" /> */}
            {/* <div>
              <img src="images/logo.jpg" alt="BigCo Inc. logo"/>
            </div> */}
              <div className="relative">
                
                <img className="top-0 object-fill" src="/mil-but.png" alt=".." /> 
                <button className="absolute top-0 h-11 rounded-lg p-2 transform translate-x-[100px] translate-y-[25px] text-xl bg-transparant hover:bg-red-600 text-gray-200"> {question.choose[0]} </button>
              </div>
              <button className="h-20 rounded-lg p-2 bg-red-500 hover:bg-red-600 text-gray-200"> {question.choose[1]} </button>
              <button className="h-20 rounded-lg p-2 bg-red-500 hover:bg-red-600 text-gray-200"> {question.choose[2]} </button>
              <button className="h-20 rounded-lg p-2 bg-red-500 hover:bg-red-600 text-gray-200"> {question.choose[3]} </button>
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
