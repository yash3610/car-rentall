import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random().toString(36).substr(2, 9);
      const left = Math.random() * 100; // Random horizontal position
      const size = Math.random() * 20 + 10; // Random size
      const duration = Math.random() * 5 + 5; // Random duration

      setHearts(prev => [...prev, { id, left, size, duration }]);

      // Cleanup old hearts
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id));
      }, duration * 1000);
    }, 800); // Spawn rate

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 1, 0] }}
          transition={{ duration: heart.duration, ease: "linear" }}
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            color: `rgba(255, 105, 180, ${Math.random() * 0.5 + 0.2})`, // Random pink opacity
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
