import React from 'react'
import CardQuiz from '../components/CardQuiz'
import { useQuery } from '@apollo/client'
import { GET_ALL_QUIZ } from '../graphql/queiries'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
    const { loading, error, data: quizzes } = useQuery(GET_ALL_QUIZ, {
        fetchPolicy: "cache-and-network"
    })
    // console.log(quizzes);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <div className="bg-[#ecb744] h-screen flex flex-col ">
                <div className="flex justify-center">
                    <div className="py-60 font-black text-5xl proportional-nums uppercase">
                        Sahoot GO!
                    </div>
                    <div>
                        <button>Login</button>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-6 gap-4 mmd:grid-cols-3 pt-16 bg-[#f8f8f8]">
                <div className=" box-border rounded-xl w-full p-4 mmd:col-span-4 grid-rows-2">
                    <div className="rounded-full h-34 w-34 mt-14 mmd:mt-1 p-8 font-semibold bg-white  ">
                        <div className="text-center">
                            <FontAwesomeIcon size="3x" icon={faUser}></FontAwesomeIcon>
                        </div>
                        <div className="text-center">Brian</div>
                    </div>
                    <div className="bg-[#FDF6F0] box-border h-32 my-2 p-2">Challenge
                        Overview (Offline quiz still active)</div>
                </div>
                <div className=" box-border rounded-xl h-auto w-full p-4 col-span-4">
                    <div className="text-center font-extrabold text-2xl">COLLECTION KUIS</div>
                    <div>
                        <div className="flex flex-wrap">
                            {
                                quizzes.Quizzes.map((e, i) => {
                                    return (
                                        <div key={i} className="md:w-1/2 lg:w-1/3 py-2 px-2">
                                            <CardQuiz dataQuizzes={e} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className=" box-border rounded-xl w-full p-4 mmd:col-span-4 grid-rows-2">
                    <div className="mt-14 mmd:mt-1 p-8 font-semibold bg-white ">Report</div>
                </div>
            </div>
        </>
    )
}