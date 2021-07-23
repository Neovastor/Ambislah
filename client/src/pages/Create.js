import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Create() {

    return (
        <section>
            <div className="pt-12 md-max:flex md-max:flex-col-reverse">
                <div className="bg-gray-200 my-2 p-2 col-span-7 h-screen">
                    <form className="flex flex-col gap-y-4 items-center p-5">
                        <input placeholder="Input question title" className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-400" />
                        <input placeholder="Start typing your question" className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-400" />
                        <button>
                            <FontAwesomeIcon icon={faVolumeUp}></FontAwesomeIcon>
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


                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex">
                                <input placeholder="add answer 1" className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-400" />
                                <button className="rounded-full p-2 w-10 hover:bg-green-400 text-gray-200"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></button>
                            </div>
                            <div className="flex">
                                <input placeholder="add answer 2" className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-400" />
                                <button className="rounded-full p-2 w-10 hover:bg-green-400 text-gray-200"> <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> </button>
                            </div>
                            <div className="flex">
                                <input placeholder="add answer 3" className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-400" />
                                <button className="rounded-full p-2 w-10 hover:bg-green-400 text-gray-200"> <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> </button>
                            </div>
                            <div className="flex">
                                <input placeholder="add answer 4" className="w-full px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-400" />
                                <button className="rounded-full p-2 w-10 hover:bg-green-400 text-gray-200"> <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </section >
    )
}