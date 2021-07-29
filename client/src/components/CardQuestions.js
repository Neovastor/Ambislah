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
            {/* <div className="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-20 w-20">
                <img src="https://asset.kompas.com/crops/mTnVdoYXCoN9ElxrsEDbdoY7y0s=/65x65:865x599/750x500/data/photo/2017/06/28/1265845835.jpg" alt="" className="h-full w-full" />
            </div>
            <h2 className="mt-4 font-bold text-xl text-white">{props.dataQuizzes.question}</h2>
            <h6 className="mt-2 text-lg text-left text-white font-medium">A. {props.dataQuizzes.choose[0]}</h6>
            <h6 className="mt-2 text-lg text-left text-white font-medium">B. {props.dataQuizzes.choose[1]}</h6>
            <h6 className="mt-2 text-lg text-left text-white font-medium">C. {props.dataQuizzes.choose[2]}</h6>
            <h6 className="mt-2 text-lg text-left text-white font-medium">D. {props.dataQuizzes.choose[3]}</h6>
            <ul className="flex flex-row mt-4 space-x-2">
                <li>
                </li>
            </ul> */}
            <div className=" ">
                <div className="bg-[#28527A] p-2 text-white">
                    {/* <img src={props.dataQuizzes.image} className="object-cover object-center" /> */}
                    <div className="flex justify-center">
                        <img src={props.dataQuizzes.image} className="mt-6 h-32 object-center object-cover mr-2" />
                    </div>
                    <div className="py-2 px-2">
                        <div className=" font-bold font-title text-center">{props.dataQuizzes.question}</div>
                        <div className="text-sm font-light text-center my-2">A. {props.dataQuizzes.choose[0]}</div>
                        <div className="text-sm font-light text-center my-2">B. {props.dataQuizzes.choose[1]}</div>
                        <div className="text-sm font-light text-center my-2">C. {props.dataQuizzes.choose[2]}</div>
                        <div className="text-sm font-light text-center my-2">D. {props.dataQuizzes.choose[3]}</div>
                    </div>
                    <div className="w-8 m-2 transform hover:text-[#ffc353] hover:scale-150 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}
