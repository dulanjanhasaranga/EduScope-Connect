import { Sparkles } from "lucide-react";
import { HelpCircle, ArrowLeft, Search, Filter, ArrowRight, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
import WaitlistModal from "../components/WaitlistModal";
import ProductModal from "../components/ProductModal";

import React from "react";

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import * as LucideIcons from 'lucide-react';


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function EcosystemPage() {
  const location = useLocation();
  const [ecosystemProducts, setEcosystemProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [waitlistProduct, setWaitlistProduct] = useState(null);
  
  // Search and Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/ecosystem');
        setEcosystemProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch ecosystem products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.hash) {
      // Small delay to let framer-motion render the elements
      const timer = setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(`ecosystem-${id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a highlight pulse
          element.classList.add('ring-4', 'ring-primary-400', 'ring-opacity-50');
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-primary-400', 'ring-opacity-50');
          }, 2000);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  // Derived state for categories
  const categories = ['All', ...new Set(ecosystemProducts.map(p => p.category).filter(Boolean))];

  // Filter products
  const filteredProducts = ecosystemProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-lg shadow-primary-500/30">
            <Globe className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
          Our Technology{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">
            Ecosystem
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
          Eduscope Global builds AI-powered educational technology platforms designed to transform 
          how students learn, educators teach, and institutions operate. Each product in our ecosystem 
          addresses a unique challenge in modern education.
        </p>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products, features..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide py-1">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : (
        <motion.div
          className="space-y-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-6 text-primary-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredProducts.map((product, index) => {
            const IconComponent = LucideIcons[product.icon] || LucideIcons.HelpCircle;
            return (
              <motion.div
                key={product.id}
                variants={item}
                className={`card !p-0 overflow-hidden border-2 ${product.borderColor} hover:shadow-lg transition-shadow duration-300`}
                id={`ecosystem-${product.id}`}
              >
                <div className={`flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image Banner / Icon */}
                  <div className={`lg:w-[400px] flex-shrink-0 relative overflow-hidden group bg-slate-900`}>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-110 transition-transform duration-1000 opacity-90" />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.color} z-0`}></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                    <div className="relative z-20 flex flex-col items-center justify-center h-full p-8 lg:p-10 text-white">
                      <div className="w-20 h-20 bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-extrabold text-center drop-shadow-lg">{product.name}</h2>
                      <p className="text-sm text-white mt-2 text-center font-medium drop-shadow-md">{product.tagline}</p>
                    </div>
                  </div>

              {/* Content */}
              <div className="flex-1 p-6 lg:p-8">
                <p className="text-gray-700 leading-relaxed mb-6 text-base">
                  {product.description}
                </p>

                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Key Features
                </h4>
                <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 rounded-full ${product.bgColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${product.color}`}></div>
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${product.bgColor} ${product.iconColor}`}>
                      <IconComponent className="h-4 w-4" />
                      Coming Soon
                    </span>
                    <span className="text-xs text-gray-400">Part of the Eduscope Global ecosystem</span>
                  </div>
                  
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-colors"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => setWaitlistProduct(product)}
                      className={`flex-1 sm:flex-none px-6 py-2.5 text-white font-semibold rounded-xl shadow-md transition-transform hover:-translate-y-0.5 bg-gradient-to-r ${product.color}`}
                    >
                      Join Waitlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
            );
          })
          )}
        </motion.div>
      )}

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-[#003152] to-[#004878] text-white rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[15%] w-[50%] h-[50%] rounded-full bg-primary-500/20 blur-3xl"></div>
          <div className="absolute -bottom-[30%] -left-[15%] w-[50%] h-[50%] rounded-full bg-accent-500/20 blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Partner With Us?</h2>
          <p className="text-primary-100 mb-8 text-lg">
            We're building the future of educational technology. If you're an institution, 
            educator, or EdTech enthusiast interested in collaborating, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@eduscopeglobal.com"
              className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5 transition-all rounded-xl font-semibold bg-white text-[#003152] hover:bg-gray-100"
            >
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              to="/questions"
              className="border-2 border-white/40 text-white hover:bg-white/10 inline-flex items-center justify-center gap-2 text-lg px-8 py-4 hover:-translate-y-0.5 transition-all rounded-xl font-semibold"
            >
              Explore Community
            </Link>
          </div>
        </div>
      </section>

      <ProductModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
        onOpenWaitlist={(p) => setWaitlistProduct(p)}
      />
      
      <WaitlistModal
        isOpen={!!waitlistProduct}
        onClose={() => setWaitlistProduct(null)}
        product={waitlistProduct}
      />
    </div>
  );
}
