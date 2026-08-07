import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Feather } from 'lucide-react';

export default function AnimatedLogo({ isNavigating }) {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
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
      className="flex items-center group relative"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.div 
        className="relative flex items-center justify-center flex-shrink-0 z-10"
        initial={isInitialLoad ? { scale: 2, x: 40 } : { scale: 1, x: 0 }}
        animate={
          isNavigating ? {
            rotateY: [0, -180, -360],
            scale: [1, 1.3, 1],
            transition: { duration: 0.8, ease: "easeInOut" }
          } : isInitialLoad ? { 
            scale: [2, 2, 1], 
            x: [40, 40, 0],
            transition: { duration: 4, times: [0, 0.6, 1], ease: "easeInOut" }
          } : { scale: 1, x: 0 }
        }
        variants={{
          hover: { scale: 1.15, rotateY: 15, transition: { type: "spring", stiffness: 300, damping: 20 } },
          tap: { scale: 0.9 }
        }}
        style={{ transformStyle: "preserve-3d", transformOrigin: "left center" }}
      >
        <BookOpen className={`h-8 w-8 transition-colors duration-300 ${isNavigating ? 'text-blue-600' : 'text-[#8b6f52]'}`} />
        <motion.div 
          className="absolute -translate-y-1.5"
          variants={{
            hover: { y: -8, rotateZ: 15, scale: 1.2 }
          }}
          animate={isNavigating ? { y: -15, rotateZ: 45, opacity: 0 } : { y: -6, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Feather className="h-5 w-5 text-[#cda77b] transition-colors duration-300" />
        </motion.div>
        
        {/* Magic sparkles when navigating */}
        <AnimatePresence>
          {isNavigating && (
            <motion.div 
              initial={{ opacity: 1, scale: 0 }}
              animate={{ opacity: 0, scale: 2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-blue-400 rounded-full blur-md -z-10"
            />
          )}
        </AnimatePresence>
      </motion.div>

      <motion.span 
        className="text-xl font-bold text-gray-900 tracking-tight ml-2 overflow-hidden whitespace-nowrap transition-colors duration-300 group-hover:text-primary-600 relative z-10"
        initial={isInitialLoad ? { opacity: 0, width: 0 } : { opacity: 1, width: 'auto' }}
        animate={
          isNavigating ? {
            opacity: [1, 0, 1],
            scale: [1, 1.05, 1],
            transition: { duration: 0.8 }
          } : isInitialLoad ? { 
            opacity: [0, 0, 1], 
            width: [0, 0, 120],
            transition: { duration: 4, times: [0, 0.7, 1], ease: "easeInOut" }
          } : { opacity: 1, width: 'auto' }
        }
      >
        EduConnect
      </motion.span>
    </motion.div>
  );
}
