import React from 'react'
import TabelQuestions from '../components/TabelQuestions'
import { collectionVar } from '../graphql/vars'
import { useReactiveVar, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { DELETE_QUIZZEZ } from '../graphql/queiries'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function Collections() {
    const [removeMovies] = useMutation(DELETE_QUIZZEZ)
    const Quiz = useReactiveVar(collectionVar)
    const history = useHistory()
    console.log(Quiz);

    const toWaitingRoom = () => {
        history.push("/waitingroom")
    }

    const destory = () => {
        removeMovies({
            variables: {
                "deleteQuizzesByIdId": Quiz.dataQuizzes._id
            }
        })
        history.push("/")
    }

    const updated = () => {
        // console.log();
        history.push('/collections/update')
    }

    return (
        <>
            <div className="grid md:grid-cols-6 gap-4 mmd:grid-cols-3 pt-16 bg-[#f8f8f8]">
                <div className=" box-border rounded-xl w-full p-4 mmd:col-span-4 grid-rows-2">
                    <div className="rounded-full h-34 w-34 mt-14 mmd:mt-1 p-8 font-semibold bg-white  ">
                        <div className="text-center">
                            <FontAwesomeIcon size="3x" icon={faUser}></FontAwesomeIcon>
                        </div>
                        <div className="text-center">Brian</div>
                    </div>
                    <div className="bg-[#FDF6F0] box-border h-32 my-2 p-2">Challenge
                        Overview (Offline quiz still active)</div>
                </div>
                <div className=" box-border rounded-xl h-auto w-full p-4 col-span-4">
                    <div>Paket : {Quiz.dataQuizzes.title}</div>
                    <div>Mode : {Quiz.dataQuizzes.mode}</div>
                    <div>
                        <button onClick={updated} className="bg-[#28527A] hover:border-2 hover:border-[#28527A] hover:bg-white hover:text-[#28527A] text-white px-2 py-1 rounded-lg mr-2">Update</button>
                        <button onClick={destory} className="bg-[#28527A] hover:border-2 hover:border-[#28527A] hover:bg-white hover:text-[#28527A] text-white px-2 py-1 rounded-lg ml-2">Delete</button>
                    </div>
                    <div>
                        <div className="flex flex-wrap">
                            {
                                Quiz.dataQuizzes.questions.map((e, i) => {
                                    return (
                                        <div key={i} className="md:w-1/2 lg:w-1/3 py-4 px-4">
                                            <TabelQuestions dataQuizzes={e} index={i} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="box-border rounded-xl w-full p-4 mmd:col-span-4 grid-rows-2 mt-14">
                    <button onClick={toWaitingRoom} className="bg-[#FF8303] hover:border-2 hover:bg-white hover:border-[#FF8303] hover:text-[#FF8303] px-2 py-1 rounded-lg text-white">Create Room</button>
                </div>
            </div>
        </>
    )
}