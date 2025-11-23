import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Maximize2 } from 'lucide-react';
import { galleryImages, translations } from '../data/mockData';
import { useApp } from '../context/AppContext';

const Gallery = () => {
  const { language } = useApp();
  const t = translations[language];
  const [selectedId, setSelectedId] = useState(null);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slideshow Logic
  React.useEffect(() => {
    let interval;
    if (isSlideshow) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
        setSelectedId(galleryImages[(currentIndex + 1) % galleryImages.length]); // Keep selectedId in sync for view
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isSlideshow, currentIndex]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedId(galleryImages[index]);
    setIsSlideshow(false);
  };

  const closeLightbox = () => {
    setSelectedId(null);
    setIsSlideshow(false);
  };

  return (
    <section id="party-section" className="py-24 px-4 bg-white dark:bg-slate-900 transition-colors duration-500 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-2 font-display">
              {t.gallery}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Moments that matter ✨</p>
          </div>
          <button 
            onClick={() => {
                setIsSlideshow(true);
                setSelectedId(galleryImages[0]);
                setCurrentIndex(0);
            }}
            className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            <Play size={18} /> {t.playSlideshow}
          </button>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer ${
                index % 4 === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <img 
                src={img} 
                alt={`Memory ${index}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Maximize2 className="text-white drop-shadow-lg" size={32} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Slideshow Overlay */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
          >
            {/* Controls */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
               <div className="text-white/80 text-sm">
                 {currentIndex + 1} / {galleryImages.length}
               </div>
               <div className="flex gap-4">
                 <button 
                    onClick={() => setIsSlideshow(!isSlideshow)}
                    className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                 >
                    {isSlideshow ? <Pause size={24} /> : <Play size={24} />}
                 </button>
                 <button 
                    onClick={closeLightbox}
                    className="p-3 bg-white/10 rounded-full text-white hover:bg-red-500/80 transition-colors"
                 >
                    <X size={24} />
                 </button>
               </div>
            </div>

            {/* Image */}
            <motion.img
              key={currentIndex} // Key change triggers animation
              src={galleryImages[currentIndex]}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-md"
            />
            
            {/* Thumbnails */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] p-2">
                {galleryImages.map((img, idx) => (
                    <div 
                        key={idx}
                        onClick={() => {
                            setCurrentIndex(idx);
                            setSelectedId(img);
                            setIsSlideshow(false);
                        }}
                        className={`w-12 h-12 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${idx === currentIndex ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                        <img src={img} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
