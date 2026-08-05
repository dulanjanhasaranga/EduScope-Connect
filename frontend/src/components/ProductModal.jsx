import { HelpCircle, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import React from "react";

import * as LucideIcons from 'lucide-react';

export default function ProductModal({ isOpen, onClose, product, onOpenWaitlist }) {
  if (!isOpen || !product) return null;

  const IconComponent = LucideIcons[product.icon] || LucideIcons.HelpCircle;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column (Image & Gradient) */}
          <div className="md:w-2/5 relative min-h-[300px] md:min-h-full bg-slate-900 flex flex-col justify-end p-8">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} z-0`}></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
            
            <div className="relative z-20">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl font-extrabold text-white drop-shadow-md mb-2">{product.name}</h2>
              <p className="text-lg text-white/90 font-medium drop-shadow">{product.tagline}</p>
            </div>
          </div>

          {/* Right Column (Content) */}
          <div className="md:w-3/5 p-8 md:p-10 overflow-y-auto bg-slate-50">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">About {product.name}</h3>
            <p className="text-slate-600 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            <h4 className="text-lg font-bold text-slate-900 mb-4">Key Capabilities</h4>
            <div className="space-y-4 mb-10">
              {product.features?.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br ${product.color} flex-shrink-0`}>
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
              <button 
                onClick={() => {
                  onClose();
                  onOpenWaitlist(product);
                }}
                className={`flex-1 py-4 px-6 rounded-xl text-white font-bold shadow-lg shadow-current/20 hover:-translate-y-1 transition-all bg-gradient-to-r ${product.color} flex items-center justify-center gap-2 text-lg`}
              >
                Join Waitlist
              </button>
              <button 
                onClick={onClose}
                className="flex-1 py-4 px-6 rounded-xl bg-white text-slate-700 font-bold shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
