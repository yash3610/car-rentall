import React from 'react';
import { Facebook, Twitter, Instagram, Link as LinkIcon, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/mockData';

const Footer = () => {
  const { language } = useApp();
  const t = translations[language];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Birthday Celebration!',
        text: 'Join me in celebrating this special day!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 print:hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Celebration 2025</h3>
          <p className="text-gray-400 text-sm">Made with ❤️ for a special day.</p>
        </div>

        <div className="flex gap-6">
          <button onClick={handleShare} className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors" aria-label="Share">
            <LinkIcon size={20} />
          </button>
          <button className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors" aria-label="Facebook">
            <Facebook size={20} />
          </button>
          <button className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
           <button 
             onClick={handlePrint}
             className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors text-sm"
           >
             <Download size={16} /> {t.downloadCard}
           </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
