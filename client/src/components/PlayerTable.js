

function PlayerTable({players}){
    return (
        <ul className="grid grid-cols-7">
          {players.map((player, i) => {
            return (
              <li key={2000 + i}>
                <div className="max-w-[350px] mx-4 flex flex-col justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /> </svg>
                  {player.playername.substring(0,7)}
                </div>
              </li>
            );
          })}
        </ul>
    )
}

export default PlayerTable