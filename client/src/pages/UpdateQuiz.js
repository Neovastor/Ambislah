import React, { useState, useEffect } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client';
import { collectionVar } from '../graphql/vars'
import { useForm } from "react-hook-form";
import { UPDATE_QUIZZES } from '../graphql/queiries/quizQueries'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import { GET_ALL_QUIZ } from '../graphql/queiries';

export default function UpdateQuiz() {
    const { register, handleSubmit } = useForm();
    const history = useHistory()

    const Quiz = useReactiveVar(collectionVar)
    const [updateQuizzes] = useMutation(UPDATE_QUIZZES, {
        refetchQueries: [
            {
                query: GET_ALL_QUIZ,
                variables: {
                    access_token: localStorage.access_token
                }
            },
        ]
    })
    const [mode, setMode] = useState(Quiz.dataQuizzes.mode)
    const [question, setQuestion] = useState()
    // console.log(question, 'ini question');
    // console.log(mode);

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
        try {
            let updateQuiz = {...Quiz.dataQuizzes, mode: mode}
            let idUpdated = updateQuiz._id
            delete updateQuiz._typename
            delete updateQuiz._id
            delete updateQuiz.createdAt
            delete updateQuiz.updatedAt

            await updateQuizzes({
                variables: {
                    id: idUpdated,
                    input: updateQuiz,
                    access_token: localStorage.access_token
                }
            })
            Swal.fire({
                icon: 'success',
                title: 'Updated successfully',
                showConfirmButton: false,
                timer: 1500
            })
            history.push('/')

        }
        catch(err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'update question failed',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }



    const option = (e) => {
        setMode(e.target.value);
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#429dda]">
            <form onSubmit={handleSubmit(onSubmit)} className="m-4 flex flex-col justify-center ">

                <input {...register("inputQuiz")} defaultValue={Quiz.dataQuizzes.title} className="block w-full bg-white text-[#000000] border border-[#429dda] rounded-lg h-10 px-4 md:w-full focus:outline-none focus:ring-2 focus:ring-[#429dda] focus:border-transparent" placeholder="input name quiz" />
                <div className="w-full flex flex-col mb-3">
                    <label className="font-semibold text-gray-600 py-2">Mode Class<abbr title="required">*</abbr></label>
                    <select onChange={option} defaultValue={Quiz.dataQuizzes.mode} className="block w-full bg-white text-[#000000] border border-[#429dda] rounded-lg h-10 px-4 md:w-full focus:outline-none focus:ring-2 focus:ring-[#429dda] focus:border-transparent" required="required" name="integration[city_id]" id="integration_city_id">
                        <option disabled>Seleted location</option>
                        <option value="Live">Live</option>
                        <option value="Challenge">Challenge</option>
                    </select>
                </div>
                <button type="submit" className="px-8 rounded-lg bg-[#053742] font-bold p-4 uppercase hover:border-[#053742] hover:bg-[#053742] text-white border-2">Update</button>
            </form>
        </div>
    )
}