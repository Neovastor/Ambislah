import React from 'react'
import { useHistory } from 'react-router-dom';
import { collectionVar } from '../graphql/vars'

export default function CardQuiz(props) {
    // console.log(props);
    const history = useHistory()

    const moveToCollections = () => {
        collectionVar(props)
        history.push('/collections')
    }

    return (
        <div className=" ">
            <button onClick={moveToCollections}>
                <div className="bg-[#3D84B8] shadow p-2 rounded-lg text-white hover:shadow-2xl">
                    <img src={"https://cdn.dribbble.com/users/201599/screenshots/1545461/book.jpg?compress=1&resize=400x300"} className="h-32 rounded-lg w-full object-cover" />
                    {/* <div>
                        <FontAwesomeIcon size="2x" icon={faBookOpen} />
                    </div> */}
                    <div className="py-2 px-2">
                        <div className=" font-bold font-title text-center">{props.dataQuizzes.title}</div>
                        <div className="text-sm font-light text-center my-2">{props.dataQuizzes.mode}</div>
                    </div>

                </div>
            </button>
        </div>
    )
}