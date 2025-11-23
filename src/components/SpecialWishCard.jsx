import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/mockData';

const SpecialWishCard = () => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <section className="py-32 px-4 relative overflow-hidden flex items-center justify-center min-h-[80vh]">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-pink-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, type: "spring", bounce: 0.3 }}
        className="relative z-10 max-w-3xl w-full"
      >
        {/* The Card */}
        <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-[3rem] p-8 md:p-16 shadow-[0_0_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_60px_-15px_rgba(255,255,255,0.05)] overflow-hidden group">
          
          {/* Card Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -translate-x-full group-hover:translate-x-full" style={{ transitionDuration: '1.5s' }} />

          {/* Decorative Icons */}
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute top-8 right-8 text-yellow-400/80"
          >
            <Star size={40} fill="currentColor" />
          </motion.div>
          
          <div className="absolute bottom-8 left-8 text-pink-400/80">
            <Sparkles size={32} />
          </div>

          {/* Content */}
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white shadow-lg mb-8">
                <Heart size={24} fill="currentColor" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 dark:from-white dark:via-pink-200 dark:to-white font-display mb-8 tracking-tight">
                {t.specialWishTitle}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="relative"
            >
              <QuoteIcon className="absolute -top-6 -left-4 text-pink-200 dark:text-pink-900/30 w-16 h-16 transform -scale-x-100" />
              
              <p className="text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-200 font-serif italic opacity-90">
                {t.specialWishText}
              </p>
              
              <QuoteIcon className="absolute -bottom-6 -right-4 text-purple-200 dark:text-purple-900/30 w-16 h-16" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-12 pt-8 border-t border-gray-200/50 dark:border-white/10"
            >
              <p className="text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest text-sm mb-2">
                {t.specialWishSignature}
              </p>
              <div className="font-handwriting text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 font-bold transform -rotate-2">
                yash
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Simple SVG Quote Icon component for internal use
const QuoteIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
  </svg>
);

export default SpecialWishCard;
