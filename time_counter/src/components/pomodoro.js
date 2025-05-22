import React, { useState, useEffect, useRef } from 'react';

function PomodoroTimer() {
  const workDuration = 20 * 60;   
  const shortBreak = 5 * 60;        
  const longBreak = 15 * 60;        

  const [seconds, setSeconds] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState('Work');
  const [sessionCount, setSessionCount] = useState(0);
  const [log, setLog] = useState([]);
  const intervalRef = useRef(null);

  // Chạy interval khi isRunning true
  useEffect(() => {
    if (isRunning && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning]);

  // Theo dõi seconds riêng, khi = 0 thì xử lý session end 1 lần duy nhất
  useEffect(() => {
    if (seconds === 0 && isRunning) {
      handleSessionEnd();
    }
  }, [seconds, isRunning]);

  const handleSessionEnd = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);

    const now = new Date().toLocaleTimeString();
    const newLog = {
      session: sessionType,
      time: now
    };
    setLog(prev => [newLog, ...prev]);

    alert(`✅ ${sessionType} session đã kết thúc!`);

    if (sessionType === 'Work') {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      setSessionType('Break');
      setSeconds(newCount % 4 === 0 ? longBreak : shortBreak);
    } else {
      setSessionType('Work');
      setSeconds(workDuration);
    }
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setSessionType('Work');
    setSeconds(workDuration);
    setSessionCount(0);
    setLog([]);
  };

  const formatTime = (totalSeconds) => {
    const min = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const sec = (totalSeconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div style={{ backgroundColor: '#ed8e8b', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>🍅 Pomodoro Timer</h1>
      <h2>{sessionType} Session</h2>
      <h3 style={{ fontSize: '48px' }}>{formatTime(seconds)}</h3>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleStart} disabled={isRunning}>▶ Start</button>
        <button onClick={handlePause} disabled={!isRunning}>⏸ Pause</button>
        <button onClick={handleReset}>🔁 Reset</button>
      </div>

      <h4>Lịch sử phiên:</h4>
      <ul>
        {log.map((entry, idx) => (
          <li key={idx}>
            [{entry.time}] ➤ {entry.session} kết thúc
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PomodoroTimer;
