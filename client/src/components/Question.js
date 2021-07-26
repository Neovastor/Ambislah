import Choice from "./Choice";
import {useEffect,useState} from 'react'

function Question({question, i}){
    
    return (
        <div >
          <p>{`${i + 1}. ${question.question}`}</p>
          <ul>
            {question.choose.map((choice, j) => {                            
              return <Choice choice={choice} key={j}/>
            })}
          </ul>
        </div>
      );
}

export default Question