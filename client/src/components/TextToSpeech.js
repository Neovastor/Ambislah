import TTS from 'text-to-speech-offline'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

export default function TextToSpeech ({text}) {
<button onClick={() => TTS("Apa kabar?")}> Speak </button>
    const voiceOver = (text) => {
        return TTS (text, 'en-US', 2, .65, .95)
    }
    useEffect(()=>{
        voiceOver(text)
    },[])
    return (
        <>
        <button className="hover:bg-red-600 text-black hover:text-white p-3 rounded-lg" onClick={() => voiceOver(text) }>
            <FontAwesomeIcon size='2x' icon={faVolumeUp}></FontAwesomeIcon>
        </button>
        </>
    )
}