import { useForm } from "react-hook-form";
import { useMutation, useReactiveVar } from '@apollo/client';
import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import { GOOGLE_LOGIN, LOGIN } from '../graphql/queiries/userQueries';
import { useAlert } from 'react-alert';
import Swal from 'sweetalert2'
import { loginVar } from "../graphql/vars";

export default function Report() {
  const { register, handleSubmit } = useForm();
  const isLogin = useReactiveVar(loginVar)
  const alert = useAlert()
  const history = useHistory()
  const [login, { data: datalogin }] = useMutation(LOGIN)
  const [googlelogin, { data: datagooglelogin }] = useMutation(GOOGLE_LOGIN)

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
  const submitLogin = async e => {
    try {
      const { email, password } = e
      const res = await login({
        variables: {
          input: {
            email: email,
            password: password
          }
        }
      })
      console.log('>>>>>>', res.data.login)
      localStorage.setItem('access_token', res.data.login.access_token)
      history.push('/')
      // alert.success('Welcome')
      loginVar(true)
      Swal.fire({
        icon: "success",
        title: "Welcome..!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username and Password did not match!',
        footer: '<h1>Wanna try again?</h1>'
      })
    }
  }
  return (
    <div className="overflow-x-auto pt-14">
      <div className="min-w-screen min-h-[777px] bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full lg:w-5/6 max-w-[777px] pt-5">
          <div className="bg-white shadow-md rounded-lg my-6">

            <div className="flex flex-col break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit(submitLogin)}>
                  <div className="w-full mb-3 mt-5">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Email</label>
                    <input {...register('email')} type="email" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style={{ "transition": "all 0.15s ease 0s" }} />
                  </div>
                  <div className="w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Password</label>
                    <input {...register('password')} type="password" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style={{ "transition": "all 0.15s ease 0s" }} />
                  </div>
                  <div>
                    <Link to="/register" className="text text-blue-600 cursor-pointer">
                      don't have an account, Register here.
                    </Link>
                  </div>
                  <div className="text-center mt-6">
                    <button className=" bg-[#1DB954] text-white active:bg-black active:opacity-70 text-xl font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="submit" style={{ "transition": "all 0.15s ease 0s" }}>Log In</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="btn-wrapper text-center">
                <GoogleLogin
                  clientId={"126002171773-rcnptkt46cifkib3ek6po65o7ljh4jgv.apps.googleusercontent.com"}
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