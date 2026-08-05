import { Users, TrendingUp } from "lucide-react";
import { BookOpen, MessageCircle, HelpCircle, Tag, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import WaitlistModal from "../components/WaitlistModal";
import ProductModal from "../components/ProductModal";

import React from "react";

import { useState, useEffect } from 'react';
import api from '../utils/api';
import * as LucideIcons from 'lucide-react';
export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const [ecosystemProducts, setEcosystemProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [waitlistProduct, setWaitlistProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/ecosystem');
        setEcosystemProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch ecosystem products", err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 lg:py-24">
        <motion.div 
          className="max-w-4xl mx-auto bg-white/60 backdrop-blur-sm p-12 rounded-3xl border border-white/40 shadow-xl"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6 shadow-sm border border-primary-200">
            <TrendingUp className="h-4 w-4" />
            Advancing Global Education
          </motion.div>
          <motion.h1 variants={item} className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Intelligent Solutions for <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">Modern Learning</span>
          </motion.h1>
          <motion.p variants={item} className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Eduscope Connect is a premier collaborative platform where students, educators, and institutions converge to share knowledge, discover opportunities, and build reputation.
          </motion.p>
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/questions" className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5 transition-all rounded-xl font-semibold">
              <Search className="h-5 w-5" />
              Explore Community
            </Link>
            <Link to="/register" className="bg-white border-2 border-primary-600 text-primary-700 hover:bg-primary-50 inline-flex items-center justify-center gap-2 text-lg px-8 py-4 hover:-translate-y-0.5 transition-all shadow-sm rounded-xl font-semibold">
              Partner With Us
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-12">
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.div variants={item} className="card text-center hover:border-primary-200 transition-colors group hover:shadow-md">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Ask & Answer</h3>
            <p className="text-slate-600">Post academic doubts and get answers from peers. Vote on the best solutions.</p>
          </motion.div>
          <motion.div variants={item} className="card text-center hover:border-primary-200 transition-colors group hover:shadow-md">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Community Driven</h3>
            <p className="text-slate-600">Build reputation through quality contributions. Earn points for helpful answers.</p>
          </motion.div>
          <motion.div variants={item} className="card text-center hover:border-primary-200 transition-colors group hover:shadow-md">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Organized Learning</h3>
            <p className="text-slate-600">Tag questions by subject and topic. Search and filter to find relevant content.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-16 bg-[#003152] text-white rounded-3xl mx-4 lg:mx-0 shadow-2xl relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary-500/20 blur-3xl"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent-500/20 blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Technology Ecosystem</h2>
          <p className="text-primary-100 mb-12 max-w-2xl mx-auto">Explore our suite of AI-powered educational technology platforms designed to enhance learning and institutional efficiency.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {loadingProducts ? (
              <div className="col-span-full text-center py-8 text-primary-200">Loading ecosystem products...</div>
            ) : (
              ecosystemProducts.map((product) => {
                const IconComponent = LucideIcons[product.icon] || LucideIcons.HelpCircle;
                return (
                  <div 
                    key={product.id} 
                    onClick={() => setSelectedProduct(product)} 
                    className="relative overflow-hidden border border-white/20 p-5 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer group h-48 flex flex-col justify-end bg-slate-900"
                  >
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-110 transition-transform duration-700 opacity-90" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent z-10"></div>
                    <div className="relative z-20">
                      <div className="w-10 h-10 bg-black/30 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-white mb-1 drop-shadow-lg">{product.name}</h4>
                      <p className="text-xs text-slate-200 drop-shadow-md">{product.tagline}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <Link
            to="/ecosystem"
            className="inline-flex items-center gap-2 mt-10 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl font-medium transition-all hover:-translate-y-0.5"
          >
            View All Platforms
            <ArrowRight className="h-4 w-4" />
          </Link>
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

