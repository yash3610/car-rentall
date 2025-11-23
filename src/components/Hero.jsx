import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Edit2, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/mockData';
import CountdownTimer from './CountdownTimer';
import { playConfettiSound } from '../utils/sound';

const Hero = () => {
  const { language, birthdayPerson, setBirthdayPerson, setPartyStarted, partyStarted, setIsMusicPlaying } = useApp();  // ✅ setIsMusicPlaying add kela
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(birthdayPerson);
  const t = translations[language];

  // Typing effect state
  const [displayedText, setDisplayedText] = useState('');
  const fullText = t.heroParagraph;

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(prev => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 40);
    return () => clearInterval(typing);
  }, [language, fullText]);

  const handleStartParty = () => {
    playConfettiSound();
    setPartyStarted(true);
    setIsMusicPlaying(true);  // ✅ Music ON kara jeva Start Party dabla
    
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

  const saveName = () => {
    setBirthdayPerson(tempName);
    setIsEditing(false);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-10">
      <div className="z-10 text-center w-full max-w-4xl flex flex-col items-center justify-center min-h-[80vh]">
        
        {/* Name Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-xl md:text-2xl text-pink-200 font-medium tracking-widest uppercase mb-2">
            Happy Birthday
          </div>
          
          <div className="flex items-center justify-center gap-3">
            {isEditing ? (
              <div className="flex items-center bg-white/20 backdrop-blur rounded-lg p-2">
                <input 
                  type="text" 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="bg-transparent text-4xl md:text-6xl font-extrabold text-white text-center outline-none w-full max-w-[400px]"
                  autoFocus
                />
                <button onClick={saveName} className="p-2 text-white hover:bg-white/20 rounded-full">
                  <Check size={24} />
                </button>
              </div>
            ) : (
              <div className="group relative inline-block">
                <h1 className="text-5xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-yellow-200 drop-shadow-lg cursor-pointer leading-tight py-2" onClick={() => setIsEditing(true)}>
                  {birthdayPerson}
                </h1>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-white/70 transition-opacity p-2"
                >
                  <Edit2 size={20} />
                </button>
              </div>
            )}
          </div>
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