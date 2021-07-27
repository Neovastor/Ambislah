import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faCheck } from '@fortawesome/free-solid-svg-icons';
import { createdQuizVar } from '../graphql/vars'
import { ADD_QUIZZES } from '../graphql/queiries'
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
export default function FormQuestions() {
    const history = useHistory()
    const [addQuizzes] = useMutation(ADD_QUIZZES)

    const { register, handleSubmit } = useForm();
    const [type, setType] = useState('text')
    const [type1, setType1] = useState(false)
    const [type2, setType2] = useState(false)
    const [status1, setStatus1] = useState(false)
    const [status2, setStatus2] = useState(false)
    const [status3, setStatus3] = useState(false)
    const [status4, setStatus4] = useState(false)

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
        // const { input1 } = e
        // console.log('satu', input1)
        setStatus1(true)
        setStatus2(false)
        setStatus3(false)
        setStatus4(false)
    }
    const submit2 = e => {
        // const { input2 } = e
        // console.log('dua', input2)
        setStatus2(true)
        setStatus3(false)
        setStatus4(false)
        setStatus1(false)
    }
    const submit3 = e => {
        // const { input3 } = e
        // console.log('tiga', input3)
        setStatus3(true)
        setStatus4(false)
        setStatus1(false)
        setStatus2(false)
    }
    const submit4 = e => {
        // const { input4 } = e
        // console.log('empat', input4)
        setStatus4(true)
        setStatus1(false)
        setStatus2(false)
        setStatus3(false)
    }
    const submitAnswer = e => {
        const { input1, input2, input3, input4, inputQuestion } = e
        let answer = ""
        if (status1) answer = input1
        if (status2) answer = input2
        if (status3) answer = input3
        if (status4) answer = input4
        // if (type1) console.log(type)
        // if (type2) console.log(type)
        const existingQuiz = createdQuizVar()

        const choose = [input1, input2, input3, input4]

        const newData = {
            type: type,
            "question": inputQuestion,
            "image": "null",
            choose,
            answer
        }
        // console.log(existingQuiz, 'ini from quis');
        const questions = [...existingQuiz.dataQuizzes.questions, newData]
        createdQuizVar({ dataQuizzes: { ...existingQuiz.dataQuizzes, questions } });
        console.log(createdQuizVar());
    }

    const saveQuiz = async () => {
        // console.log(createdQuizVar());
        const {dataQuizzes} = createdQuizVar()
        // console.log(data, 'ini finish data');
        // console.log(dataQuizzes);
        await addQuizzes({
            variables: {
                input: dataQuizzes
            }
        })
        history.push('/')
        Swal.fire({
            title: 'Success Created Quiz',
            // text: '',
            timer: 2000
        })
    }

    return (
        <>
            <div className="pt-12 md-max:flex md-max:flex-col-reverse">
                <div className="bg-gray-200 my-2 p-2 col-span-7 h-full">
                    <form onSubmit={handleSubmit(submitAnswer)} className="flex flex-col gap-y-4 items-center p-5">
                        {/* <input placeholder="Input question title" className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-400" /> */}
                        <input {...register('inputQuestion')} placeholder="Start typing your question" className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-400" />
                        <button className="hover:bg-red-600 text-black hover:text-white p-3 rounded-lg">
                            <FontAwesomeIcon size='2x' icon={faVolumeUp}></FontAwesomeIcon>
                        </button>
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
                            <div className="flex flex-col mx-60 my-60">
                                <button onClick={handleSubmit(typeSound)} className={type1 === true ? 'bg-green-500 px-6 py-4 rounded-lg min-w-[40px] my-4' : 'px-6 py-4 rounded-lg bg-red-500 min-w-[40px] my-4'} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-col mx-60 my-60">
                                <button onClick={handleSubmit(typeTouch)} className={type2 === true ? 'bg-green-500 px-6 py-4 rounded-lg min-w-[40px] my-4' : 'px-6 py-4 rounded-lg bg-red-500 min-w-[40px] my-4'}>
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
                                    <input {...register('input1')} placeholder="add answer 1" className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-400" />
                                    <button onClick={handleSubmit(submit1)} className="rounded-full p-2 w-10 hover:bg-green-400 text-gray-200"> <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> </button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-center">
                                    {/* <label>input your Second Answer</label> */}
                                </div>
                                <div className="flex">
                                    <input {...register('input2')} placeholder="add answer 2" className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-400" />
                                    <button onClick={handleSubmit(submit2)} className="rounded-full p-2 w-10 hover:bg-green-400 text-gray-200"> <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> </button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-center">
                                    {/* <label>input your Third Answer</label> */}
                                </div>
                                <div className="flex">
                                    <input {...register('input3')} placeholder="add answer 3" className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-400" />
                                    <button onClick={handleSubmit(submit3)} className="rounded-full p-2 w-10 hover:bg-green-400 text-gray-200"> <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> </button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-center">
                                    {/* <label>input your Fourth Answer</label> */}
                                </div>
                                <div className="flex">
                                    <input {...register('input4')} placeholder="add answer 4" className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-400" />
                                    <button onClick={handleSubmit(submit4)} className="rounded-full p-2 w-10 hover:bg-green-400 text-gray-200"> <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="px-8 rounded-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">+</button>
                        </div>
                    </form>
                    <div className="flex justify-center">
                        <button onClick={saveQuiz} className="px-8 rounded-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">Finish</button>
                    </div>
                </div>
            </div >
        </>
    )
}







