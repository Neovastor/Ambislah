import React from 'react'
import GoogleLogin from 'react-google-login';

export default function InputPin() {
    const CALLBACK = (response) => {
        console.log(response);
    }
    return (
        <div className=" flex flex-col justify-center h-screen bg-red-500 ">
            <div>
                <form className="m-4 flex justify-center ">
                    <input className="md-max:w-40 rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" placeholder="input pin" />
                    <button className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">Submit</button>
                </form>
            </div>
            <div>
                <form className="m-4 flex justify-center ">
                    <input className="md-max:w-40 rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" placeholder="nickname" />
                    <button className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">Submit</button>
                </form>
            </div>
            <div className="m-4 flex justify-center ">
                <GoogleLogin className="md-max:w-40 rounded-lg"
                    clientId={"242292821855-irao4vnt2skrbe2581024tm7ruk8cq8l.apps.googleusercontent.com"}
                    buttonText="Login"
                    onSuccess={CALLBACK}
                    onFailure={CALLBACK}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    )
}