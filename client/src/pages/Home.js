import React from 'react'
import CardQuiz from '../components/CardQuiz'
import { useQuery } from '@apollo/client'
import { GET_ALL_QUIZ } from '../graphql/queiries'

export default function Home() {
    const { loading, error, data: quizzes } = useQuery(GET_ALL_QUIZ)
    // console.log(quizzes);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <div className="grid md:grid-cols-6 gap-2 mmd:grid-cols-3 pt-16">
                <div className="bg-[#F8E2CF] box-border w-full p-4 border-4 mmd:col-span-4 grid-rows-2">
                    <div className="bg-[#FDF6F0] box-border h-32 my-2 p-2">box username</div>
                    <div className="bg-[#FDF6F0] box-border h-32 my-2 p-2">Challenge
                        Overview (Offline quiz still active)</div>
                </div>
                <div className="bg-[#FFEACA] box-border h-auto w-full p-4 border-4 col-span-4">
                    <div>Collection Kuis</div>
                    <div>
                        <div className="flex flex-wrap">
                            {
                                quizzes.Quizzes.map((e, i) => {
                                    return (
                                        <div key={i} className="md:w-1/2 lg:w-1/3 py-4 px-4">
                                            <CardQuiz dataQuizzes={e} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="bg-[#F8E2CF] box-border w-full p-4 border-4 mmd:col-span-4 grid-rows-2">
                    <div className="bg-[#FDF6F0] box-border h-32 my-2 p-2">Quiz file</div>
                    <div className="bg-[#FDF6F0] box-border h-32 my-2 p-2">Report</div>
                </div>
            </div>
        </>
    )
}