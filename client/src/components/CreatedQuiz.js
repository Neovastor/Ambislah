import React from "react";
import { useForm } from "react-hook-form";
import { showPageVar, createdQuizVar } from '../graphql/vars'


export default function CreatedQuiz() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        showPageVar("formQuestions")
        const existingcreatedQuiz = createdQuizVar()
        // console.log(existingcreatedQuiz);
        const dataQuizzes = {
            userId: "0i31i21931j2kjdnwi2",
            title: data.inputQuiz,
            questions: [],
            timer: 20,
            mode: data.inputMode,
            createdAt: "2014-01-01T23:28:56.782Z"
        }
        createdQuizVar({ ...existingcreatedQuiz, dataQuizzes })
    }


    return (
        <div className=" flex flex-col justify-center items-center h-screen bg-[#f8f8f8]">
            <form onSubmit={handleSubmit(onSubmit)} className="m-4 flex flex-col justify-center ">

                <input {...register("inputQuiz")} className="block w-full bg-white text-[#28527A] border border-blue-300 rounded-lg h-10 px-4 md:w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent" placeholder="input name quiz" />
                <div className="w-full flex flex-col mb-3">
                    <label className="font-semibold text-gray-600 py-2">Mode Class<abbr title="required">*</abbr></label>
                    <select {...register("inputMode")} className="block w-full bg-white text-[#28527A] border border-blue-300 rounded-lg h-10 px-4 md:w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent" required="required" name="integration[city_id]" id="integration_city_id">
                        <option disabled>Seleted location</option>
                        <option value="Live">Live</option>
                        <option value="Challenge">Challenge</option>
                    </select>
                </div>
                <button type="submit" className="px-8 rounded-lg bg-[#28527A] font-bold p-4 uppercase hover:border-[#28527A] hover:border-white hover:bg-white hover:text-[#28527A] text-white border-t border-b border-r">Next</button>
            </form>
        </div>
    )
}