import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faMicrophone } from '@fortawesome/free-solid-svg-icons';

export default function AnswerLive() {

    return (
        <section>
            <div className="pt-12 md-max:flex md-max:flex-col-reverse">
                <div className="bg-gray-200 my-2 p-2 col-span-7 h-auto">
                    <div className="flex justify-center">
                        <button className="hover:bg-red-600 text-black hover:text-white p-3 rounded-lg">
                            <FontAwesomeIcon size='2x' icon={faVolumeUp}></FontAwesomeIcon>
                        </button>
                    </div>
                    <div className="flex flex-col gap-y-4 items-center p-5">
                        {/* <div className="w-full px-4 py-2 border border-gray-300 bg-white rounded  text-center" >Question</div> */}
                        <div className="box-border w-64 border-4">
                            <img src={"https://asset.kompas.com/crops/sn--2PkUfeAmtszsB-wnqXmwBkM=/0x0:5184x3456/750x500/data/photo/2020/12/11/5fd303549b2c9.jpg"} className="h-32 rounded-lg w-full object-cover" />
                        </div>


                        <div className="grid grid-cols-2 gap-1">
                            <div className="flex">
                                <button className="h-20 rounded-lg p-2 bg-red-500 hover:bg-red-600 w-screen text-gray-200">add answer 1</button>
                            </div>
                            <div className="flex">
                                <button className="h-20 rounded-lg p-2 bg-red-500 hover:bg-red-600 w-screen text-gray-200">add answer 2</button>
                            </div>
                            <div className="flex">
                                <button className="h-20 rounded-lg p-2 bg-red-500 hover:bg-red-600 w-screen text-gray-200">add answer 3</button>
                            </div>
                            <div className="flex">
                                <button className="h-20 rounded-lg p-2 bg-red-500 hover:bg-red-600 w-screen text-gray-200">add answer 4</button>
                            </div>
                        </div>
                        <div>
                            <button className="rounded-lg p-5 bg-red-500 hover:bg-red-600 text-white">
                                <FontAwesomeIcon size='2x' icon={faMicrophone} />
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}