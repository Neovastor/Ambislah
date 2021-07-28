function Choice({ choice }) {
  return (
    <div className="relative">
      <img className="top-0 object-fill" src="/mil-but.png" alt=".." /> 
      <button className="absolute top-0 h-11 rounded-lg p-2 transform translate-x-[100px] translate-y-[25px] text-xl bg-transparant hover:bg-red-600 text-gray-200"> {choice} </button>
    </div>
    // <div className="flex">
    //   <button className="h-20 rounded-lg p-2 bg-red-500 hover:bg-red-600 w-screen text-gray-200">
    //     {choice}
    //   </button>
    // </div>
  );
}

export default Choice;

