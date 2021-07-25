import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faCheck } from '@fortawesome/free-solid-svg-icons';
import QuestionOflline from './QuestionOffline';
import AnswerLive from './AnswerLive'
import InputPin from './InputPin'
import WaitingRoom from './WaitingRoom';
import AddQuis from '../components/AddQuis'

export default function Create() {

    return (
        <>
            <section>
                <AddQuis />
            </section >
            <section>
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
            </section>
        </>
    )
}