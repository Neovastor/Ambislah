
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

function PausePhaseHost({nextClickHandler}){
    return (
        <div className="pt-12 md-max:flex md-max:flex-col-reverse">
        <div className="my-2 p-2 col-span-7 min-h-screen"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02)), url(/man-thinking.gif)",
        }}
        >
          <div className="flex justify-between">
            <div className=" p-3 rounded-lg">

            </div>
            <div className=" p-3 rounded-lg">
            </div>
            <button 
            onClick={(e) => nextClickHandler(e)}
            className="hover:bg-red-600 text-black hover:text-white p-3 rounded-lg">
              <FontAwesomeIcon
                size="2x"
                icon={faChevronCircleRight}
              ></FontAwesomeIcon>
            </button>
          </div>
          <div className="flex flex-col gap-y-4 items-center p-5">
            <div className="w-full px-4 py-2 border border-gray-300 bg-white rounded  text-center">
              Pause Phase
            </div>
    
            
          </div>
        </div>
      </div>
    )
}

export default PausePhaseHost