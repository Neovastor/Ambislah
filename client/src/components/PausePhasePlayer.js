
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

function PausePhasePlayer(){
    return (
        <div className="pt-12 md-max:flex md-max:flex-col-reverse">
        <div className="my-2 p-2 col-span-7 min-h-screen"
        style={{
          "backgroundImage":
            "linear-gradient(rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02)), url(/man-thinking.gif)",
          "background-size": "100% 100%"
        }}
        >
          <div className="flex justify-between">
            <div className=" p-3 rounded-lg">

            </div>
            <div className=" p-3 rounded-lg">
            </div>
          </div>
          <div className="flex flex-col gap-y-4 items-center p-5">
            <div className="w-full px-4 py-2 border-gray-300 text-white font-extrabold text-7xl rounded  text-center">
              Pause Phase
            </div>
    
            
          </div>
        </div>
      </div>
    )
}

export default PausePhasePlayer