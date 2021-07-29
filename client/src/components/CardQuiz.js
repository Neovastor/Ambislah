import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { collectionVar } from '../graphql/vars'

export default function CardQuiz(props) {
    const history = useHistory()
    const [image, setImage] = useState([
        'https://i2.wp.com/www.kozio.com/wp-content/uploads/2020/03/pengertian-sejarah.jpg?fit=594%2C351&ssl=1',
        'https://i2.wp.com/www.kozio.com/wp-content/uploads/2020/03/pengertian-sejarah.jpg?fit=594%2C351&ssl=1',
    ])
    const moveToCollections = () => {
        collectionVar(props)
        history.push('/collections')
    }

    return (
        <div className="w-full">
            <div onClick={moveToCollections} className="shadow hover:shadow-lg transition duration-300 ease-in-out xl:mb-0 lg:mb-0 md:mb-0 mb-6 cursor-pointer group">
                <div className="overflow-hidden">
                    <img className="w-full transition duration-700 ease-in-out group-hover:opacity-60" src={image[0]} alt="image" />
                    <div className="flex justify-center">
                        <div className="bottom-4 flex flex-row transition duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                            <div>
                                <h1 className="text font-bold text-xl py-5">{props.dataQuizzes.title}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div className="shadow hover:shadow-lg transition duration-300 ease-in-out xl:mb-0 lg:mb-0 md:mb-0 mb-6 cursor-pointer group">
        //     <button onClick={moveToCollections}>
        //         <div className="bg-[#3D84B8] shadow p-2 rounded-lg text-white hover:shadow-2xl">
        //             <img src={"https://cdn.dribbble.com/users/201599/screenshots/1545461/book.jpg?compress=1&resize=400x300"} className="h-32 rounded-lg w-full object-cover" />
        //             <div className="py-2 px-2">
        // <div className=" font-bold font-title text-center">{props.dataQuizzes.title}</div>
        //                 <div className="text-sm font-light text-center my-2">{props.dataQuizzes.mode}</div>
        //             </div>

        //         </div>
        //     </button>
        // </div>
    )
}