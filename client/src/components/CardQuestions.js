import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { questionVar } from '../graphql/vars'

export default function CardQuestions(props) {
    console.log(props);
    const history = useHistory()
    const updated = () => {
        questionVar(props)
        history.push('/collections/updatequestion')
    }

    return (
        <div>

            <div className="bg-[#3D84B8] shadow p-2 rounded-lg text-white hover:shadow-2xl">
                <div>No. {+props.index + 1}</div>
                <img src={props.dataQuizzes.image} />
                {/* <div>
                        <FontAwesomeIcon size="2x" icon={faBookOpen} />
                    </div> */}
                < div className="py-2 px-2">
                    <div className=" font-bold font-title text-center">{props.dataQuizzes.question}</div>
                    <div className="text-sm font-light text-left my-2">a. {props.dataQuizzes.choose[0]}</div>
                    <div className="text-sm font-light text-left my-2">b. {props.dataQuizzes.choose[1]}</div>
                    <div className="text-sm font-light text-left my-2">c. {props.dataQuizzes.choose[2]}</div>
                    <div className="text-sm font-light text-left my-2">d. {props.dataQuizzes.choose[3]}</div>
                </div>
                <div className="flex justify-end">
                    <button onClick={updated} className="bg-[#28527A] border-white text-white border-2 hover:bg-white hover:text-[#007580] px-2 py-1 rounded-lg">update</button>
                </div>
            </div>
        </div>
    )
}