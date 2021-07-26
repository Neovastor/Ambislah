import { useReactiveVar } from '@apollo/client'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { loginVar } from '../graphql/vars'

export default function NavBar() {
  const isLogin = useReactiveVar(loginVar)
  const history = useHistory()
  const logout = e => {
    e.preventDefault()
    localStorage.clear()
    loginVar(false)
    history.push('/')
    Swal.fire({
      icon: "success",
      title: "Logout successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  }
    return (
        <header className="fixed w-full">
            <div className="lg:px-16 px-6 bg-[#FCD8D4] flex flex-wrap items-center lg:py-0 py-2">
                <div className="flex-1 flex justify-between items-center">
                    <NavLink exact to={"/"}>
                        <h1 className="text-2xl font-semibold text-[#835151]">Ambaslah</h1>
                    </NavLink>
                </div>
                <label htmlFor="menu-toggle" className="cursor-pointer sm:hidden block"><svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg></label>
                <input className="hidden" type="checkbox" id="menu-toggle" />
                <div className="hidden sm:flex sm:items-center sm:w-auto w-full" id="menu">
                    <nav>
                    <ul className="sm:flex items-center justify-between text-base text-gray-700 pt-4 sm:pt-0">
                            <li><NavLink exact to={"/"} className="sm:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white text-[#835151]  font-bold" >Home</NavLink></li>
                            <li><NavLink exact to={"/"} className="sm:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white text-[#835151]  font-bold" >Library</NavLink></li>
                            <li><NavLink exact to={"/report"} className="sm:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white text-[#835151]  font-bold" >Report</NavLink></li>
                            {
                              ! isLogin
                              ? <li><NavLink exact to={"/login"} className="sm:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white text-[#835151]  font-bold" >Login</NavLink></li>
                              : <li onClick={ logout } className="sm:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white text-[#835151]  font-bold cursor-pointer" >Logout</li>
                            }
                            <li><NavLink exact to={"/create"} className="sm:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white text-[#835151]  font-bold" >Create</NavLink></li>
                        </ul>
                    </nav >
                </div >
            </div >
        </header>
    )
}