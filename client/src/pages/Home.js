import React from 'react'
import CardQuiz from '../components/CardQuiz'
import { useQuery } from '@apollo/client'
import { GET_ALL_QUIZ } from '../graphql/queiries'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { loginVar } from "../graphql/vars";
import { useMutation, useReactiveVar } from '@apollo/client';
import { GOOGLE_LOGIN, LOGIN } from '../graphql/queiries/userQueries';

export default function Home() {
    // const { register, handleSubmit } = useForm();
    // const isLogin = useReactiveVar(loginVar)
    // const alert = useAlert()
    const history = useHistory()
    // const [login, { data: datalogin }] = useMutation(LOGIN)
    const [googlelogin, { data: datagooglelogin }] = useMutation(GOOGLE_LOGIN)
    const { loading, error, data: quizzes } = useQuery(GET_ALL_QUIZ, {
        fetchPolicy: "cache-and-network"
    })
    const CALLBACK = async (response) => {
        try {
            console.log(response);
            console.log('id_token', response.tokenId)
            const res = await googlelogin({
                variables: {
                    input: {
                        id_token: response.tokenId
                    }
                }
            })
            console.log('>>>>>>', res.data.googlelogin)
            localStorage.setItem('access_token', res.data.googlelogin.access_token)
            history.push('/')
            // alert.success('Welcome')
            loginVar(true)
            Swal.fire({
                icon: "success",
                title: `Welcome..  ${response.Os.Ne}!`,
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
            <div className="bg-[#ecb744] h-screen  ">
                <div className="flex flex-col items-center py-60">
                    <div className="font-black text-5xl proportional-nums uppercase">
                        Sahoot GO!
                    </div>
                    <div>
                        <div>
                            <button onClick={toLogin} className="bg-[#1DB954] rounded-full text-white hover:bg-[#1fc258] px-12 py-1 mt-10 m-2 text-2xl text-bold uppercase">Login</button>
                        </div>
                        <div>
                            <GoogleLogin
                                clientId={"126002171773-rcnptkt46cifkib3ek6po65o7ljh4jgv.apps.googleusercontent.com"}
                                onSuccess={CALLBACK}
                                onFailure={CALLBACK}
                                cookiePolicy={'single_host_origin'}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col py-10">
                <div className="flex flex-col items-center">
                    <div className="text-3xl capitalize font-semibold m-2 mmd:text-2xl">Looking for your Quiz ?</div>
                    <div className="text-xl font-light m-2">Start your Quiz or</div>
                    <button onClick={toCreate} className="text-2xl font-semibold m-2 border-2 border-gray-400 hover:bg-gray-400 hover:text-white rounded-full uppercase py-1 px-10">Create</button>
                </div>
            </div>
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
    )
}