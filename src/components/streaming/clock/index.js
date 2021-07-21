import React, { useState, useEffect, useRef } from 'react';
import RadialAnimation from './radial-animation'

const Clock = () => {

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [milisTime, setMilisTime] = useState(0);

  const firstRender = useRef(true);

  const updateTimer = () => {
    const eventDate = new Date('Sep 11, 2020 09:15:00 GMT-0300');
    const today = new Date();
    const diffTime = Math.abs(eventDate - today);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    setDays(diffDays)
    const diffHours = Math.floor((diffTime / (1000 * 60 * 60)) - (diffDays * 24))
    setHours(diffHours)
    const diffMin = Math.floor(diffTime / (1000 * 60) - ((diffDays * 24 * 60) + (diffHours * 60)))
    setMinutes(diffMin);
    const diffSec = Math.floor(Math.floor(diffTime / (1000) - ((diffDays * 24 * 60 * 60) + (diffHours * 60 * 60) + (diffMin * 60))));
    setSeconds(diffSec);
    const diffMilis = Math.floor(diffTime - ((diffDays * 24 * 60 * 60 * 1000) + (diffHours * 60 * 60 * 1000) + (diffMin * 60 * 1000) + (diffSec * 1000)));
    setMilisTime(diffMilis);
  };

  useEffect(() => {
    if (firstRender.current) {
      updateTimer();
    }
    const interval = setInterval(updateTimer, 30);
    return function cleanup(){
      clearInterval(interval);
    }
  }, []);


  return (
    <div className="streaming__box">
      <div className="streaming__countdown">
        <div className="streaming__clock streaming__day">
          <div className="white-circle"></div>
          <RadialAnimation timePeriod="days" progress={days / 20 * 100} />
          <h2 className="timer">{days < 10 ? `0${days}` : days}</h2>
          <p>DÍAS</p>
        </div>
        <div className="streaming__clock streaming__hours">
          <div className="white-circle"></div>
          <RadialAnimation timePeriod="hours" progress={hours / 24 * 100} />
          <h2 className="timer">{hours < 10 ? `0${hours}` : hours}</h2>
          <p>HORAS</p>
        </div>
        <div className="streaming__clock streaming__minutes">
          <div className="white-circle"></div>
          <RadialAnimation timePeriod="minutes" progress={seconds / 60 * 100} />
          <h2 className="timer">{minutes < 10 ? `0${minutes}` : minutes}</h2>
          <p>MINUTOS</p>
        </div>
        <div className="streaming__clock streaming__seconds">
          <div className="white-circle"></div>
          <RadialAnimation timePeriod="seconds" progress={milisTime / 1000 * 100} />
          <h2 className="timer">{seconds < 10 ? `0${seconds}` : seconds}</h2>
          <p>SEGUNDOS</p>
        </div>
      </div>
    </div>
  );
};

export default Clock;
