import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import { GOOGLE_LOGIN, LOGIN } from '../graphql/queiries/userQueries';
import { useAlert } from 'react-alert';
import Swal from 'sweetalert2'

export default function Report() {
  const { register, handleSubmit } = useForm();
  const alert = useAlert()
  const history= useHistory()
  const [login, { data: datalogin }] = useMutation(LOGIN)
  const [googlelogin, { data: datagooglelogin }] = useMutation(GOOGLE_LOGIN)

  const CALLBACK = async (response) => {
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
    Swal.fire({
      icon: "success",
      title: `Welcome..${response.Os.Ne}!`,
      imageUrl: `${response.profileObj.imageUrl}`,
      imageWidth: 200,
      imageHeight: 100,
      imageAlt: 'Custom image',
      showConfirmButton: false,
      timer: 2500,
    });
  }
  const submitLogin = e => {
    const { email, password } = e
    login({
      variables: {
        input: {
          email: email,
          password: password
        }
      }
    })
    .then(res => {
        console.log('>>>>>>', res.data.login)
        localStorage.setItem('access_token', res.data.login.access_token)
        history.push('/')
        // alert.success('Welcome')
        Swal.fire({
          icon: "success",
          title: "Welcome..!",
          showConfirmButton: false,
          timer: 1500,
        });
    })
    .catch(_ => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Username and Password did not match!',
        footer: '<h1>Wanna try again?</h1>'
      })
    })
  }
    return (
        <div className="overflow-x-auto pt-14">
            <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
                <div className="w-full lg:w-5/6 max-w-[777px] pt-5">
                    <div className="bg-white shadow-md rounded-lg my-6">

                      <div className="relative flex flex-col break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form onSubmit={handleSubmit(submitLogin)}>
                                <div className="relative w-full mb-3 mt-5">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Email</label>
                                    <input {...register('email')}  type="email" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style={{"transition": "all 0.15s ease 0s"}} />
                                </div>
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Password</label>
                                    <input {...register('password')}  type="password" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style={{"transition": "all 0.15s ease 0s"}} />
                                </div>
                                <div>
                                    <Link to="/register" className="text text-blue-600 cursor-pointer">
                                      don't have an account, Register here.
                                    </Link>
                                </div>
                                <div className="text-center mt-6">
                                    <button className="bg-[#FFA0A0] text-black active:bg-gray-700 text-xl font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="submit" style={{"transition": "all 0.15s ease 0s"}}>Log In</button>
                                </div>
                            </form>
                            </div>
                        </div>
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-3">
                                <h6 className="text-gray-600 text-sm font-bold">Sign in with</h6></div>
                            <div className="btn-wrapper text-center">
                            <GoogleLogin
                                clientId={"126002171773-rcnptkt46cifkib3ek6po65o7ljh4jgv.apps.googleusercontent.com"}
                                buttonText="GOOGLE"
                                onSuccess={CALLBACK}
                                onFailure={CALLBACK}
                                cookiePolicy={'single_host_origin'}
                            />
                            {/* <button className="bg-white text-black active:bg-gray-700 text-xl font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-6/12" type="button" style={{"transition": "all 0.15s ease 0s"}}>
                                  <svg xmlns="http://www.w3.org/2000/svg" 
                                  width="250" height="25" 
                                  viewBox="0.512 0.511 748.99 256.61">
                                    <g transform="translate(4636.413 -2865.209)">
                                      <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="-11445.563" y1="603.918" x2="-11445.563" y2="465.768" gradientTransform="matrix(1.3509 0 0 -1.3509 10917.478 3681.026)"><stop offset="0" stop-color="#196eef"/><stop offset=".5" stop-color="#186dee"/><stop offset="1" stop-color="#1065e7"/></linearGradient>
                                      <path d="M-4520.08 2990.41h32.21v45.24c-10.05 3.229-22.74 5-35.931 5-53.46 0-84.88-45.78-84.88-90.49 0-43.851 28.42-74.61 68.07-74.61 25.09 0 39.689 8.5 52.75 20.34v14.76l24.49-24.49c-15.49-10.48-37.92-20.44-69.98-20.44-70.38 0-102.55 50.351-102.55 91.73 0 58.899 42.9 94.38 96.811 94.38 26.14 0 49.35-3.99 76.16-11.45v-46.74c0-2.39 1.05-4.03 2.62-5.47l8.46-8.46h-57.45l-10.78 10.7z" fill="url(#a)"/><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="-11323.519" y1="556.948" x2="-11323.519" y2="467.618" gradientTransform="matrix(1.3509 0 0 -1.3509 10917.478 3681.026)"><stop offset="0" stop-color="#de5744"/><stop offset=".5" stop-color="#db4632"/><stop offset="1" stop-color="#d13d29"/></linearGradient><path d="M-4375.79 2928.93c-40.51 0-65.61 29.601-65.61 61.021 0 27.12 20.221 59.319 61.19 59.319 39.41 0 63.59-29.659 63.59-61.629 0-29.78-23.63-58.7-59.17-58.7v-.011zm-6.721 8.63c28.561 0 41.28 37.21 41.28 63.75 0 39.47-29.61 40.25-33.15 40.25-13.55 0-23.02-8.189-30.109-18.93-6.24-9.899-12.34-28.29-12.34-46.26 0-17.9 5.859-26.64 15.08-33.07 7.54-4.82 14.6-5.74 19.229-5.74h.01z" fill="url(#b)"/><linearGradient id="c" gradientUnits="userSpaceOnUse" x1="-11130.575" y1="556.948" x2="-11130.575" y2="413.518" gradientTransform="matrix(1.3509 0 0 -1.3509 10917.478 3681.026)"><stop offset="0" stop-color="#1a6fef"/><stop offset=".25" stop-color="#1e72ef"/><stop offset=".5" stop-color="#166bec"/><stop offset=".75" stop-color="#1267e9"/><stop offset="1" stop-color="#1063e5" stop-opacity=".87"/></linearGradient><path d="M-4110.979 2928.92c-35.381 0-54.521 22.4-54.521 47.41 0 19.04 13.64 40.52 41.78 40.52h7.119s-1.939 4.71-1.949 9.26c0 6.711 2.41 10.48 7.529 16.28-48.42 2.95-67.88 22.48-67.88 43.47 0 18.381 17.601 36.471 54.59 36.471 43.79 0 66.47-24.311 66.47-48.17 0-16.82-8.38-26.04-29.6-41.94-6.24-4.85-7.45-7.939-7.45-11.569 0-5.2 3.11-8.641 4.25-9.94 2.01-2.12 5.49-4.54 6.79-5.7 7.13-6.04 17.2-14.979 17.2-32.82 0-12.24-5.091-22.77-16.69-32.63h14.16l10.64-10.64h-52.438zm-9.76 7.96c6.42 0 11.779 2.27 17.439 6.98 6.279 5.66 16.311 20.87 16.311 39.69 0 20.31-15.78 25.87-24.32 25.87-4.18 0-9.189-1.17-13.43-4.07-9.42-6.109-18.771-22.37-18.771-41.72 0-17.46 10.4-26.75 22.771-26.75zm14.01 113.22c2.699 0 4.64.221 4.64.221s6.37 4.55 10.82 7.949c10.36 8.19 16.819 14.45 16.819 25.601 0 15.33-14.22 27.35-37.25 27.35-25.279 0-44.6-11.77-44.6-30.989 0-15.921 13.24-29.623 49.571-30.132z" fill="url(#c)"/><linearGradient id="d" gradientUnits="userSpaceOnUse" x1="-11061.771" y1="601.408" x2="-11061.771" y2="470.128" gradientTransform="matrix(1.3509 0 0 -1.3509 10917.478 3681.026)"><stop offset="0" stop-color="#0aa561"/><stop offset=".5" stop-color="#009b58"/><stop offset="1" stop-color="#00914b"/></linearGradient><path d="M-4050.88 3045.76h48.57l7.399-7.399-13.93-1.74c-3.75-.46-5.979-3.7-5.979-6.84v-146.71c0-2.89 1.34-4.37 2.319-5.311l8.761-8.76h-41.42l-10.78 10.78h16.1v151.97c0 2.16-.68 3.63-2.14 5.14l-8.9 8.87z" fill="url(#d)"/><linearGradient id="e" gradientUnits="userSpaceOnUse" x1="-10998.289" y1="556.948" x2="-10998.289" y2="467.864" gradientTransform="matrix(1.3509 0 0 -1.3509 10917.478 3681.026)"><stop offset="0" stop-color="#de5644"/><stop offset=".5" stop-color="#da4531"/><stop offset="1" stop-color="#ce3a28"/></linearGradient><path d="M-3936.5 2928.93c-27.12 0-55.93 20.67-55.93 57.78 0 30.649 20.67 62.56 59.29 62.56 9.63 0 17.56-1.239 24.99-4.649 7.97-3.67 15.64-9.63 21.239-17.12-10.569 5.33-19.189 8.83-30.64 8.83-21.76 0-42.74-15.7-50.08-44.56l76.87-31.07c-4.44-15.83-16.96-31.771-45.729-31.771h-.01zm-5.021 8.49c14.551 0 25.07 11.97 25.07 21.34 0 3.03-1.899 4.63-5.66 6.11l-47.25 19.11s-1.279-5.95-1.279-12.38c0-26.97 19.5-34.18 29.119-34.18z" fill="url(#e)"/><linearGradient id="f" gradientUnits="userSpaceOnUse" x1="-11221.762" y1="556.754" x2="-11221.762" y2="467.795" gradientTransform="matrix(1.3509 0 0 -1.3509 10917.478 3681.026)"><stop offset="0" stop-color="#ffc01a"/><stop offset=".5" stop-color="#ffba03"/><stop offset="1" stop-color="#ffb300"/></linearGradient><path d="M-4238.33 2928.93c-40.51 0-65.61 29.601-65.61 61.021 0 27.12 20.221 59.319 61.19 59.319 39.41 0 63.59-29.659 63.59-61.629 0-29.78-23.63-58.7-59.17-58.7v-.011zm-6.721 8.63c28.561 0 41.28 37.21 41.28 63.75 0 39.47-29.61 40.25-33.15 40.25-13.55 0-23.02-8.189-30.109-18.93-6.24-9.899-12.34-28.29-12.34-46.26 0-17.9 5.859-26.64 15.08-33.07 7.54-4.82 14.6-5.74 19.229-5.74h.01z" fill="url(#f)"/></g></svg>
                                  
                              
                              </button> */}
                            </div>
                            <hr className="mt-6 border-b-1 border-gray-400" />
                        </div>
                      </div>
                      
                      
                </div>
            </div>
        </div>
    )
}