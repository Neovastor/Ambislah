import { useForm } from "react-hook-form";
import { useMutation, useReactiveVar } from '@apollo/client';
import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import { GOOGLE_LOGIN, LOGIN } from '../graphql/queiries/userQueries';
import { useAlert } from 'react-alert';
import Swal from 'sweetalert2'
import { answerVar } from "../graphql/vars";

export default function Report() {
  const { register, handleSubmit } = useForm();
  const answer = useReactiveVar(answerVar)
  const alert = useAlert()
  const history= useHistory()
  const [login, { data: datalogin }] = useMutation(LOGIN)
  const [googlelogin, { data: datagooglelogin }] = useMutation(GOOGLE_LOGIN)
  const [type, setType] = useState('text')

  const typeSound = e => {
    setType('sound')
    const { input1, input2, input3, input4 } = e
    console.log(input1, input2, input3, input4)
  }
  const typeText = e => {
    setType('text')
  }

  return (
    <div className="overflow-x-auto pt-14">
        <div className="min-w-screen min-h-[777px] bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full lg:w-5/6 max-w-screen-2xl pt-5">
            <div className="bg-white shadow-md rounded-lg my-6 min-h-screen">
              <div className="flex justify-center">
                <input type="text" className="text px-72 py-8 bg-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-xl" />
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col mx-60 my-60">
                <button onClick={ handleSubmit(typeSound) } className="px-6 py-4 rounded-lg bg-red-500 min-w-[40px] my-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </button>
                </div>
                <div className="flex flex-col mx-60 my-60">
                <button onClick={ handleSubmit(typeText) } className="px-6 py-4 rounded-lg bg-red-500 min-w-[40px] my-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col mx-60 my-60">
                <input {...register('input1')} className="px-6 py-4 rounded-lg bg-red-500 min-w-[400px] my-4" placeholder="input first answer"/>
                <input {...register('input2')} className="px-6 py-4 rounded-lg bg-red-500 min-w-[400px] my-4" placeholder="input second answer"/>
                </div>
                <div className="flex flex-col mx-60 my-60">
                <input {...register('input2')} className="px-6 py-4 rounded-lg bg-red-500 min-w-[400px] my-4" placeholder="input second answer"/>
                <input {...register('input2')} className="px-6 py-4 rounded-lg bg-red-500 min-w-[400px] my-4" placeholder="input second answer"/>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}