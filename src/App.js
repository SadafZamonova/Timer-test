import './App.css';
import React, { useState, useEffect } from 'react';



function App() {
  
    const [seconds, setSeconds] = useState(5);
    const [isActive, setIsActive] = useState(false);
  
    function toggle() {
      setIsActive(!isActive);
    }
  
    function stop() {
      setSeconds(5);
      setIsActive(false);
    }
  
    useEffect(() => {
      let interval = null;
      if (isActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds - 1);
        }, 1000);
      } else if  (setSeconds === 0)  {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isActive, seconds]);
  

    
    return (
      <div className="app">
        <div className="time">
          {seconds}
        </div>
        <div className="row">
          <button  className="toggle" onClick={toggle}>
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
