import React from 'react';
import { BarChart3, TrendingUp, Users, BrainCircuit, ArrowRight, Activity, BookOpen, Presentation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FacultyLensSection() {
  return (
    <section id="facultylens" className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/50 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-wide">
              <BarChart3 className="w-4 h-4" />
              FacultyLens
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Smart Faculty <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Workload Analytics</span>
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Analyze and balance faculty workload across teaching, research, and service with powerful dashboards and AI-generated insights.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600 shadow-sm border border-blue-200">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Workload Analytics</h4>
                  <p className="text-sm text-slate-500 mt-1">Real-time visibility into academic commitments.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-100 text-cyan-600 shadow-sm border border-cyan-200">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">AI-Generated Insights</h4>
                  <p className="text-sm text-slate-500 mt-1">Predictive burnout models and capacity planning.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-8">
              <a href="https://facultylens.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1">
                Explore FacultyLens
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Right Content - Mockup Dashboard */}
          <div className="flex-1 w-full max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-slate-200 overflow-hidden"
            >
              <div className="border-b border-slate-100 bg-slate-50 px-6 py-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-sm font-medium text-slate-500">facultylens.com/dashboard</div>
                <div></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-slate-800">Department Overview</h3>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">This Semester</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 shadow-sm hover:shadow-md transition-shadow">
                    <BookOpen className="w-5 h-5 text-indigo-500 mb-2" />
                    <div className="text-2xl font-bold text-slate-900">45%</div>
                    <div className="text-xs text-slate-500 font-medium">Teaching</div>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 shadow-sm hover:shadow-md transition-shadow">
                    <TrendingUp className="w-5 h-5 text-emerald-500 mb-2" />
                    <div className="text-2xl font-bold text-slate-900">35%</div>
                    <div className="text-xs text-slate-500 font-medium">Research</div>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 shadow-sm hover:shadow-md transition-shadow">
                    <Users className="w-5 h-5 text-amber-500 mb-2" />
                    <div className="text-2xl font-bold text-slate-900">20%</div>
                    <div className="text-xs text-slate-500 font-medium">Service</div>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-500 font-bold border-2 border-white shadow-sm">RC</div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm font-semibold text-slate-700">Dr. Robert Chen</span>
                        <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">110% Load</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-gradient-to-r from-red-400 to-red-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-500 font-bold border-2 border-white shadow-sm">SM</div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm font-semibold text-slate-700">Sarah Miller</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">85% Load</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
