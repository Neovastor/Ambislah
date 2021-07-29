import React from 'react'
import ReactLoading from 'react-loading'

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center pt-10 h-screen">
            <ReactLoading type={'spin'} color={'#27659e'} height={'10%'} width={'10%'} />
            <h1>...Loading...</h1>
        </div>
    )
}