import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { translations } from '../data/mockData';
import CountdownTimer from './CountdownTimer';
import { playConfettiSound } from '../utils/sound';

const Hero = () => {
  const { language, setPartyStarted, partyStarted, setIsMusicPlaying } = useApp();
  const t = translations[language];

  // Typing effect state
  const [displayedText, setDisplayedText] = useState('');
  const fullText = t.heroParagraph;

  useEffect(() => {
    // Reset displayed text
    setDisplayedText('');
    
    let i = 0;
    let isMounted = true;
    
    const typing = setInterval(() => {
      if (i < fullText.length && isMounted) {
        setDisplayedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 40);
    
    return () => {
      isMounted = false;
      clearInterval(typing);
    };
  }, [fullText]);

  const handleStartParty = () => {
    playConfettiSound();
    setPartyStarted(true);
    setIsMusicPlaying(true);
    
    // Cannon confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Smooth scroll to party section
    setTimeout(() => {
        const partySection = document.getElementById('party-section');
        if (partySection) {
            partySection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 500);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-10">
      <div className="z-10 text-center w-full max-w-4xl flex flex-col items-center justify-center min-h-[80vh]">
        
        {/* Name Section - Fixed "Tanvi" */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-xl md:text-2xl text-pink-200 font-medium tracking-widest uppercase mb-2">
            Happy Birthday
          </div>
          
          <h1 className="text-5xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-yellow-200 drop-shadow-lg leading-tight py-2">
            Tanvi
          </h1>
        </motion.div>

        {/* Emotional Paragraph */}
        <div className="min-h-[150px] md:min-h-[120px] mb-10 max-w-2xl mx-auto">
          <p className="text-lg md:text-2xl text-white/90 font-light leading-relaxed drop-shadow-md font-display">
            {displayedText}<span className="animate-pulse text-pink-300">|</span>
          </p>
        </div>

        {/* CTA Button */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            {!partyStarted && (
                <motion.button
                    whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(255, 105, 180, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartParty}
                    className="px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold text-2xl shadow-xl hover:shadow-2xl transition-all border-4 border-white/20 backdrop-blur-sm"
                >
                    {t.celebrate}
                </motion.button>
            )}
        </motion.div>

        {/* Countdown */}
        <div className="mt-12 opacity-80 hover:opacity-100 transition-opacity">
             <CountdownTimer targetDate="2025-12-31T00:00:00" />
        </div>
      </div>

      {/* Scroll Indicator if party started */}
      {partyStarted && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 text-white/70 flex flex-col items-center"
        >
            <span className="text-sm mb-2">{t.scrollDown}</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
            </div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;