import React from 'react';
import { Users2, Target, CalendarDays, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StudySociusSection() {
  return (
    <section id="studysocius" className="relative py-24 bg-[#fff9f0] overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fb923c 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          
          {/* Right Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold tracking-wide">
              <Users2 className="w-4 h-4" />
              StudySocius
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              The Ultimate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Productivity Companion</span>
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Take control of every assignment, set motivating study goals, and connect with a social learning network designed to boost your efficiency.
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-orange-100 transition-shadow hover:shadow-md">
                <div className="p-3 bg-orange-50 rounded-xl text-orange-500">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Study Goals Tracking</h4>
                  <p className="text-sm text-slate-500 mt-1">Set actionable goals and maintain your learning streaks.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-orange-100 transition-shadow hover:shadow-md">
                <div className="p-3 bg-amber-50 rounded-xl text-amber-500">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Assignment Management</h4>
                  <p className="text-sm text-slate-500 mt-1">Never miss a deadline with intelligent task tracking.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <a href="https://www.studysocius.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white bg-orange-500 hover:bg-orange-600 rounded-2xl font-bold shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1">
                Join StudySocius
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Left Content - UI Mockup */}
          <div className="flex-1 w-full max-w-2xl relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-[2rem] shadow-2xl border-4 border-white overflow-hidden relative z-10"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Hello, Alex! 👋</h3>
                  <p className="text-sm text-slate-500">Let's crush your goals today.</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center font-bold text-orange-600">A</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl p-6 text-white mb-8 shadow-lg">
                <h4 className="font-bold mb-2">Weekly Goal Progress</h4>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-3xl font-extrabold">75%</span>
                  <span className="text-sm opacity-90">3 of 4 tasks completed</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800">Upcoming Assignments</h4>
                
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-orange-200 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-red-50 text-red-500 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold uppercase">Oct</span>
                    <span className="font-bold leading-none">12</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-slate-800">Physics Lab Report</h5>
                    <p className="text-xs text-slate-500">Due in 2 days</p>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-slate-200"></div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-orange-200 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 text-slate-500 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold uppercase">Oct</span>
                    <span className="font-bold leading-none">15</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-slate-800">Calculus Midterm Prep</h5>
                    <p className="text-xs text-slate-500">Due in 5 days</p>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-slate-200"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