{/* <div className="overflow-x-auto pt-14">
    <div className="min-w-screen min-h-[777px] bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full lg:w-5/6 max-w-screen-2xl pt-5">
            <div className="bg-white shadow-md rounded-lg my-6 min-h-screen">
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <label>input your question</label>
                        <input {...register('inputQuestion')} type="text" className="text px-72 py-8 bg-red-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-xl" placeholder="input your question" />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col mx-60 my-60">
                        <button onClick={handleSubmit(typeSound)} className={type1 === true ? 'bg-green-500 px-6 py-4 rounded-lg min-w-[40px] my-4' : 'px-6 py-4 rounded-lg bg-red-500 min-w-[40px] my-4'} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col mx-60 my-60">
                        <button onClick={handleSubmit(typeText)} className={type2 === true ? 'bg-green-500 px-6 py-4 rounded-lg min-w-[40px] my-4' : 'px-6 py-4 rounded-lg bg-red-500 min-w-[40px] my-4'}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit(submitAnswer)}>
                    <div className="flex justify-center">
                        <div className="flex flex-col mx-60">
                            <div className="flex flex-col">
                                <label>input your First Answer</label>
                                <input {...register('input1')} onClick={handleSubmit(submit1)} className={status1 === true ? 'bg-green-500 px-6 py-4 rounded-lg min-w-[400px] my-4' : 'bg-red-300 px-6 py-4 rounded-lg min-w-[400px] my-4'} placeholder="input first answer" />
                            </div>
                            <div className="flex flex-col">
                                <label>input your Second Answer</label>
                                <input {...register('input2')} onClick={handleSubmit(submit2)} className={status2 === true ? 'bg-green-500 px-6 py-4 rounded-lg min-w-[400px] my-4' : 'bg-red-300 px-6 py-4 rounded-lg min-w-[400px] my-4'} placeholder="input second answer" />
                            </div>
                        </div>
                        <div className="flex flex-col mx-60">
                            <div className="flex flex-col">
                                <label>input your Third Answer</label>
                                <input {...register('input3')} onClick={handleSubmit(submit3)} className={status3 === true ? 'bg-green-500 px-6 py-4 rounded-lg min-w-[400px] my-4' : 'bg-red-300 px-6 py-4 rounded-lg min-w-[400px] my-4'} placeholder="input third answer" />
                            </div>
                            <div className="flex flex-col">
                                <label>input your Fourth Answer</label>
                                <input {...register('input4')} onClick={handleSubmit(submit4)} className={status4 === true ? 'bg-green-500 px-6 py-4 rounded-lg min-w-[400px] my-4' : 'bg-red-300 px-6 py-4 rounded-lg min-w-[400px] my-4'} placeholder="input fourth answer" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="px-6 py-2 bg-red-300 rounded-xl">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> */}