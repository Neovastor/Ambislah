import React, { useState, useEffect } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client';
import { collectionVar } from '../graphql/vars'
import { useForm } from "react-hook-form";
import { UPDATE_QUIZZES } from '../graphql/queiries/quizQueries'
import { useHistory } from 'react-router-dom';

export default function UpdateQuiz() {
    const { register, handleSubmit } = useForm();
    const history = useHistory()

    const Quiz = useReactiveVar(collectionVar)
    const [updateQuizzes] = useMutation(UPDATE_QUIZZES)
    const [mode, setMode] = useState(Quiz.dataQuizzes.mode)
    const [question, setQuestion] = useState()
    console.log(question, 'ini question');
    console.log(mode);

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

    const onSubmit = async (data) => {
        await updateQuizzes({
            variables: {
                "editQuizzesByIdId": Quiz.dataQuizzes._id,
                "editQuizzesByIdUserId": Quiz.dataQuizzes.userId,
                "editQuizzesByIdTitle": data.inputQuiz,
                "editQuizzesByIdQuestions": question,
                "editQuizzesByIdTimer": Quiz.dataQuizzes.timer,
                "editQuizzesByIdMode": mode,
                "editQuizzesByIdCreatedAt": Quiz.dataQuizzes.createdAt
            }
        })
        history.push('/')
    }

    const option = (e) => {
        setMode(e.target.value);
    }

    return (
        <div className=" flex flex-col justify-center h-screen bg-[#FDF6F0]">
            <form onSubmit={handleSubmit(onSubmit)} className="m-4 flex flex-col justify-center ">

                <input {...register("inputQuiz")} defaultValue={Quiz.dataQuizzes.title} className="md-max:w-40 rounded-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" placeholder="input name quiz" />
                {/* <button className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">Submit</button> */}
                {/* <button className="text-gray-800">{JSON.stringify(question)}</button> */}
                <div className="w-full flex flex-col mb-3">
                    <label className="font-semibold text-gray-600 py-2">Mode Class<abbr title="required">*</abbr></label>
                    <select onChange={option} defaultValue={Quiz.dataQuizzes.mode} className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full " required="required" name="integration[city_id]" id="integration_city_id">
                        <option disabled>Seleted location</option>
                        <option value="Live">Live</option>
                        <option value="Challenge">Challenge</option>
                    </select>
                </div>
                <button type="submit" className="px-8 rounded-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">Update</button>
            </form>
        </div>
    )
}