import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [breakTime, setBreakTime] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [paused, setPaused] = useState(false);
  const [breakEnded, setBreakEnded] = useState(false);
  const alarmSound = new Audio(process.env.PUBLIC_URL + '/audio/alarm.wav');

useEffect(()=>{
    if(breakTime){
        alarmSound.play();
    }
},[breakTime])

  function startTask(selectedTask) {
    setTask(selectedTask);
    setIsTimerRunning(true);
  }

  useEffect(() => {
    if (isTimerRunning && !breakTime) {
      document.body.className = 'running';
    } else if (breakTime) {
      document.body.className = 'breaking';
    } else {
      document.body.className = 'starting';
    }
  }, [isTimerRunning, breakTime]);


  function reset() {
    setIsTimerRunning(false);
    setBreakTime(false);
    setMinutes(25);
    setSeconds(0);
    setCycles(0);
    setTask("");
    setPaused(false);
    setBreakEnded(false);
  }

  function togglePause() {
    setPaused(!paused);
  }

  function continueTimer() {
    setIsTimerRunning(true);
    setBreakTime(false);
    setBreakEnded(false);
    setMinutes(25);
    setSeconds(0);
  }

  useEffect(() => {
    let timer;
    if (isTimerRunning && !paused) {
      timer = setTimeout(() => {
        if (seconds > 0) setSeconds(seconds - 1);
        else {
          if (minutes === 0) {
            if (!breakTime) {
              setBreakTime(true);
              setMinutes(8);
              setCycles(cycles + 1);
            } else {
              setBreakEnded(true);
              setIsTimerRunning(false);
            }
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [isTimerRunning, minutes, seconds, breakTime, paused]);

  return (
    <div className="App">
      {!isTimerRunning && !breakTime && !breakEnded ? (
        <>
        <div>
            <h2 className="title">Pomodoro Timer </h2>
            <h4 className="name">By Will Yao </h4>
          <button className='tasks' onClick={() => startTask("Coding")}>Coding</button>
          <button className='tasks' onClick={() => startTask("Working")}>Working</button>
          <button className='tasks' onClick={() => startTask("Studying")}>Studying</button>
        </div>
      <div>
      <img src={process.env.PUBLIC_URL + '/image/tomato.png'} alt='Tomato' className="responsive-tomato"/>
 {/* 使用了img标签并指定了正确的src路径 */}
    </div>
    <footer className="footer">
      © All rights reserved by Will Yao, 2023
        </footer>
    </>
      ) : (
        <div>
          <h2 className={` ${breakTime ? "break-color" : "task-ongoing"}`}>
            {breakTime?"Break Time :)":task.toUpperCase()}
        </h2>
          <h1 className={` ${breakTime ? "break-timer" : "timer"}`}>
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </h1>
          {breakEnded ? (
            <div>
              <button className="end" onClick={reset}>Return to Main</button>
              <button className="end" onClick={continueTimer}>Start Next Cycle</button>
            </div>
          ) : null}
          {(isTimerRunning || breakTime) && !breakEnded && (
            <>
            <button className={` ${breakTime ? "break-button" : "buttons"}`} onClick={togglePause}>
              {paused ? "Continue" : "Pause"}
            </button>
            <button className={` ${breakTime ? "break-button" : "buttons"}`} onClick={reset}>Cancel</button>
            </>
          )}
          <div>
             {isTimerRunning && !breakTime && !breakEnded && (
            <img src={process.env.PUBLIC_URL + '/image/tomato2.png'} alt='Image 2' className="responsive-tomato"/>
            )}
            {(breakTime || breakEnded) && (
            <img src={process.env.PUBLIC_URL + '/image/tomato3.png'} alt='Image 3' className="responsive-tomato"/>
            )}
            </div>
            <footer className={` ${breakTime ? "break-footer" : "footer2"}`}>
      © All rights reserved by Will Yao, 2023
        </footer>
        </div>
      )}
    </div>
  );
}

export default App;
