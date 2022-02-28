import './App.css';
import React, { useState, useEffect } from 'react';
import moment from "moment";

const TICK_TIME = 150;;

function App() {
  

  let savedTick = parseInt(localStorage.getItem("tick") || TICK_TIME)
  const [seconds, setSeconds] = useState(savedTick);
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState('')
  const [time, setTime] = useState('')

 
    
  function toggle() {
    setIsActive(!isActive);
    setText('вы нажали на старт')

  }

  function stop() {
    setIsActive(false);
    setSeconds(TICK_TIME);
    setText('вы нажали на стоп')
    setTime( moment(seconds * 1000).format('mm:ss') )
  }

//  function onChange(evt) {
//   setSeconds({
//     savedTick: evt.target.value 
//   })
//  }
  
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
        
    <input value = { seconds.moment(seconds * 1000).format('mm:ss') }   >
    </input>
      
      </div>
      <div className="row">
        <button className="toggle" onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="stop" onClick={stop}>
          Stop
        </button>
      </div>
      <div>
        <h2> {text} </h2>
        <h3> {time} </h3>
      </div>
    </div>
  
  );
};

export default App;
