import React from 'react'
import CardQuiz from '../components/CardQuiz'
import { useQuery } from '@apollo/client'
import { GET_ALL_QUIZ } from '../graphql/queiries'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { loginVar } from "../graphql/vars";
import { useMutation, useReactiveVar } from '@apollo/client';
import { GOOGLE_LOGIN } from '../graphql/queiries/userQueries';
import ReactPlayer from 'react-player'

export default function Home() {

    // const { register, handleSubmit } = useForm();
    const isLogin = useReactiveVar(loginVar)
    const access_token = localStorage.access_token
    // const alert = useAlert()
    const history = useHistory()
    // const [login, { data: datalogin }] = useMutation(LOGIN)
    const [googlelogin] = useMutation(GOOGLE_LOGIN)
    const { loading, error, data: quizzes } = useQuery(GET_ALL_QUIZ, {
        fetchPolicy: "cache-and-network",
        variables: {
          access_token: localStorage.access_token
        }
    })
    // console.log(googlelogin, 'ini google login');
    // console.log(quizzes, '>>>>>>>>>>>>>>>>>>.');
    // console.log(localStorage.access_token, 'ini lokal storege');

    const CALLBACK = async (response) => {
        try {
            // console.log(response);
            // console.log('id_token', response.tokenId)
            const res = await googlelogin({
                variables: {
                    input: {
                        id_token: response.tokenId
                    }
                }
            })
            // console.log('>>>>>>', response)
            localStorage.setItem('access_token', res.data.googlelogin.access_token)
            localStorage.setItem('name', response.profileObj.name)
            history.push('/')
            // alert.success('Welcome')
            loginVar(true)
            Swal.fire({
                icon: "success",
                title: `Welcome.. ${response.profileObj.name}!`,
                imageUrl: `${response.profileObj.imageUrl}`,
                imageWidth: 200,
                imageHeight: 100,
                imageAlt: 'Custom image',
                showConfirmButton: false,
                timer: 2500,
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something wrong!',
                footer: '<h1>Wanna try again?</h1>'
            })
        }
    }

    const toLogin = () => {
        history.push('/login')
    }

    const toCreate = () => {
        console.log('masuk create')
        history.push('/create')
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            {/* bg-[#ecb744]  */}
            <div className="bg-[#27659e] h-screen mmd:h-full flex flex-auto justify-center items-end">
                <div className="bg-[#429dda] h-[80%] w-[90%] mmd:pt-8">
                    <div className="flex flex-col items-center pt-20">

                        {
                            (!localStorage.access_token)
                                ? <>

                                    <div className="grid grid-cols-2 justify-center mmd:grid-cols-1">
                                        <div className="px-10">
                                            <div className="font-black text-white text-7xl mmd:text-3xl proportional-nums uppercase">
                                                Sahoot GO! {JSON.stringify(quizzes)}
                                            </div>
                                            <div className="text-white font-serif mt-2">
                                                Sahoot! is a game-based learning platform, used as educational technology and most importantly for FUN!. This app provide you tool to make a quiz with multiple choice or audio as an input. It uses a quiz-style teaching where a user answers questions in a series and competes with other users on the same quiz. With Sahoot!, player can learn new thing while having fun.
                                            </div>
                                            <div>
                                                <div>
                                                    <button onClick={toLogin} className="bg-[#1d54b9] rounded-full text-white hover:text-[#1d54b9] hover:bg-[#ffffff] px-12 py-1 mt-10 m-2 text-2xl text-bold uppercase">Login</button>
                                                </div>
                                                <div>
                                                    <GoogleLogin
                                                        clientId={"242292821855-irao4vnt2skrbe2581024tm7ruk8cq8l.apps.googleusercontent.com"}
                                                        onSuccess={CALLBACK}
                                                        onFailure={CALLBACK}
                                                        cookiePolicy={'single_host_origin'}
                                                        className="rounded-full"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {/* <ReactPlayer className="w-[500px] h-[250px] mmd:w-[300px] mmd:[150px] mmd:m-3" url='https://www.youtube-nocookie.com/embed/uaXYjCzPpzs' /> */}
                                            <iframe className="w-[500px] h-[250px] mmd:w-[300px] mmd:[150px] mmd:m-3" src="https://www.youtube-nocookie.com/embed/uaXYjCzPpzs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </>
                                : <>
                                    <div className="grid grid-cols-2">
                                        <div className="px-10">
                                            <div className="font-black m-2 text-white text-5xl proportional-nums uppercase">
                                                Sahoot GO!
                                            </div>
                                            <div className="font-black m-2 text-white text-5xl proportional-nums uppercase">
                                                welcome
                                            </div>
                                            <div className="font-black m-2 text-white text-5xl proportional-nums uppercase">
                                                {localStorage.name}
                                            </div>
                                            <div className="text-white font-serif mt-2">
                                                Sahoot! is a game-based learning platform, used as educational technology and most importantly for FUN!. This app provide you tool to make a quiz with multiple choice or audio as an input. It uses a quiz-style teaching where a user answers questions in a series and competes with other users on the same quiz. With Sahoot!, player can learn new thing while having fun.
                                            </div>
                                        </div>
                                        <div>
                                            {/* <ReactPlayer className="w-[500px] h-[250px] mmd:w-[300px] mmd:[150px] mmd:m-3" url='https://www.youtube-nocookie.com/embed/uaXYjCzPpzs' /> */}
                                            <iframe className="w-[500px] h-[250px] mmd:w-[300px] mmd:[150px] mmd:m-3" src="https://www.youtube-nocookie.com/embed/uaXYjCzPpzs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div >
            {
              (localStorage.access_token)
                    ? <>
                        {/* looking */}
                        <div className="flex flex-col py-10">
                            <div className="flex flex-col items-center">
                                <div className="text-3xl capitalize font-semibold m-2 mmd:text-2xl">Looking for your Quiz ?</div>
                                <div className="text-xl font-light m-2">Start your Quiz or</div>
                                <button onClick={toCreate} className="text-2xl font-semibold m-2 border-2 border-gray-400 hover:bg-gray-400 hover:text-white rounded-full uppercase py-1 px-10">Create</button>
                            </div>
                        </div>
                        {/* card quiz */}
                        <div className="grid md:grid-cols-3 gap-4 mmd:grid-cols-3 pt-16 bg-[#f8f8f8]">
                            <div className="box-border rounded-xl h-auto w-full p-4 col-span-4">
                                <div>
                                    <div className="flex flex-wrap">
                                        {
                                            quizzes.Quizzes.map((e, i) => {
                                                return (
                                                    <div key={i} className="md:w-1/2 lg:w-1/3 py-2 px-2">
                                                        <CardQuiz dataQuizzes={e} index={i} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    : <></>
            }

            {/* card home */}
            <div className="flex flex-wrap bg-[#f8f8f8]">
                <div className="md:w-1/2 lg:w-1/2 py-4 px-4">
                    <div className=" ">
                        <div className="bg-white shadow p-2 text-gray-800 hover:shadow-lg">
                            <img src="https://assets.pandaily.com/uploads/2019/06/online-education.jpg" className="h-32 w-full object-cover" />

                            <div className="py-2 px-2">
                                <div className=" font-bold font-title text-center">Online Education</div>
                                <div className="text-sm font-light text-center my-2">Online Education is a very flexible learning system that allows students to study solely via the internet on their own computer at home, or wherever they see fit.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 lg:w-1/2 py-4 px-4">
                    <div className=" ">
                        <div className="bg-white shadow p-2 text-gray-800 hover:shadow-lg">
                            <img src="https://antmedia.io/wp-content/uploads/2020/08/what-is-e-learning.png" className="h-32 w-full object-cover" />

                            <div className="py-2 px-2">
                                <div className=" font-bold font-title text-center">E-Learning is a solution in the time of COVID-19</div>
                                <div className="text-sm font-light text-center my-2">It is online learning's big moment and education is about to be revamped just as much the industries that are going to remote work due to the novel coronavirus.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 lg:w-1/2 py-4 px-4">
                    <div className=" ">
                        <div className="bg-white shadow p-2 text-gray-800 hover:shadow-lg">
                            <img src="https://blog.pearsoninternationalschools.com/wp-content/uploads/2021/03/GettyImages-1270930604_1800x900.jpg" className="h-64 w-full object-cover" />

                            <div className="py-2 px-2">
                                <div className=" font-bold font-title text-center">Two-way discussion</div>
                                <div className="text-sm font-light text-center my-2">In this application, you can interact and discuss with each other in starting Live quizzes</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 lg:w-1/2 py-4 px-4">
                    <div className=" ">
                        <div className="bg-white shadow p-2 text-gray-800 hover:shadow-lg">
                            <img src="https://sisschools.org/wp-content/uploads/2020/04/SIS-girl-working-on-laptop-2NPPA7B.jpg" className="h-64 w-full object-cover" />

                            <div className="py-2 px-2">
                                <div className=" font-bold font-title text-center">Chase your dream with us</div>
                                <div className="text-sm font-light text-center my-2">You can make quizzes and invite your friends to study acidity in this application</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sahoot */}
            <div className="flex flex-col py-10">
                <div className="flex flex-col items-center">
                    <div className="text-3xl capitalize font-semibold m-2 mmd:text-2xl">How does Sahoot! work?</div>
                    {/* commerce slide cards */}
                    <div style={{ backgroundColor: '#fff8f4' }} className="h-full">
                        <div className="container mx-auto  lg:px-20">
                            <div className="grid grid-cols-3 h-full pb-40">
                                <div className="border-r border-gray-300 mx-3 lg:pl-20">
                                    <div className=" py-10 pb-3 mt-5 h-5/6 bg-red-100 group hover:bg-red-200 cursor-pointer transition ease-out duration-300">
                                        <div>
                                            <div className="w-4 h-1/5 bg-red-50	absolute right-0 -top-48 bg-purple-100 group-hover:bg-purple-50" />
                                            <img src="https://image.freepik.com/free-vector/learning-languages-concept-illustration_114360-3251.jpg" alt="https://www.pngegg.com/en/png-nllal/download" />
                                        </div>
                                        <div className="px-7 mt-10">
                                            <h1 className="text-3xl text-center mt-2 font-bold">Create</h1>
                                            <p className="mt-2 text-center opacity-60 group-hover:opacity-70 ">It only takes minutes to create a learning game or quiz on any topic.</p>
                                        </div>

                                    </div>
                                </div>

                                <div className="border-r border-gray-300 mx-3 lg:pl-20">
                                    <div className=" py-10  pb-3 mt-24 h-5/6 bg-indigo-100 group hover:bg-indigo-200 cursor-pointer transition ease-out duration-300">
                                        <div>
                                            <div className="w-4 h-1/5 bg-red-50	absolute right-0 -top-48 bg-indigo-100  group-hover:bg-indigo-50" />
                                            <img src="https://image.freepik.com/free-vector/international-cooperation-concept-illustration_114360-6002.jpg" alt="https://www.pngegg.com/en/png-zquqj/download" />
                                        </div>
                                        <div className="px-7 mt-10">
                                            <h1 className="text-3xl text-center mt-2 font-bold">Host or Share</h1>
                                            <p className="mt-2 text-center opacity-60 group-hover:opacity-70 ">Host a live game with questions on a big screen or share a game with remote players.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-r border-gray-300 mx-3 lg:pl-20">
                                    <div className=" py-10 pb-3 mt-48 h-5/6 bg-purple-100 group hover:bg-purple-200 cursor-pointer transition ease-out duration-300">
                                        <div>
                                            <div className="w-4 h-1/5 bg-red-50	absolute right-0 -bottom-44 bg-red-100 group-hover:bg-red-50" />
                                            <img src="https://image.freepik.com/free-vector/mobile-ux-concept-illustration_114360-4276.jpg" alt="https://www.pngegg.com/en/png-epwii/download" />
                                        </div>
                                        <div className="px-7 mt-10">
                                            <h1 className="text-3xl text-center mt-2 font-bold">Play</h1>
                                            <p className="mt-2 text-center opacity-60 group-hover:opacity-70 ">Game on! Join a sahoot with a PIN provided by the host and answer questions on your device.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}