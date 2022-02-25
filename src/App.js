import './App.css';
import React, { useState, useEffect } from 'react';

const TICK_TIME = 5;

function App() {
  let savedTick = parseInt(localStorage.getItem("tick") || TICK_TIME)
  const [seconds, setSeconds] = useState(savedTick);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function stop() {
    setIsActive(false);
    setSeconds(TICK_TIME);
  }

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);

      if (seconds === 0) {
        stop()
      }
    } else {
      clearInterval(interval);
    }

    localStorage.setItem("tick", seconds.toString())

    return () => clearInterval(interval)
  }, [isActive, seconds]);


  return (
    <div className="app">
      <div className="time">
        {seconds}
      </div>
      <div className="row">
        <button className="toggle" onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="stop" onClick={stop}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default App;
