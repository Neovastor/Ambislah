import React from "react";
import { useForm } from "react-hook-form";
import { showPageVar, createdQuizVar } from '../graphql/vars'


export default function CreatedQuiz() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        showPageVar("formQuestions")
        const existingcreatedQuiz = createdQuizVar()
        console.log(existingcreatedQuiz);
        const dataQuizzes = {
            useId: "0i31i21931j2kjdnwi2",
            title: data.inputQuiz,
            questions: [],
            timer: 20,
            mode: data.inputMode,
            createdAt: "2014-01-01T23:28:56.782Z"
        }
        createdQuizVar({ ...existingcreatedQuiz, dataQuizzes })
        // console.log(createdQuizVar(), 'ini kuis>>>>.');
    }


    return (
        <div className=" flex flex-col justify-center h-screen bg-[#FDF6F0]">
            <form onSubmit={handleSubmit(onSubmit)} className="m-4 flex flex-col justify-center ">

                <input {...register("inputQuiz")} className="md-max:w-40 rounded-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" placeholder="input name quiz" />
                {/* <button className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">Submit</button> */}

                <div class="w-full flex flex-col mb-3">
                    <label class="font-semibold text-gray-600 py-2">Mode Class<abbr title="required">*</abbr></label>
                    <select {...register("inputMode")} class="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full " required="required" name="integration[city_id]" id="integration_city_id">
                        <option disabled>Seleted location</option>
                        <option value="Live">Live</option>
                        <option value="Challenge">Challenge</option>
                    </select>
                </div>
                <button type="submit" className="px-8 rounded-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">Next</button>
            </form>
        </div>
    )
}