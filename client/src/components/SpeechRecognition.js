import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
export default function SpeechToText({inputVoice}) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();





  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  return (
    <>
      <div className="text-center text-white font-bold text-4xl">
        <p>Microphone: {listening ? "on" : "off"}</p>
        <input
          placeholder=""
          value={transcript}
          className="rounded p-1 my-2 text-center"
        />
        {!listening ? (
          <>
            <div>
              <button
                className="rounded-lg p-5 bg-green-500 hover:bg-green-600 text-white"
                onClick={SpeechRecognition.startListening}
              >
                <FontAwesomeIcon size="2x" icon={faMicrophone} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <button
                className="rounded-lg p-5 bg-red-500 hover:bg-red-600 text-white"
                onClick={SpeechRecognition.stopListening}
              >
                <FontAwesomeIcon size="2x" icon={faMicrophone} />
              </button>
            </div>
          </>
        )}
        <button className="rounded p-2 my-2 text-center text-xl font-bold text-black bg-white" onClick={() => inputVoice(transcript)}>submit</button>

        {/* <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button> */}
        {/* <button onClick={() => voiceover()}>test</button> */}
      </div>
    </>
  );
}
