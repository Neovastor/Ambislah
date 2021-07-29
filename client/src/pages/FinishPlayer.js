import React from 'react'

export default function FinishPlayer() {
    return (
        <>
            <div className="p-56 pt-14 flex justify-center">
                <div className="w-96 m-auto">
                    <div className=" grid grid-cols-3 grid-rows-7 grid-flow-row overflow-hidden rounded-lg shadow-md bg-red-500 ">
                        <div className="col-span-3 row-span-4 p-1 m-1 m-10">
                            <div className="grid grid-cols-2">
                                <div>
                                    <div className="text-center">Game Finish</div>
                                </div>
                                <div>
                                    <div className="text-center">Your Score</div>
                                    <div className="text-center">90</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}