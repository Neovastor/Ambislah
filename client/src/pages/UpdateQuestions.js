import React, { useState, useEffect } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client';
import { collectionVar, questionVar } from '../graphql/vars'
import { useForm } from "react-hook-form";
import { UPDATE_QUIZZES } from '../graphql/queiries/quizQueries'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faCheck } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { GET_ALL_QUIZ } from '../graphql/queiries';

export default function UpdateQuestions() {
    const { register, handleSubmit } = useForm();
    const history = useHistory()

    const Quiz = useReactiveVar(collectionVar)
    const dataQuestion = useReactiveVar(questionVar)
    const [updateQuizzes] = useMutation(UPDATE_QUIZZES, {
        refetchQueries: [
            {
                query: GET_ALL_QUIZ,
            },
        ]
    })
    const [type, setType] = useState('touch')
    const [type1, setType1] = useState(dataQuestion.dataQuizzes.type === 'sound' ? true : false)
    const [type2, setType2] = useState(dataQuestion.dataQuizzes.type === 'touch' ? true : false)
    const [question, setQuestion] = useState()
    const [status1, setStatus1] = useState(false)
    const [status2, setStatus2] = useState(false)
    const [status3, setStatus3] = useState(false)
    const [status4, setStatus4] = useState(false)
    // console.log(Quiz, 'ini quis');
    // console.log(question, 'ini question');
    // console.log(dataQuestion, 'ini data yang mau di edit');

    useEffect(() => {
        let arr = []
        Quiz.dataQuizzes.questions.forEach(e => {
            arr.push({
                type: e.type,
                question: e.question,
                image: e.image,
                choose: e.choose,
                answer: e.answer
            })
        });
        setQuestion(arr);
    }, [])

    const typeSound = e => {
        setType('sound')
        setType1(true)
        setType2(false)
    }
    const typeTouch = e => {
        setType('Touch')
        setType2(true)
        setType1(false)
    }

    const submit1 = e => {
        setStatus1(true)
        setStatus2(false)
        setStatus3(false)
        setStatus4(false)
    }
    const submit2 = e => {
        setStatus2(true)
        setStatus3(false)
        setStatus4(false)
        setStatus1(false)
    }
    const submit3 = e => {
        setStatus3(true)
        setStatus4(false)
        setStatus1(false)
        setStatus2(false)
    }
    const submit4 = e => {
        setStatus4(true)
        setStatus1(false)
        setStatus2(false)
        setStatus3(false)
    }

    const saveData = async (e) => {
        const { input1, input2, input3, input4, inputQuestion } = e
        let answer = ""
        if (status1) answer = input1
        if (status2) answer = input2
        if (status3) answer = input3
        if (status4) answer = input4

        const choose = [input1, input2, input3, input4]
        const newData = {
            type: type,
            "question": inputQuestion,
            "image": "null",
            choose,
            answer
        }
        question[dataQuestion.index] = newData

        await updateQuizzes({
            variables: {
                "editQuizzesByIdId": Quiz.dataQuizzes._id,
                "editQuizzesByIdUserId": Quiz.dataQuizzes.userId,
                "editQuizzesByIdTitle": Quiz.dataQuizzes.title,
                "editQuizzesByIdQuestions": question,
                "editQuizzesByIdTimer": Quiz.dataQuizzes.timer,
                "editQuizzesByIdMode": Quiz.dataQuizzes.mode,
                "editQuizzesByIdCreatedAt": Quiz.dataQuizzes.createdAt
            }
        })
        Swal.fire({
            icon: 'success',
            title: 'update question successfully',
            showConfirmButton: false,
            timer: 1500
        })
        history.push('/')
    }

    return (
        <div className="md-max:flex md-max:flex-col-reverse">
            <div className="bg-[#429dda] my-2 pt-16 col-span-7 h-full">
                <form onSubmit={handleSubmit(saveData)} className="flex flex-col gap-y-4 items-center p-5">
                    <input defaultValue={dataQuestion.dataQuizzes.question}  {...register('inputQuestion')} placeholder="Start typing your question" className="w-full px-4 py-2 transition duration-300 border border-white rounded-l-lg focus:border-transparent focus:outline-none" />
                    {/* <button className="hover:bg-red-600 text-black hover:text-white p-3 rounded-lg">
                        <FontAwesomeIcon size='2x' icon={faVolumeUp}></FontAwesomeIcon>
                    </button> */}
                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col border-4 border-dashed w-96 h-32 hover:bg-gray-100 border-green-300 group">
                                <div className="flex flex-col items-center justify-center pt-7">
                                    <svg className="w-10 h-10 text-green-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    <p className="lowercase text-sm text-gray-400 group-hover:text-green-600 pt-1 tracking-wider">Select a photo</p>
                                </div>
                                <input type="file" className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="flex flex-col border-white border-4 rounded-lg mx-2">
                            <button onClick={handleSubmit(typeSound)} className={type1 === true ? 'bg-blue-500 hover:text-white text-white px-6 py-4 rounded-lg min-w-[40px]' : 'px-6 py-4 rounded-lg hover:text-white bg-red-500 min-w-[40px]'} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-col border-white border-4 rounded-lg mx-2">
                            <button onClick={handleSubmit(typeTouch)} className={type2 === true ? 'bg-blue-500 hover:text-white text-white px-6 py-4 rounded-lg min-w-[40px]' : 'px-6 py-4 rounded-lg hover:text-white bg-red-500 min-w-[40px]'}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <div className="text-center">
                                {/* <label>input your First Answer</label> */}
                            </div>
                            <div className="flex">
                                <input defaultValue={dataQuestion.dataQuizzes.choose[0]}  {...register('input1')} placeholder="add answer 1" className="w-full px-4 py-2 transition duration-300 border border-white rounded-l-lg focus:border-transparent focus:outline-none" />
                                <button onClick={handleSubmit(submit1)} className="rounded-r-lg p-2 w-10  hover:text-green-600 bg-white text-gray-300  gray-200"> <FontAwesomeIcon size="lg" icon={faCheck}></FontAwesomeIcon> </button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-center">
                                {/* <label>input your Second Answer</label> */}
                            </div>
                            <div className="flex">
                                <input defaultValue={dataQuestion.dataQuizzes.choose[1]} {...register('input2')} placeholder="add answer 2" className="w-full px-4 py-2 transition duration-300 border border-white rounded-l-lg focus:border-transparent focus:outline-none" />
                                <button onClick={handleSubmit(submit2)} className="rounded-r-lg p-2 w-10  hover:text-green-600 bg-white text-gray-300  gray-200"> <FontAwesomeIcon size="lg" icon={faCheck}></FontAwesomeIcon> </button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-center">
                                {/* <label>input your Third Answer</label> */}
                            </div>
                            <div className="flex">
                                <input defaultValue={dataQuestion.dataQuizzes.choose[2]} {...register('input3')} placeholder="add answer 3" className="w-full px-4 py-2 transition duration-300 border border-white rounded-l-lg focus:border-transparent focus:outline-none" />
                                <button onClick={handleSubmit(submit3)} className="rounded-r-lg p-2 w-10  hover:text-green-600 bg-white text-gray-300  gray-200"> <FontAwesomeIcon size="lg" icon={faCheck}></FontAwesomeIcon> </button>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-center">
                                {/* <label>input your Fourth Answer</label> */}
                            </div>
                            <div className="flex">
                                <input defaultValue={dataQuestion.dataQuizzes.choose[3]} {...register('input4')} placeholder="add answer 4" className="w-full px-4 py-2 transition duration-300 border border-white rounded-l-lg focus:border-transparent focus:outline-none" />
                                <button onClick={handleSubmit(submit4)} className="rounded-r-lg p-2 w-10  hover:text-green-600 bg-white text-gray-300  gray-200"> <FontAwesomeIcon size="lg" icon={faCheck}></FontAwesomeIcon> </button>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <button type="submit" className="px-8 rounded-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">+</button>
                    </div> */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="mb-4 rounded-lg bg-[#053742] font-bold uppercase bg-[#053742] hover:border-2 text-white hover:border-[#053742] hover:bg-[#053742] hover:text-[#fffff] text-white rounded-lg mr-2 px-8 py-2"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}