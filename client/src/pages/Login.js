import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import { LOGIN } from '../graphql/queiries/userQueries';
import { useAlert } from 'react-alert';

export default function Report() {
  const alert = useAlert()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { data: datalogin }] = useMutation(LOGIN)

  const CALLBACK = (response) => {
    console.log(response);
  }
  const changeEmail = e => {
    setEmail(e.target.value)
  }
  const changePassword = e => {
    setPassword(e.target.value)
  }
  const submitLogin = e => {
    e.preventDefault()
    login({
      variables: {
        input: {
          email: email,
          password: password
        }
      }
    })

    setEmail('')
    setPassword('')
    history.push('/')
    alert.success('Welcome')
    console.log('>>>>>>', datalogin)

  }
  return (
    <div className="overflow-x-auto pt-14">
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full lg:w-5/6 max-w-[777px] pt-5">
          <div className="bg-[#28527A] shadow-md rounded-lg my-6">

            <div className="flex flex-col break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={submitLogin}>
                  <div className="w-full mb-3 mt-5">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Email</label>
                    <input onChange={changeEmail} value={email} type="email" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style={{ "transition": "all 0.15s ease 0s" }} />
                  </div>
                  <div className="w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Password</label>
                    <input onChange={changePassword} value={password} type="password" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style={{ "transition": "all 0.15s ease 0s" }} />
                  </div>
                  <div>
                    <Link to="/register" className="text text-[#28527A] cursor-pointer">
                      don't have an account, Register here.
                    </Link>
                  </div>
                  <div className="text-center mt-6">
                    <button className="rounded-lg bg-[#28527A] font-bold uppercase  hover:border-2 text-white hover:border-[#28527A] hover:bg-white hover:text-[#28527A] text-white rounded-lg mr-2 px-8 py-4" type="submit" style={{ "transition": "all 0.15s ease 0s" }}>Log In</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="rounded-t mb-0 px-6 py-6 bg-[#28527A]">
              <div className="btn-wrapper text-center">
                <GoogleLogin className="rounded-lg bg-[#28527A] font-bold uppercase  hover:border-2 text-white hover:border-[#28527A] hover:bg-white hover:text-[#28527A] text-white rounded-lg mr-2 px-8 py-4"
                  clientId={"126002171773-rcnptkt46cifkib3ek6po65o7ljh4jgv.apps.googleusercontent.com"}
                  // buttonText="GOOGLE"
                  onSuccess={CALLBACK}
                  onFailure={CALLBACK}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
              <hr className="mt-6 border-b-1 border-gray-400" />
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}