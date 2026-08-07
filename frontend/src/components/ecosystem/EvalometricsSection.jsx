import React, { useState } from 'react';
import { Terminal, Activity, Cpu, ShieldCheck, ChevronRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EvalometricsSection() {
  const [activeTab, setActiveTab] = useState('test_chatbot.py');
  const [testStatus, setTestStatus] = useState('idle'); // idle, running, done

  const runTest = () => {
    setTestStatus('running');
    setTimeout(() => {
      setTestStatus('done');
    }, 2000);
  };

  const files = {
    'test_chatbot.py': {
      code: (
        <>
          <span className="text-[#ff7b72]">from</span> deepeval <span className="text-[#ff7b72]">import</span> evaluate{'\n'}
          <span className="text-[#ff7b72]">from</span> deepeval.metrics <span className="text-[#ff7b72]">import</span> AnswerRelevancyMetric{'\n'}
          <span className="text-[#ff7b72]">from</span> deepeval.test_case <span className="text-[#ff7b72]">import</span> LLMTestCase{'\n'}
          {'\n'}
          <span className="text-[#8b949e]"># Initialize the metric</span>{'\n'}
          relevancy_metric = AnswerRelevancyMetric(threshold=<span className="text-[#79c0ff]">0.7</span>){'\n'}
          {'\n'}
          <span className="text-[#8b949e]"># Create a test case</span>{'\n'}
          test_case = LLMTestCase({'\n'}
          {'    '}input=<span className="text-[#a5d6ff]">"What if these shoes don't fit?"</span>,{'\n'}
          {'    '}actual_output=<span className="text-[#a5d6ff]">"We offer a 30-day return policy."</span>{'\n'}
          ){'\n'}
          {'\n'}
          <span className="text-[#ff7b72]">def</span> <span className="text-[#d2a8ff]">test_customer_service</span>():{'\n'}
          {'    '}evaluate({'\n'}
          {'        '}test_cases=[test_case],{'\n'}
          {'        '}metrics=[relevancy_metric]{'\n'}
          {'    '})
        </>
      ),
      output: (
        <>
          ============================= test session starts =============================={'\n'}
          collected 1 item{'\n'}
          {'\n'}
          test_chatbot.py <span className="text-emerald-400">PASSED                                                  [100%]</span>{'\n'}
          {'\n'}
          <span className="text-emerald-400 font-bold">============================== 1 passed in 1.45s ===============================</span>
        </>
      )
    },
    'test_rag.py': {
      code: (
        <>
          <span className="text-[#ff7b72]">from</span> deepeval <span className="text-[#ff7b72]">import</span> evaluate{'\n'}
          <span className="text-[#ff7b72]">from</span> deepeval.metrics <span className="text-[#ff7b72]">import</span> FaithfulnessMetric{'\n'}
          <span className="text-[#ff7b72]">from</span> deepeval.test_case <span className="text-[#ff7b72]">import</span> LLMTestCase{'\n'}
          {'\n'}
          faithfulness_metric = FaithfulnessMetric(threshold=<span className="text-[#79c0ff]">0.8</span>){'\n'}
          {'\n'}
          test_case = LLMTestCase({'\n'}
          {'    '}input=<span className="text-[#a5d6ff]">"Who is the CEO of Eduscope?"</span>,{'\n'}
          {'    '}actual_output=<span className="text-[#a5d6ff]">"Dulanjan Hasaranga is the CEO."</span>,{'\n'}
          {'    '}retrieval_context=[<span className="text-[#a5d6ff]">"Eduscope Global was founded by Dulanjan Hasaranga..."</span>]{'\n'}
          ){'\n'}
          {'\n'}
          <span className="text-[#ff7b72]">def</span> <span className="text-[#d2a8ff]">test_rag_pipeline</span>():{'\n'}
          {'    '}evaluate(test_cases=[test_case], metrics=[faithfulness_metric])
        </>
      ),
      output: (
        <>
          ============================= test session starts =============================={'\n'}
          collected 1 item{'\n'}
          {'\n'}
          test_rag.py <span className="text-emerald-400">PASSED                                                      [100%]</span>{'\n'}
          {'\n'}
          <span className="text-emerald-400 font-bold">============================== 1 passed in 2.10s ===============================</span>
        </>
      )
    }
  };

  return (
    <section id="evalometrics" className="relative py-24 bg-[#0d1117] overflow-hidden border-t border-white/10">
      {/* Developer Grid Background */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#30363d 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-mono tracking-wide">
              <Terminal className="w-4 h-4" />
              Evalometrics / DeepEval
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              The Open-Source <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 font-mono">LLM Eval Framework</span>
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              Offers 50+ state-of-the-art, ready-to-use metrics for evaluating LLMs, including G-Eval, RAG metrics, agentic metrics, and custom criteria.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                { title: "50+ SOTA Metrics", icon: Activity },
                { title: "G-Eval & Custom Criteria", icon: Cpu },
                { title: "End-to-End Evals", icon: ShieldCheck },
                { title: "Developer Native", icon: Terminal }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300 font-medium bg-white/5 p-3 rounded-lg border border-white/5">
                  <item.icon className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm">{item.title}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-8">
              <a href="https://deepeval.com/docs/metrics-introduction" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[#0d1117] bg-emerald-400 hover:bg-emerald-300 rounded-lg font-bold transition-all hover:-translate-y-1 font-mono">
                Read the Docs
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Right Content - Code Editor Mockup */}
          <div className="flex-1 w-full max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl bg-[#161b22] border border-[#30363d] overflow-hidden shadow-2xl flex flex-col min-h-[450px]"
            >
              {/* Editor Header */}
              <div className="bg-[#0d1117] border-b border-[#30363d] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2 mr-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <div className="flex gap-1">
                    {Object.keys(files).map((file) => (
                      <button
                        key={file}
                        onClick={() => { setActiveTab(file); setTestStatus('idle'); }}
                        className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                          activeTab === file ? 'bg-[#21262d] text-[#c9d1d9] border border-[#30363d]' : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]/50 border border-transparent'
                        }`}
                      >
                        {file}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={runTest}
                  disabled={testStatus === 'running'}
                  className="flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-3 py-1 rounded text-xs font-bold font-mono transition-colors disabled:opacity-50"
                >
                  <Play className="w-3 h-3" /> {testStatus === 'running' ? 'Running...' : 'Run Test'}
                </button>
              </div>
              
              {/* Editor Body */}
              <div className="p-4 overflow-x-auto text-sm font-mono leading-loose flex-1">
                <pre className="text-[#e6edf3]">
                  {files[activeTab].code}
                </pre>
              </div>
              
              {/* Terminal Execution */}
              <div className="border-t border-[#30363d] bg-[#0d1117] p-4 text-xs font-mono min-h-[120px]">
                <div className="flex items-center gap-2 text-[#8b949e] mb-2">
                  <span className="text-emerald-400">➜</span>
                  <span>evalometrics</span> <span className="text-white">pytest {activeTab}</span>
                </div>
                
                {testStatus === 'running' && (
                  <div className="text-[#8b949e] animate-pulse">
                    ============================= test session starts =============================={'\n'}
                    collected 1 item{'\n'}
                    {'\n'}
                    Running tests... please wait.
                  </div>
                )}

                {testStatus === 'done' && (
                  <div className="text-[#8b949e]">
                    {files[activeTab].output}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
