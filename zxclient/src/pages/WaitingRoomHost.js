import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function WaitingRoom({ db }) {
  const [quizzes, setQuizzes] = useState({});
  let { idroom } = useParams();

  useEffect(() => {
    if (db) {
      const unsubcribe = db
        .collection("Quizzes")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));

          const choosenQuiz = data.find(({ roomkey }) => +roomkey === +idroom);

          //update state
          setQuizzes(choosenQuiz);
        });

      return unsubcribe;
    }
  }, [db]);

  return (
    <>
      <h1>Wating Room</h1>
      <h2>Peserta</h2>
      {Object.keys(quizzes).length > 0 ? (
        <ul>
            <li><h3>Brian</h3></li>
        </ul>
        
      ) : null}
      {Object.keys(quizzes).length > 0 ? (
        <div>
          {quizzes.questions.map((question, i) => {
            return (
              <div key={i}>
                <p>{`${i + 1}. ${question.question}`}</p>
                <ul>
                  {question.choose.map((choice, j) => {
                    return <li key={j}>{choice}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}

export default WaitingRoom;
