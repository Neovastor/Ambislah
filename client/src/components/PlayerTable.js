

function PlayerTable({players}){
    return (
        <ul className="list-disc">
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