import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faCheck } from '@fortawesome/free-solid-svg-icons';
import QuestionOflline from './QuestionOffline';
import AnswerLive from './AnswerLive'
import InputPin from './InputPin'
import WaitingRoom from './WaitingRoom';
import CreatedQuiz from '../components/CreatedQuiz'
import { useReactiveVar } from '@apollo/client'
import { showPageVar } from '../graphql/vars'
import FormQuestions from '../components/FormQuestions'

export default function Create() {

    const showPage = useReactiveVar(showPageVar)
    console.log(showPage, 'ini page>>>>>>>>>>');
    return (
        <>
            <section>
                {
                    showPage === "createQuiz" && <CreatedQuiz />
                }
            </section>
            <section>
                {
                    showPage === "formQuestions" && <FormQuestions />
                }
            </section >
            {/* <section>
                <QuestionOflline />
            </section>
            <section>
                <AnswerLive />
            </section>
            <section>
                <InputPin />
            </section>
            <section>
                <WaitingRoom />
            </section> */}
        </>
    )
}