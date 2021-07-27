import React from 'react'
import CardQuestions from '../components/CardQuestions'
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
            <div className="grid grid-cols-6 mmd:grid-cols-1 justify-center pt-14 bg-gradient-to-t from-green-400 to-[#1496c9] h-full">
                <div className="md:col-span-2 flex justify-center w md:mt-28 mb-4">
                    <div>
                        <img className="w-72 " src={"https://www.physicsacademy.com.sg/wp-content/uploads/2018/08/download.jpg"} alt="" />
                    </div>
                </div>
                <div className="pt-56">
                    <div className="md:col-span-4 uppercase font-extrabold text-white text-[50px] mmd:text-[25px] pl-4">{Quiz.dataQuizzes.title}</div>
                    <div className="md:col-span-4 uppercase font-extrabold text-white text-xl pl-4">mode : {Quiz.dataQuizzes.mode}</div>
                </div>
            </div>
            <div className="h-20 bg-gradient-to-t from-black to-green-400 ">

            </div>
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
                                            <CardQuestions dataQuizzes={e} index={i} />
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