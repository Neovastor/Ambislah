import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';

export default function Report() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const CALLBACK = (response) => {
    console.log(response);
  }
  const changeEmail = e => {
    setEmail(e.target.value)
  }
  const changePassword = e => {
    setPassword(e.target.value)
  }
  const register = e => {
    e.preventDefault()

  }
  return (
    <div className="overflow-x-auto pt-14">
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full lg:w-5/6 max-w-[777px] pt-5">
          <div className="bg-white shadow-md rounded-lg my-6">

            <div className="flex flex-col break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  <div className="w-full mb-3 mt-5">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Email</label>
                    <input onChange={changeEmail} type="email" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style={{ "transition": "all 0.15s ease 0s" }} />
                  </div>
                  <div className="w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" for="grid-password">Password</label>
                    <input onChange={changePassword} type="password" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style={{ "transition": "all 0.15s ease 0s" }} />
                  </div>
                  <div className="flex justify-end">
                    <Link to="/login" className="text text-blue-600 cursor-pointer">
                      Already have an account, Login here.
                    </Link>
                  </div>
                  <div className="text-center mt-6">
                    <button className="bg-[#FFA0A0] text-black active:bg-gray-700 text-xl font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="button" style={{ "transition": "all 0.15s ease 0s" }}>REGISTER</button>
                  </div>
                </form>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}