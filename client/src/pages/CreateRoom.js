import React from "react";
import { v1 as uuid } from "uuid";

const CreateRoom = (props) => {
  function create() {
    const id = uuid();
    props.history.push(`/room/${id}`);
  }

  return (
    <div className="overflow-x-auto pt-14">
      <div className="min-w-screen min-h-[777px] bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full lg:w-5/6 max-w-[777px] pt-5">
          <div className="bg-white shadow-md rounded-lg my-6">

            <button onClick={create}>Create room</button>

          </div>
              
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
