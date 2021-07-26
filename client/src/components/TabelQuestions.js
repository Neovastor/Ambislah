import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

export default function TabelQuestions(props) {
    // console.log(props);

    return (
        <div className=" ">
            <a href="#">
                <div className="bg-white shadow p-2 rounded-lg text-gray-800 hover:shadow-lg">
                    <div>No. {+props.index + 1}</div>
                    <img src={props.dataQuizzes.image} />
                    {/* <div>
                        <FontAwesomeIcon size="2x" icon={faBookOpen} />
                    </div> */}
                    < div className="py-2 px-2">
                        <div className=" font-bold font-title text-center">{props.dataQuizzes.question}</div>
                        <div className="text-sm font-light text-center my-2">a. {props.dataQuizzes.choose[0]}</div>
                        <div className="text-sm font-light text-center my-2">b. {props.dataQuizzes.choose[1]}</div>
                        <div className="text-sm font-light text-center my-2">c. {props.dataQuizzes.choose[2]}</div>
                        <div className="text-sm font-light text-center my-2">d. {props.dataQuizzes.choose[3]}</div>
                    </div>
                    <div>
                        <button className="bg-green-500 px-2 py-1 rounded-lg">Edit</button>
                    </div>
                </div>
            </a>
        </div>
    )
}