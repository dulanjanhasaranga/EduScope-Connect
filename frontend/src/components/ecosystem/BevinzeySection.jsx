import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, BookText, ArrowRight, Zap, CheckCircle2, Play, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BevinzeySection() {
  const [chatState, setChatState] = useState('idle'); // idle, typing, loading, done
  const [toastMessage, setToastMessage] = useState(null);

  const startDemo = () => {
    setChatState('typing');
    setTimeout(() => {
      setChatState('loading');
      setTimeout(() => {
        setChatState('done');
      }, 1500);
    }, 1200);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  return (
    <section id="bevinzey" className="relative py-24 bg-[#0a0514] overflow-hidden">
      {/* Abstract Glowing Backgrounds */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }} 
            animate={{ opacity: 1, y: 0, x: '-50%' }} 
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 z-50 bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          
          {/* Right Content (Text) */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-purple-500/30 text-purple-300 text-sm font-semibold tracking-wide backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Bevinzey
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              AI-Powered <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Study Tools</span>
            </h2>
            
            <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
              Transform how you learn with AI-powered summarization, question generation, lecture transcription, and personalized tutoring.
            </p>
            
            <ul className="space-y-4 pt-2">
              {[
                "Smart Document Summarization",
                "Auto-generated Practice Questions",
                "24/7 AI Tutor Support"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-200 font-medium">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            
            <div className="pt-8">
              <a href="https://bevinzey.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-bold shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]">
                Try Bevinzey Free
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Left Content - Glassmorphism UI Mockup */}
          <div className="flex-1 w-full max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent"
            >
              <div className="bg-[#130b24]/90 backdrop-blur-xl rounded-[23px] border border-white/5 overflow-hidden shadow-2xl min-h-[400px] flex flex-col">
                {/* Chat Interface Mockup */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px]">
                      <div className="w-full h-full bg-[#130b24] rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6 text-purple-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Bevinzey AI Tutor</h3>
                      <div className="flex items-center gap-2 text-xs text-purple-300">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        Online & Ready
                      </div>
                    </div>
                  </div>
                  {chatState === 'idle' && (
                    <button 
                      onClick={startDemo}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <Play className="w-4 h-4" /> Run Demo
                    </button>
                  )}
                  {chatState === 'done' && (
                    <button 
                      onClick={() => setChatState('idle')}
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
                
                <div className="p-6 flex-1 space-y-6 overflow-y-auto">
                  
                  {chatState === 'idle' && (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50 space-y-3 pt-10">
                      <Bot className="w-10 h-10" />
                      <p className="text-sm">Click "Run Demo" to see Bevinzey in action.</p>
                    </div>
                  )}

                  {/* User Message */}
                  {chatState !== 'idle' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end"
                    >
                      <div className="bg-purple-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-[85%] shadow-lg">
                        {chatState === 'typing' ? (
                          <p className="text-sm border-r-2 border-white pr-1 animate-pulse">Can you summarize chapter 4 on Cellular Resp</p>
                        ) : (
                          <p className="text-sm">Can you summarize chapter 4 on Cellular Respiration?</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                  
                  {/* AI Response Loading */}
                  {chatState === 'loading' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/5 border border-white/10 text-slate-200 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[90%] shadow-lg flex items-center gap-3">
                        <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                        <span className="text-sm text-purple-300">Analyzing Chapter 4...</span>
                      </div>
                    </motion.div>
                  )}

                  {/* AI Response Final */}
                  {chatState === 'done' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/5 border border-white/10 text-slate-200 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[90%] shadow-lg">
                        <div className="flex items-center gap-2 mb-2 text-purple-400">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-wider">AI Summary</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-3">
                          Cellular respiration is the process by which cells convert glucose and oxygen into energy (ATP). It occurs in 3 main stages:
                        </p>
                        <ul className="text-sm space-y-1 text-slate-300 list-disc list-inside">
                          <li>Glycolysis (Cytoplasm)</li>
                          <li>Krebs Cycle (Mitochondria)</li>
                          <li>Electron Transport Chain</li>
                        </ul>
                        <div className="mt-4 flex gap-2">
                          <button 
                            onClick={() => showToast('Quiz generated based on Chapter 4!')}
                            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1.5 text-purple-300 border border-white/5"
                          >
                            <Zap className="w-3 h-3" /> Generate Quiz
                          </button>
                          <button 
                            onClick={() => showToast('Note saved to your study deck.')}
                            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1.5 text-pink-300 border border-white/5"
                          >
                            <BookText className="w-3 h-3" /> Save Note
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
