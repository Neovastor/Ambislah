import { CountdownCircleTimer } from "react-countdown-circle-timer";


function CircleTimer({duration}){
    return (
      //   <CountdownCircleTimer
      //   isPlaying
      //   size={30}
      //   duration={duration}
      //   colors={[
      //     ["#004777", 0.33],
      //     ["#F7B801", 0.33],
      //     ["#A30000", 0.33],
      //   ]}
      // >
      //   {({ remainingTime }) => remainingTime}
      // </CountdownCircleTimer>
      <CountdownCircleTimer
      isPlaying
      duration={duration}
      size={49}
      strokeWidth={7}
      colors={[
        ['#10B981', 0.25],
        ['#F59E0B', 0.25],
        ['#B91C1C', 0.25],
      ]}
    >
      {({ remainingTime, animatedColor }) => (
        remainingTime === 0
        ? <h1 className="text">!</h1>
        : <h1 className="text">{ remainingTime }</h1>
      )}
  </CountdownCircleTimer>
    )
}

export default CircleTimer