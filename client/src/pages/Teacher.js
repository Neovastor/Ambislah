import { useForm } from "react-hook-form";
import { useMutation, useReactiveVar } from '@apollo/client';
import React, { useEffect, useState } from 'react'
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
  const [type1, setType1] = useState(false)
  const [type2, setType2] = useState(false)
  const [status1, setStatus1] = useState(false)
  const [status2, setStatus2] = useState(false)
  const [status3, setStatus3] = useState(false)
  const [status4, setStatus4] = useState(false)

  const typeSound = async e => {
    setType('sound')
    setType1(true)
    setType2(false)
  }
  const typeText = e => {
    setType('text')
    setType2(true)
    setType1(false)
  }
  const submit1 = e => {
    const { input1 } = e
    console.log('satu', input1)
    setStatus1(true)
    setStatus2(false)
    setStatus3(false)
    setStatus4(false)
  }
  const submit2 = e => {
    const { input2 } = e
    console.log('dua', input2)
    setStatus2(true)
    setStatus3(false)
    setStatus4(false)
    setStatus1(false)
  }
  const submit3 = e => {
    const { input3 } = e
    console.log('tiga', input3)
    setStatus3(true)
    setStatus4(false)
    setStatus1(false)
    setStatus2(false)
  }
  const submit4 = e => {
    const { input4 } = e
    console.log('empat', input4)
    setStatus4(true)
    setStatus1(false)
    setStatus2(false)
    setStatus3(false)
  }
  const submitAnswer = e => {
    const { input1, input2, input3, input4, inputQuestion } = e
    if (status1) console.log('ini yang di submit>>',input1)
    if (status2) console.log('ini yang di submit>>',input2)
    if (status3) console.log('ini yang di submit>>',input3)
    if (status4) console.log('ini yang di submit>>',input4)
    if (type1) console.log(type)
    if (type2) console.log(type)
    console.log('ini questionnya>>', inputQuestion)
    console.log('ini tipenya>>', type)
  }

  return (
    <div className="overflow-x-auto pt-14">
        <div className="min-w-screen min-h-[777px] bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full lg:w-5/6 max-w-screen-2xl pt-5">
            <div className="bg-white shadow-md rounded-lg my-6 min-h-screen">
              <div className="flex justify-center">
                <div className="flex flex-col">
                  <label>input your question</label>
                  <input {...register('inputQuestion')} type="text" className="text px-72 py-8 bg-red-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-xl" placeholder="input your question"/>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col mx-60 my-60">
                <button onClick={ handleSubmit(typeSound) } className={ type1 === true ? 'bg-green-500 px-6 py-4 rounded-lg min-w-[40px] my-4' : 'px-6 py-4 rounded-lg bg-red-500 min-w-[40px] my-4' } >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </button>
                </div>
                <div className="flex flex-col mx-60 my-60">
                <button onClick={ handleSubmit(typeText) } className={ type2 === true ? 'bg-green-500 px-6 py-4 rounded-lg min-w-[40px] my-4' : 'px-6 py-4 rounded-lg bg-red-500 min-w-[40px] my-4' }>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </button>
                </div>
              </div>
              <form onSubmit={ handleSubmit(submitAnswer) }>
                <div className="flex justify-center">
                  <div className="flex flex-col mx-60">
                    <div className="flex flex-col">
                      <label>input your First Answer</label>
                      <input {...register('input1')} onClick={ handleSubmit(submit1) } className={ status1 === true ? 'bg-green-500 px-6 py-4 rounded-lg min-w-[400px] my-4' : 'bg-red-300 px-6 py-4 rounded-lg min-w-[400px] my-4' } placeholder="input first answer"/>
                    </div>
                    <div className="flex flex-col">
                      <label>input your Second Answer</label>
                      <input {...register('input2')} onClick={ handleSubmit(submit2) } className={ status2 === true ? 'bg-green-500 px-6 py-4 rounded-lg min-w-[400px] my-4' : 'bg-red-300 px-6 py-4 rounded-lg min-w-[400px] my-4' } placeholder="input second answer"/>
                    </div>
                  </div>
                  <div className="flex flex-col mx-60">
                    <div className="flex flex-col">
                      <label>input your Third Answer</label>
                      <input {...register('input3')} onClick={ handleSubmit(submit3) } className={ status3 === true ? 'bg-green-500 px-6 py-4 rounded-lg min-w-[400px] my-4' : 'bg-red-300 px-6 py-4 rounded-lg min-w-[400px] my-4' } placeholder="input third answer"/>
                    </div>
                    <div className="flex flex-col">
                      <label>input your Fourth Answer</label>
                      <input {...register('input4')} onClick={ handleSubmit(submit4) } className={ status4 === true ? 'bg-green-500 px-6 py-4 rounded-lg min-w-[400px] my-4' : 'bg-red-300 px-6 py-4 rounded-lg min-w-[400px] my-4' } placeholder="input fourth answer"/>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="px-6 py-2 bg-red-300 rounded-xl">Submit</button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>
  )
}