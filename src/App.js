import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import moment from "moment";

const TICK_TIME = 150;;

function App() {
  

  let savedTick = parseInt(localStorage.getItem("tick") || TICK_TIME)
  const [seconds, setSeconds] = useState(savedTick);
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState('')
  const [time, setTime] = useState([])
  const minutesInputRef = useRef()

  function setTimer() {
    if (minutesInputRef.current?.value !== "") {
      setSeconds(+minutesInputRef.current?.value * 60)
    } else {
      setSeconds(TICK_TIME)
    }
  }
 
    
  function toggle() {
    setIsActive(!isActive);
    setText( isActive ? 'вы нажали на паузу' : 'вы нажали на старт')
    

  }

  function stop() {
    setIsActive(false);
    setSeconds(TICK_TIME);
    setText('вы нажали на стоп')
    const result = [...time];
    result.unshift(moment(seconds * 1000).format('mm:ss'));
    setTime( result );
  
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
        

     {/* <input value={moment(seconds * 1000).format('mm:ss')}/>    */}
     {moment(seconds * 1000).format('mm:ss')}
      </div>
      <div>
        <input ref={minutesInputRef}
               style={{height: 30, width: 30, textAlign: "center", fontSize: 20}}/>
        <p> минуты</p>
      </div>
      <div className="row">
      <button className="stop" onClick={setTimer}>
          Set initial time
        </button>
        <button className="toggle" onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="stop" onClick={stop}>
          Stop
        </button>
      </div>
      <div>
        <h2> {text} </h2>
      </div>
      <div>
        {time.map((print, index) =>((<p style={{backgroundColor: index ===0 ? 'yellow' : 'grey' }} key={index}> {print} </p>))) }
      </div>
    </div>
  
  );
};

export default App;
