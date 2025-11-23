import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialWishes } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Language State
  const [language, setLanguage] = useState('en');

  // Theme State
  const [darkMode, setDarkMode] = useState(false);

  // Flow State
  const [partyStarted, setPartyStarted] = useState(false);

  // Data State
  const [wishes, setWishes] = useState(() => {
    const saved = localStorage.getItem('birthday_wishes');
    return saved ? JSON.parse(saved) : initialWishes;
  });

  const [birthdayPerson, setBirthdayPerson] = useState(() => {
    return localStorage.getItem('birthday_person') || "Friend";
  });

  // Audio State
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    localStorage.setItem('birthday_wishes', JSON.stringify(wishes));
  }, [wishes]);

  useEffect(() => {
    localStorage.setItem('birthday_person', birthdayPerson);
  }, [birthdayPerson]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addWish = (wish) => {
    setWishes([wish, ...wishes]);
  };

  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'mr' : 'en');
  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <AppContext.Provider value={{
      language,
      toggleLanguage,
      darkMode,
      toggleTheme,
      wishes,
      addWish,
      birthdayPerson,
      setBirthdayPerson,
      isMusicPlaying,
      setIsMusicPlaying,
      partyStarted,
      setPartyStarted
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
