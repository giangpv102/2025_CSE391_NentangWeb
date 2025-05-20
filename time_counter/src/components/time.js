import React, { useState, useEffect, useRef } from "react";

function Time() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
},[isRunning]);
    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleReset = () => {
      setIsRunning(false);
      setSeconds(0);
    };
    return (
        <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h2>⏱ Timer: {seconds}s</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={handleStart} disabled={isRunning}>▶️ Start</button>
        <button onClick={handlePause} disabled={!isRunning}>⏸ Pause</button>
        <button onClick={handleReset}>🔁 Reset</button>
      </div>
    </div>
    );
}

export default Time;
