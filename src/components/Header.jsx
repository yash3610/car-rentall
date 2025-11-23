import React, { useEffect, useRef } from 'react';
import { Moon, Sun, Languages, Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../context/AppContext';
import birthdayMusic from '../assets/birthday-song.mp3';  // ⬅️ Path changed

const Header = () => {
  const { 
    language, toggleLanguage, 
    darkMode, toggleTheme, 
    isMusicPlaying, setIsMusicPlaying 
  } = useApp();
  
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      if (isMusicPlaying) {
        audioRef.current.play().catch(e => {
            console.log("Autoplay blocked", e);
            setIsMusicPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying, setIsMusicPlaying]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center pointer-events-none">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop>
        <source src={birthdayMusic} type="audio/mpeg" />
      </audio>

      <div className="pointer-events-auto flex gap-3 ml-auto">
        <button 
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all shadow-lg"
          aria-label="Toggle Music"
        >
          {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        <button 
          onClick={toggleLanguage}
          className="px-3 py-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all shadow-lg font-bold text-sm flex items-center gap-1"
          aria-label="Toggle Language"
        >
          <Languages size={16} /> {language === 'en' ? 'MR' : 'EN'}
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all shadow-lg"
          aria-label="Toggle Theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;