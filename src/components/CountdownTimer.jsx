import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/mockData';

const CountdownTimer = () => {
  const { language } = useApp();
  const t = translations[language];
  
  // Automatically set target date to 29th November 2025
  const targetDate = new Date('2025-11-29T00:00:00');
  
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
        // If date passed, just show 0 or reset for next year
        timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl md:text-4xl font-bold text-white shadow-lg border border-white/30">
        {value || '0'}
      </div>
      <span className="text-sm text-white/90 mt-2 font-medium uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center mt-8">
      <TimeUnit value={timeLeft.days} label={t.days} />
      <TimeUnit value={timeLeft.hours} label={t.hours} />
      <TimeUnit value={timeLeft.minutes} label={t.minutes} />
      <TimeUnit value={timeLeft.seconds} label={t.seconds} />
    </div>
  );
};

export default CountdownTimer;