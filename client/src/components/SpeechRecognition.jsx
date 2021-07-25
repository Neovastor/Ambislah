import Swal from 'sweetalert2'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { faVolumeUp, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SpeechToText(params) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
    <div className="text-center">
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <input placeholder="" value={transcript}  className="rounded p-1 my-2 text-center" />
        {
          !listening
          ? <>
          <div>
              <button className="rounded-lg p-5 bg-green-500 hover:bg-green-600 text-white"  onClick={SpeechRecognition.startListening}>
                  <FontAwesomeIcon size='2x' icon={faMicrophone} />
              </button>
          </div>
          </>
          : <>
          <div>
              <button className="rounded-lg p-5 bg-red-500 hover:bg-red-600 text-white" onClick={SpeechRecognition.stopListening}>
                  <FontAwesomeIcon size='2x' icon={faMicrophone} />
              </button>
          </div>
          </>

        }
        {/* <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button> */}
    </div>
    </>
  ) 
}

