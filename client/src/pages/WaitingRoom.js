import React from 'react'
import FinishPlayer from './FinishPlayer'
import LeaderBoard from './LeaderBoard'

export default function WaitingRoom() {
    return (
        <>
            <section>
                <div className=" flex flex-col justify-center h-screen bg-[#ffc353] ">
                    <div className="m-4 flex justify-center">
                        <div className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white text-blod uppercase">PIN JOIN QUIZ</div>
                        <div className="rounded-r-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white text-blod uppercase">355 922</div>
                    </div>
                </div >
            </section>
            <section>
                <FinishPlayer />
            </section>
            <section>
                <LeaderBoard />
            </section>
        </>
    )
}