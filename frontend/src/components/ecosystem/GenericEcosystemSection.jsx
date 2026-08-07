import React from 'react';
import { ArrowRight, Box } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GenericEcosystemSection({ product, reverse }) {
  const bgColors = {
    'bg-blue-50': 'bg-blue-50',
    'bg-purple-50': 'bg-purple-50',
    'bg-emerald-50': 'bg-emerald-50',
    'bg-orange-50': 'bg-orange-50',
    'bg-red-50': 'bg-red-50',
    'bg-gray-50': 'bg-gray-50'
  };

  const bgClass = bgColors[product.bgColor] || 'bg-slate-50';

  return (
    <section id={product.id} className={`relative py-24 ${bgClass} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center gap-16 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          
          <div className="flex-1 space-y-8">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white bg-gradient-to-r ${product.color} shadow-sm text-sm font-semibold tracking-wide`}>
              <Box className="w-4 h-4" />
              {product.name}
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              {product.tagline}
            </h2>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              {product.description}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {product.features?.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                   <span className="font-medium text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-8">
              <a href={`https://${product.id}.com/`} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-white bg-gradient-to-r ${product.color} rounded-xl font-bold shadow-lg transition-all hover:-translate-y-1`}>
                Explore {product.name}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex items-center justify-center min-h-[400px]"
            >
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-12">
                   <Box className={`w-24 h-24 mx-auto mb-6 opacity-20 ${product.iconColor || 'text-gray-400'}`} />
                   <h3 className="text-2xl font-bold text-gray-400">{product.name} Application</h3>
                </div>
              )}
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
