import { useForm } from 'react-hook-form'
import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../graphql/queiries/userQueries';
import Swal from 'sweetalert2'

export default function Report() {
  const { register, handleSubmit } = useForm()
  const history = useHistory()
  const [registration, { data: dataregister }] = useMutation(REGISTER)

  const submitRegister = async e => {
    try {
      // console.log('masuk')
      const { email, password } = e
      const res = await registration({
        variables: {
          input: {
            email: email,
            password: password
          }
        }
      })
      // console.log('>>>data', res.data.register)
      history.push('/login')
      Swal.fire({
        icon: "success",
        title: "registered, please Login!",
        showConfirmButton: false,
        timer: 1500,
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
  return (
    <div className="overflow-x-auto pt-14">
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full lg:w-5/6 max-w-[777px] pt-5">
          <div className="bg-white shadow-md rounded-lg my-6">

            <div className="flex flex-col break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit(submitRegister)}>
                  <div className="w-full mb-3 mt-5">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Email</label>
                    <input {...register('email')} type="email" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Email" style={{ "transition": "all 0.15s ease 0s" }} />
                  </div>
                  <div className="w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Password</label>
                    <input {...register('password')} type="password" className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full" placeholder="Password" style={{ "transition": "all 0.15s ease 0s" }} />
                  </div>
                  <div className="flex justify-end">
                    <Link to="/login" className="text text-[#1a5c92] cursor-pointer">
                      Already have an account, Login here.
                    </Link>
                  </div>
                  <div className="text-center mt-6">
                    <button className="bg-[#1DB954] text-white active:bg-black active:opacity-70 text-xl font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" type="submit" style={{ "transition": "all 0.15s ease 0s" }}>REGISTER</button>
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