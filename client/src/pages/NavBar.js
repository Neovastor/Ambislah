import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <header className="lg:px-16 px-6 bg-green-500 flex flex-wrap items-center lg:py-0 py-2">
            <div className="flex-1 flex justify-between items-center">
                <Link to="/">
                    <h1 className="text-2xl text-white">Ambaslah</h1>
                </Link>
            </div>
            <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block"><svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg></label>
            <input className="hidden" type="checkbox" id="menu-toggle" />
            <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
                <nav>
                    <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
                        <li><Link className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white text-white" to="/">Home</Link></li>
                        <li><Link className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white text-white" to="/">Library</Link></li>
                        <li><Link className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white text-white" to="/">Report</Link></li>
                        <li><Link className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white text-white" to="/">Login</Link></li>
                        <li><Link className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white text-white" to="/">Logout</Link></li>
                        <li><Link className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-white text-white" to="/">Create</Link></li>
                    </ul>
                </nav >
            </div >
        </header >
    )
}