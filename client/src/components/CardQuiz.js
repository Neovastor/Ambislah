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
        // <div className="w-full">
        //     <div onClick={moveToCollections} className="shadow hover:shadow-lg transition duration-300 ease-in-out xl:mb-0 lg:mb-0 md:mb-0 mb-6 cursor-pointer group">
        //         <div className="overflow-hidden">
        //             <img className="w-full transition duration-700 ease-in-out group-hover:opacity-60" src={image[0]} alt="image" />
        //             <div className="flex justify-center">
        //                 <div className="bottom-4 flex flex-row transition duration-500 ease-in-out opacity-0 group-hover:opacity-100">
        //                     <div>
        //                         <h1 className="text font-bold text-xl py-5">{props.dataQuizzes.title}</h1>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // <div className="md:w-1/2 lg:w-1/3 py-4 px-4" >
        //     <div onClick={moveToCollections}>
        //         <div className="bg-white relative shadow p-2 rounded-lg text-gray-800 hover:shadow-lg">

        //             <div className="flex justify-center">
        //                 <img src="https://cdn-brilio-net.akamaized.net/news/2020/06/24/187066/1255167-aplikasi-alquran-untuk-smartphone.png" className="rounded-full -mt-6 border-4 object-center object-cover border-white mr-2 h-16 w-16" alt="ayat alquran" />
        //             </div>
        //             <div className="py-2 px-2">
        //                 <div className=" font-bold font-title text-center">{props.dataQuizzes.title}</div>

        //                 <div className="text-sm font-light text-center my-2">{props.dataQuizzes.mode}</div>
        //             </div>
        //         </div>
        //     </div>
        // </div >
        // <div className="md:w-1/2 lg:w-1/2 py-4 px-4">
        <div onClick={moveToCollections} className=" ">
            <div className="bg-[#ffffff] shadow p-2 text-gray-800 hover:shadow-lg">
                <img src="https://d1ymz67w5raq8g.cloudfront.net/Pictures/480xany/6/5/5/509655_shutterstock_1506580442_769367.jpg" className="h-32 w-full object-cover" />

                <div className="py-2 px-2">
                    <div className=" font-bold font-title text-center">{props.dataQuizzes.title}</div>
                    <div className="text-sm font-light text-center my-2">{props.dataQuizzes.mode}</div>
                </div>
            </div>
        </div>
        // </div>
    )
}