import React, { useState, useEffect } from 'react';

const RunningClock = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [status, setStatus] = useState('idle');

  // Optimized: only depend on status, not remainingSeconds
  // This prevents interval from being recreated every second
  useEffect(() => {
    if (status !== 'running') return;

    const intervalId = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [status]);

  // Separate effect to handle countdown completion
  useEffect(() => {
    if (status === 'running' && remainingSeconds === 0) {
      setStatus('idle');
    }
  }, [status, remainingSeconds]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStart = () => {
    const totalSeconds = Number(minutes) * 60 + Number(seconds);
    setRemainingSeconds(totalSeconds);
    setStatus('running');
  };

  const handlePauseResume = () => {
    if (status === 'running') {
      setStatus('paused');
    } else if (status === 'paused') {
      setStatus('running');
    }
  };

  const handleReset = () => {
    setMinutes(0);
    setSeconds(0);
    setRemainingSeconds(0);
    setStatus('idle');
  };

  return (
    <div>
      <label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />
        Seconds
      </label>
      <button onClick={handleStart}>START</button>
      <button onClick={handlePauseResume}>PAUSE / RESUME</button>
      <button onClick={handleReset}>RESET</button>
      <h1 data-testid="running-clock">{formatTime(remainingSeconds)}</h1>
    </div>
  );
};

export default RunningClock;
