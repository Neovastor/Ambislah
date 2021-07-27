import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { questionVar } from '../graphql/vars'

export default function TabelQuestions(props) {
    console.log(props);
    const history = useHistory()
    const updated = () => {
        questionVar(props)
        history.push('/collections/updatequestion')
    }

    return (
        <div>

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
                    <button onClick={updated} className="bg-green-500 px-2 py-1 rounded-lg">update</button>
                </div>
            </div>
        </div>
    )
}