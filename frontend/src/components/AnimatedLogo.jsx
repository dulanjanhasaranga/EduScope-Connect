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
    <div className="flex items-center">
      <motion.div 
        className="relative flex items-center justify-center flex-shrink-0"
        initial={isInitialLoad ? { scale: 2, x: 40 } : { scale: 1, x: 0 }}
        animate={isInitialLoad ? { 
          scale: [2, 2, 1], 
          x: [40, 40, 0],
        } : { scale: 1, x: 0 }}
        transition={isInitialLoad ? { 
          duration: 4, 
          times: [0, 0.6, 1], // Stays big/cropped for 60% of the 4 seconds (2.4s), then scales down
          ease: "easeInOut" 
        } : { duration: 0.3 }}
      >
        {/* The Book & Feather combo representing "EDUCATION CREATIVE" */}
        <BookOpen className="h-8 w-8 text-[#8b6f52]" />
        <Feather className="h-5 w-5 text-[#cda77b] absolute -translate-y-1.5" />
      </motion.div>

      <motion.span 
        className="text-xl font-bold text-gray-900 tracking-tight ml-2 overflow-hidden whitespace-nowrap"
        initial={isInitialLoad ? { opacity: 0, width: 0 } : { opacity: 1, width: 'auto' }}
        animate={isInitialLoad ? { 
          opacity: [0, 0, 1], 
          width: [0, 0, 120] 
        } : { opacity: 1, width: 'auto' }}
        transition={isInitialLoad ? { 
          duration: 4, 
          times: [0, 0.7, 1], // Text stays hidden until the logo starts moving back
          ease: "easeInOut" 
        } : { duration: 0.3 }}
      >
        EduConnect
      </motion.span>
    </div>
  );
}
