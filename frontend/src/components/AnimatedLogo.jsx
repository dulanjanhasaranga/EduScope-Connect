import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Feather } from 'lucide-react';

export default function AnimatedLogo() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Only play the 4-second intro once per session
    const hasPlayed = sessionStorage.getItem('hasPlayedLogoIntro');
    if (hasPlayed) {
      setIsInitialLoad(false);
    } else {
      sessionStorage.setItem('hasPlayedLogoIntro', 'true');
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <motion.div 
      className="flex items-center group"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.div 
        className="relative flex items-center justify-center flex-shrink-0"
        initial={isInitialLoad ? { scale: 2, x: 40 } : { scale: 1, x: 0 }}
        animate={isInitialLoad ? { 
          scale: [2, 2, 1], 
          x: [40, 40, 0],
        } : { scale: 1, x: 0 }}
        transition={isInitialLoad ? { 
          duration: 4, 
          times: [0, 0.6, 1],
          ease: "easeInOut" 
        } : { duration: 0.3 }}
        variants={{
          hover: { scale: 1.15, rotateY: 180, transition: { type: "spring", stiffness: 300, damping: 20 } },
          tap: { scale: 0.9 }
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* The Book & Feather combo representing "EDUCATION CREATIVE" */}
        <BookOpen className="h-8 w-8 text-[#8b6f52] transition-colors duration-300" />
        <motion.div 
          className="absolute -translate-y-1.5"
          variants={{
            hover: { y: -8, rotateZ: 15, scale: 1.2 }
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Feather className="h-5 w-5 text-[#cda77b] transition-colors duration-300" />
        </motion.div>
      </motion.div>

      <motion.span 
        className="text-xl font-bold text-gray-900 tracking-tight ml-2 overflow-hidden whitespace-nowrap transition-colors duration-300 group-hover:text-primary-600"
        initial={isInitialLoad ? { opacity: 0, width: 0 } : { opacity: 1, width: 'auto' }}
        animate={isInitialLoad ? { 
          opacity: [0, 0, 1], 
          width: [0, 0, 120] 
        } : { opacity: 1, width: 'auto' }}
        transition={isInitialLoad ? { 
          duration: 4, 
          times: [0, 0.7, 1], 
          ease: "easeInOut" 
        } : { duration: 0.3 }}
      >
        EduConnect
      </motion.span>
    </motion.div>
  );
}
