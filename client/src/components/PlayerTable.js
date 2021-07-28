

function PlayerTable({players}){
    return (
        <ul className="grid grid-cols-7">
          {players.map((player, i) => {
            return (
              <li key={2000 + i}>
                <h3>{player.playername}</h3>
              </li>
            );
          })}
        </ul>
    )
}

export default PlayerTable