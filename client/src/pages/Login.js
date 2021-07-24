import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Report() {
    return (
        <div className="overflow-x-auto pt-14">
            <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
                <div className="w-full lg:w-5/6 pt-5">
                    {/* <div className="grid grid-cols-8 text-gray-600">
                        <input placeholder="Search" className="col-span-7 bg-white h-10 px-5 pr-10 rounded-l-full text-sm focus:outline-none w-full" />
                        <button className="bg-white rounded-r-full">
                            <FontAwesomeIcon className="hover:text-green-500" icon={faSearch} />
                        </button>
                      </div> */}
                    <div className="bg-white shadow-md rounded my-6">

                      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Email</label>
                                    <input type="email" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style={{"transition": "all 0.15s ease 0s"}} />
                                </div>
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Password</label>
                                    <input type="password" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style={{"transition": "all 0.15s ease 0s"}} />
                                </div>
                                <div>
                                    <label className="inline-flex items-center cursor-pointer">
                                    <input id="customCheckLogin" type="checkbox" className="form-checkbox text-gray-800 ml-1 w-5 h-5" style={{"transition": "all 0.15s ease 0s"}} /><span className="ml-2 text-sm font-semibold text-gray-700">Remember me</span></label>
                                </div>
                                <div className="text-center mt-6">
                                    <button className="bg-gray-900 text-black active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="button" style={{"transition": "all 0.15s ease 0s"}}>Sign In</button>
                                </div>
                            </form>
                            </div>
                        </div>
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-3">
                                <h6 className="text-gray-600 text-sm font-bold">Sign in with</h6></div>
                            <div className="btn-wrapper text-center">
                                <button className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button" style={{"transition": "all 0.15s ease 0s"}}><img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/tailwindcss-starter-project/static/media/google.87be59a1.svg" />Google</button>
                            </div>
                            <hr className="mt-6 border-b-1 border-gray-400" />
                        </div>
                      </div>
                      
                      
                </div>
            </div>
        </div>
    )
}