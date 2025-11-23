import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import SpecialWishCard from './components/SpecialWishCard';
import Footer from './components/Footer';
import FloatingHearts from './components/FloatingHearts';
import { motion, AnimatePresence } from 'framer-motion';

const MainContent = () => {
  const { partyStarted } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-pink-200 dark:selection:bg-purple-900 overflow-x-hidden">
      {/* Global Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 transition-colors duration-1000" />
         <FloatingHearts />
      </div>

      <Header />
      
      <main className="relative z-10">
        <Hero />
        
        {/* Sections Revealed after Party Starts */}
        <AnimatePresence>
            {partyStarted && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Gallery />
                    <SpecialWishCard />
                    <Footer />
                </motion.div>
            )}
        </AnimatePresence>
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
