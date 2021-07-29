import React from 'react';
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
        <>
            <div className="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-20 w-20">
                <img src="https://asset.kompas.com/crops/mTnVdoYXCoN9ElxrsEDbdoY7y0s=/65x65:865x599/750x500/data/photo/2017/06/28/1265845835.jpg" alt="" className="h-full w-full" />
            </div>
            <h2 className="mt-4 font-bold text-xl text-white">{props.dataQuizzes.question}</h2>
            <h6 className="mt-2 text-lg text-left text-white font-medium">A. {props.dataQuizzes.choose[0]}</h6>
            <h6 className="mt-2 text-lg text-left text-white font-medium">B. {props.dataQuizzes.choose[1]}</h6>
            <h6 className="mt-2 text-lg text-left text-white font-medium">C. {props.dataQuizzes.choose[2]}</h6>
            <h6 className="mt-2 text-lg text-left text-white font-medium">D. {props.dataQuizzes.choose[3]}</h6>
            <ul className="flex flex-row mt-4 space-x-2">
                <li>
                    <button onClick={updated} className="flex items-center justify-center h-8 w-8 border rounded-full text-white border-white hover:text-black hover:bg-white">
                        <i className="fas fa-pencil-alt" />
                    </button>
                </li>
            </ul>
        </>
    )
}
