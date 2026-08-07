import { ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../utils/api";

import FacultyLensSection from "../components/ecosystem/FacultyLensSection";
import BevinzeySection from "../components/ecosystem/BevinzeySection";
import EvalometricsSection from "../components/ecosystem/EvalometricsSection";
import StudySociusSection from "../components/ecosystem/StudySociusSection";
import RxCalculationsSection from "../components/ecosystem/RxCalculationsSection";
import GenericEcosystemSection from "../components/ecosystem/GenericEcosystemSection";
import LoadingSpinner from "../components/LoadingSpinner";

export default function EcosystemPage() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/ecosystem?t=' + Date.now());
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch ecosystem products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading && location.hash) {
      const timer = setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [location.hash, loading]);

  const renderSection = (product, index) => {
    // If it's one of the core bespoke products, use the custom component
    // If we want them to use dynamic data in the future, we could pass `product={product}`
    // But for now, we just route to the right component.
    const isReverse = index % 2 !== 0;

    switch (product.id) {
      case 'facultylens':
        return <FacultyLensSection key={product.id} />;
      case 'bevinzey':
        return <BevinzeySection key={product.id} />;
      case 'evalometrics':
        return <EvalometricsSection key={product.id} />;
      case 'studysocius':
        return <StudySociusSection key={product.id} />;
      case 'rxcalculations':
        return <RxCalculationsSection key={product.id} />;
      default:
        // Use generic component for any products dynamically added via DB/Admin
        return <GenericEcosystemSection key={product.id} product={product} reverse={isReverse} />;
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" className="py-20" />;
  }

  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="text-center py-16 px-4 max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-4 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl shadow-xl shadow-primary-500/30">
            <Globe className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Our Technology{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">
            Ecosystem
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Eduscope Global builds AI-powered educational technology platforms designed to transform 
          how students learn, educators teach, and institutions operate. Each product in our ecosystem 
          addresses a unique challenge in modern education.
        </p>
      </div>

      {/* Dynamic Products Sections */}
      <div className="flex flex-col">
        {products.map((product, index) => renderSection(product, index))}
      </div>

      {/* CTA Section */}
      <section className="py-16 mx-4 sm:mx-8 mb-12 bg-gradient-to-br from-[#003152] to-[#004878] text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[15%] w-[50%] h-[50%] rounded-full bg-primary-500/20 blur-3xl"></div>
          <div className="absolute -bottom-[30%] -left-[15%] w-[50%] h-[50%] rounded-full bg-accent-500/20 blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">Want to Partner With Us?</h2>
          <p className="text-primary-100 mb-10 text-xl leading-relaxed">
            We're building the future of educational technology. If you're an institution, 
            educator, or EdTech enthusiast interested in collaborating, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@eduscopeglobal.com"
              className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4 shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1 transition-all rounded-2xl font-semibold bg-white text-[#003152] hover:bg-gray-50"
            >
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              to="/questions"
              className="border-2 border-white/30 text-white hover:bg-white/10 inline-flex items-center justify-center gap-2 text-lg px-8 py-4 hover:-translate-y-1 transition-all rounded-2xl font-semibold"
            >
              Explore Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
