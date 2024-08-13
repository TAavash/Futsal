import React, { useState, useEffect } from 'react';

function Timer() {
    const [time, setTime] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    const seconds = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
  
    return (
      <>
        <div className="flex flex-col justify-center items-center h-[500px] bg-blue-300">
          <h1 className="text-3xl">Timer</h1> <br />
          <h2 className="border-2 p-2 bg-white">
            {hours}:{minutes}:{seconds}
          </h2>
        </div>
      </>
    );
  };
  

export default Timer;
