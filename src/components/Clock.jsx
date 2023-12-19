import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clock = ({ selectedCountry }) => {
  const [time, setTime] = useState(new Date());
  const [isPaused, setIsPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState(null);

  useEffect(() => {
    let interval;

    const fetchTime = async () => {
      try {
        const response = await axios.get(`http://worldtimeapi.org/api/timezone/${selectedCountry}`);
        setTime(new Date(response.data.utc_datetime));
      } catch (error) {
        console.error(error);
      }
    };

    if (!isPaused) {
      fetchTime();

      interval = setInterval(() => {
        fetchTime();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPaused, selectedCountry]);

  const togglePause = () => {
    if (!isPaused) {
      setPausedTime(new Date());
    }

    setIsPaused(!isPaused);
  };

  useEffect(() => {
    if (pausedTime !== null && !isPaused) {
      // Resume from the paused time
      const timeDifference = new Date() - pausedTime;
      setPausedTime(null);
      setTime(new Date(time - timeDifference));
    }
  }, [isPaused, pausedTime]);

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <p>{time.toLocaleTimeString()}</p>
      <button className='button' style={{ backgroundColor: '#b6e7a7', color: '#000', height: '42px' }} onClick={togglePause}>
        {isPaused ? 'Start' : 'Pause'}
      </button>
    </div>
  );
};

export default Clock;
