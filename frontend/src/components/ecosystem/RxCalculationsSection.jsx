import React, { useState } from 'react';
import { Pill, ActivitySquare, PlayCircle, BookOpenCheck, ArrowRight, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RxCalculationsSection() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, correct, incorrect
  const [score, setScore] = useState(85);

  const options = [
    { id: 'A', text: '5 mL' },
    { id: 'B', text: '10 mL', isCorrect: true },
    { id: 'C', text: '15 mL' },
    { id: 'D', text: '20 mL' }
  ];

  const handleSelect = (id) => {
    if (submitStatus !== 'idle') return;
    setSelectedAnswer(id);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || submitStatus !== 'idle') return;
    
    const isCorrect = options.find(o => o.id === selectedAnswer)?.isCorrect;
    if (isCorrect) {
      setSubmitStatus('correct');
      setScore(prev => prev + 1);
    } else {
      setSubmitStatus('incorrect');
    }
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setSubmitStatus('idle');
  };

  return (
    <section id="rxcalculations" className="relative py-24 bg-white overflow-hidden border-t border-slate-100">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23f1f5f9\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
      
      {/* Decorative Plus Signs (Medical motif) */}
      <div className="absolute top-20 right-20 text-red-50 opacity-70">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
          <path d="M40 0h20v40h40v20H60v40H40V60H0V40h40z" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-10 text-slate-50 opacity-50">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
          <path d="M40 0h20v40h40v20H60v40H40V60H0V40h40z" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-semibold tracking-wide border border-red-100">
              <Pill className="w-4 h-4" />
              RxCalculations
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Master <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">Pharmacy Calculations</span>
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Top quality pharmaceutical calculations resources to help pharmacy students ace the NAPLEX. 
              Online practice question banks, video tutorials, and private tutoring.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                { title: "Online Question Banks", icon: ActivitySquare },
                { title: "Video Tutorials & Courses", icon: PlayCircle },
                { title: "NAPLEX Exam Prep", icon: BookOpenCheck },
                { title: "Private Tutoring", icon: ShieldCheck }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 font-medium bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-red-50 p-2 rounded-lg text-red-500">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold">{item.title}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-8">
              <a href="https://www.rxcalculations.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white bg-red-600 hover:bg-red-700 rounded-xl font-bold shadow-lg shadow-red-500/30 transition-all hover:-translate-y-1">
                Start Practicing
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Right Content - App Mockup */}
          <div className="flex-1 w-full max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white">
                    <Pill className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 leading-tight">NAPLEX Prep</h3>
                    <p className="text-xs text-slate-500">Module 4: Pharmacokinetics</p>
                  </div>
                </div>
                <motion.div 
                  key={score}
                  initial={{ scale: 1.1, backgroundColor: '#fef08a' }}
                  animate={{ scale: 1, backgroundColor: '#ffffff' }}
                  className="bg-white px-3 py-1 rounded-full border border-slate-200 text-sm font-bold text-slate-600 shadow-sm"
                >
                  Score: {score}%
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm font-medium border border-blue-100 mb-6 relative overflow-hidden">
                  {submitStatus === 'correct' && (
                    <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center z-10 backdrop-blur-[1px]">
                      <div className="bg-white text-green-600 font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> Correct! +1%
                      </div>
                    </div>
                  )}
                  {submitStatus === 'incorrect' && (
                    <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center z-10 backdrop-blur-[1px]">
                      <div className="bg-white text-red-600 font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <XCircle className="w-5 h-5" /> Incorrect
                      </div>
                    </div>
                  )}
                  <strong className="block mb-1">Question 12 of 50</strong>
                  A patient is prescribed 500mg of amoxicillin to be taken three times a day for 7 days. 
                  The pharmacy dispenses a 250mg/5mL suspension. How many mL should the patient take per dose?
                </div>
                
                <div className="space-y-3">
                  {options.map((opt) => {
                    const isSelected = selectedAnswer === opt.id;
                    const isSubmitted = submitStatus !== 'idle';
                    
                    let baseStyles = "p-4 rounded-xl border-2 transition-colors flex justify-between items-center group cursor-pointer";
                    let textStyles = "font-bold";
                    let ringStyles = "w-5 h-5 rounded-full flex items-center justify-center border-2";
                    
                    if (isSubmitted) {
                      baseStyles += " cursor-default";
                      if (opt.isCorrect) {
                        baseStyles += " border-green-500 bg-green-50";
                        textStyles += " text-green-700";
                        ringStyles += " bg-green-500 border-green-500";
                      } else if (isSelected && !opt.isCorrect) {
                        baseStyles += " border-red-500 bg-red-50";
                        textStyles += " text-red-700";
                        ringStyles += " bg-red-500 border-red-500";
                      } else {
                        baseStyles += " border-slate-200 bg-white opacity-50";
                        textStyles += " text-slate-400";
                        ringStyles += " border-slate-300";
                      }
                    } else {
                      if (isSelected) {
                        baseStyles += " border-red-500 bg-red-50";
                        textStyles += " text-red-700";
                        ringStyles += " bg-red-500 border-red-500";
                      } else {
                        baseStyles += " border-slate-200 hover:border-red-200 hover:bg-red-50";
                        textStyles += " text-slate-700 group-hover:text-red-700";
                        ringStyles += " border-slate-300 group-hover:border-red-400";
                      }
                    }
                    
                    return (
                      <div 
                        key={opt.id}
                        onClick={() => handleSelect(opt.id)}
                        className={baseStyles}
                      >
                        <span className={textStyles}>{opt.id}. {opt.text}</span>
                        <div className={ringStyles}>
                          {(isSelected || (isSubmitted && opt.isCorrect)) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-8 flex justify-between items-center">
                  <button className="text-slate-500 font-bold hover:text-slate-700 disabled:opacity-50" disabled>Previous</button>
                  {submitStatus === 'idle' ? (
                    <button 
                      onClick={handleSubmit}
                      disabled={!selectedAnswer}
                      className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button 
                      onClick={resetQuiz}
                      className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-red-700 transition-colors"
                    >
                      Next Question
                    </button>
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
