function Choice({ choice }) {
  return (
    <div className="flex">
      <button className="h-20 rounded-lg p-2 bg-red-500 hover:bg-red-600 w-screen text-gray-200">
        {choice}
      </button>
    </div>
  );
}

export default Choice;

{
  /* <button className="btn btn-primary mx-3" >{choice}</button>; */
}
