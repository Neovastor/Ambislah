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
  const history= useHistory()
  const [login, { data: datalogin }] = useMutation(LOGIN)
  const [googlelogin, { data: datagooglelogin }] = useMutation(GOOGLE_LOGIN)

  const CALLBACK = async (response) => {
    try {
      console.log(response);
      console.log('id_token',response.tokenId)
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
            <div className="w-full lg:w-5/6 max-w-screen-2xl pt-5">
              <div className="bg-white shadow-md rounded-lg my-6 min-h-screen">
                <div className="flex justify-center">
                  <input type="text" className="text px-72 py-8 bg-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-xl" />
                </div>
                <div className="flex justify-center">
                  <div className="flex flex-col mx-60 my-60">
                  <button className="px-6 py-4 rounded-lg bg-red-500 min-w-[400px] my-4">aaaaa</button>
                  <button className="px-6 py-4 rounded-lg bg-red-500 min-w-[400px] my-4">bbbbb</button>
                  </div>
                  <div className="flex flex-col mx-60 my-60">
                  <button className="px-6 py-4 rounded-lg bg-red-500 min-w-[400px] my-4">ccccc</button>
                  <button className="px-6 py-4 rounded-lg bg-red-500 min-w-[400px] my-4">ddddd</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    )
}