import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

export default function CardQuiz(props) {
    // console.log(props);
    return (
        <div className=" ">
            <a href="#">
                <div className="bg-white shadow p-2 rounded-lg text-gray-800 hover:shadow-lg">
                    {/* <img src={"https://asset.kompas.com/crops/sn--2PkUfeAmtszsB-wnqXmwBkM=/0x0:5184x3456/750x500/data/photo/2020/12/11/5fd303549b2c9.jpg"} className="h-32 rounded-lg w-full object-cover" /> */}
                    <div>
                        <FontAwesomeIcon size="2x" icon={faBookOpen} />
                    </div>
                    <div className="py-2 px-2">
                        <div className=" font-bold font-title text-center">{props.dataQuizzes.title}</div>
                        <div className="text-sm font-light text-center my-2">{props.dataQuizzes.mode}</div>
                    </div>
                </div>
            </a>
        </div>
    )
}