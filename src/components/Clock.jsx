import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clock = ({ selectedCountry }) => {
  const [timeSec, setTimeSec] = useState(-1);
  const [isPaused, setIsPaused] = useState(true);

  function getTimeComponents(dateTimeString) {
    if (dateTimeString === undefined) return -1;
    console.log('dateTimeString: ', dateTimeString);
    const timeString = dateTimeString.substring(11, 19);
    return (
      (parseInt(timeString.substring(0, 2)) * 3600 +
        parseInt(timeString.substring(3, 5)) * 60 +
        parseInt(timeString.substring(6, 8))) %
      86400
    );
  }
  const fetchTime = async () => {
    try {
      const response = await axios.get(
        `http://worldtimeapi.org/api/timezone/${selectedCountry}`
      );
      // console.log('resp: ', response.data);
      // console.log('new time : ', response.data.datetime);
      setTimeSec(getTimeComponents(response.data.datetime));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTime();
  }, [selectedCountry]);

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setTimeSec((timeSec + 1) % 86400);
      }, 1000);
    }

    return () => clearInterval(interval); // Clear interval on unmount
  }, [isPaused, timeSec]);

  const togglePause = () => {
   
    setIsPaused(!isPaused);
  };


  function formatTime() {
    if (timeSec === -1) {
      return 'Clock Display Here';
    }
    const formattedHours = Math.floor(timeSec / 3600);
    const formattedMinutes = Math.floor((timeSec % 3600) / 60);
    const formattedSeconds = timeSec % 60;
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <p>{formatTime()}</p>
      <button
        className="button"
        style={{ backgroundColor: '#b6e7a7', color: '#000', height: '42px' }}
        onClick={togglePause}
      >
        {isPaused ? 'Start' : 'Pause'}
      </button>
    </div>
  );
};

export default Clock;
