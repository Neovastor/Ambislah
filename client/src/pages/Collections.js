import React, { useEffect, useState } from 'react'
import CardQuestions from '../components/CardQuestions'
import { collectionVar } from '../graphql/vars'
import { useReactiveVar, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { DELETE_QUIZZEZ } from '../graphql/queiries'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
// import firebase from "firebase/app";

export default function Collections({ db = null }) {
    const [removeMovies] = useMutation(DELETE_QUIZZEZ)
    const Quiz = useReactiveVar(collectionVar)
    console.log(Quiz, '>>>>>>>>>>>>>>>>>');
    console.log(Quiz.dataQuizzes._id, 'iddddddd');
    // const [id, setId] = useState("");
    const history = useHistory();


    async function handleOnSubmit(e) {
        e.preventDefault();
        let roomkey = "";
        // await setId(Quiz.dataQuizzes._id)
        // console.log(id, 'ini id??????????/');
        fetch(`http://54.166.28.112/quizzes/${Quiz.dataQuizzes._id}`, {
            headers: {
                access_token: localStorage.access_token
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                // console.log(myJson);

                if (db) {
                    for (let i = 0; i < 6; i++) {
                        roomkey = roomkey + String(Math.floor(Math.random() * 10));
                    }

                    const livegamesRef = db.collection("livegames").doc(roomkey);

                    db.collection("quizzes").add({
                        ...myJson,
                        roomkey,
                    });

                    livegamesRef
                        .set({
                            status: "waiting", // live / waiting / done
                            indexSoal: 0,
                            leaderboard: [],
                        })
                        .then(() => {
                            history.push(`/waitingroom/${roomkey}`);
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const destory = async () => {
      try {
          await removeMovies({
              variables: {
                  id: Quiz.dataQuizzes._id,
                  access_token: localStorage.access_token
              }
          })
          Swal.fire({
              icon: 'success',
              title: 'Success delete Quiz',
              showConfirmButton: false,
              timer: 1500
          })
          history.push("/")
      }
      catch(err) {
          console.log(err);
          Swal.fire({
              icon: 'error',
              title: 'cannot delete Quiz',
              showConfirmButton: false,
              timer: 1500
          })
      }
  }

    const updated = () => {
        // console.log();
        history.push('/collections/update')
    }

    return (
        <>
            <div className="grid grid-cols-6 mmd:grid-cols-1 justify-center pt-14 bg-gradient-to-t from-[#ffc353] to-[#1496c9] h-full">
                <div className="md:col-span-2 flex justify-center w md:mt-28 mb-4">
                    <div>
                        <img className="w-72 " src={"https://www.physicsacademy.com.sg/wp-content/uploads/2018/08/download.jpg"} alt="" />
                    </div>
                </div>
                <div className="pt-36 mmd:pt-2 mmd:ml-5">
                    <div className="md:col-span-4 uppercase font-extrabold text-white text-[50px] mmd:text-[25px] pl-4">{Quiz.dataQuizzes.title}</div>
                    <div className="md:col-span-4 uppercase font-extrabold text-white mmd:text-sm pl-4 text-lg">{Quiz.dataQuizzes.mode}</div>
                    <div className="ml-4 mt-2">
                        <button onClick={updated} className="bg-[#28527A] hover:border-2 hover:border-[#28527A] hover:bg-white hover:text-[#28527A] text-white px-2 py-1 rounded-lg mr-2">Update</button>
                        <button onClick={destory} className="bg-[#28527A] hover:border-2 hover:border-[#28527A] hover:bg-white hover:text-[#28527A] text-white px-2 py-1 rounded-lg ml-2">Delete</button>
                        <button onClick={(e) => handleOnSubmit(e)} className="bg-[#28527A] hover:border-2 hover:border-[#28527A] hover:bg-white hover:text-[#28527A] text-white px-6 py-1 rounded-lg mt-2">Create Room</button>
                    </div>
                </div>
            </div>
            <div className="h-20 bg-gradient-to-t from-[#ffc353] to-[#ffc353] ">

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-10 bg-[#ffc353]">
                {
                    Quiz.dataQuizzes.questions.map((e, i) => {
                        return (
                            <div key={i} className="flex flex-col items-center justify-start bg-[#28527A]  shadow rounded-lg">
                                <CardQuestions dataQuizzes={e} index={i} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}