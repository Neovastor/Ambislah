import React from "react";

export default function CreatedQuiz() {
    return (
        <div className=" flex flex-col justify-center h-screen bg-[#FDF6F0]">
            <div>
                <form className="m-4 flex justify-center ">
                    <input className="md-max:w-40 rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" placeholder="input pin" />
                    <button className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">Submit</button>
                </form>
            </div>
            <div>
                <form className="m-4 flex justify-center ">
                    <input className="md-max:w-40 rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" placeholder="nickname" />
                    <button className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">Submit</button>
                </form>
            </div>
        </div>
    )
}