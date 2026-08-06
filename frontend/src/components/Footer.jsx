import { Linkedin, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

import React from "react";


export default function Footer() {
  return (
    <footer className="bg-[#003152] text-white pt-16 pb-8 border-t border-[#004878]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold text-white">Eduscope Connect</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering learners, educators, and institutions with AI-driven tools, advanced analytics, and collaborative knowledge sharing.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/eduscope-global" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-[#004878] flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/eduscopeglobal" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-[#004878] flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@eduscopeglobal" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-[#004878] flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/questions" className="hover:text-primary-400 transition-colors">Browse Questions</Link></li>
              <li><Link to="/leaderboard" className="hover:text-primary-400 transition-colors">Leaderboard</Link></li>
              <li><Link to="/login" className="hover:text-primary-400 transition-colors">Log In</Link></li>
              <li><Link to="/register" className="hover:text-primary-400 transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          {/* Ecosystem / Platforms */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Ecosystem</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/ecosystem#facultylens" className="hover:text-primary-400 transition-colors">FacultyLens</Link></li>
              <li><Link to="/ecosystem#bevinzey" className="hover:text-primary-400 transition-colors">Bevinzey</Link></li>
              <li><Link to="/ecosystem#evalometrics" className="hover:text-primary-400 transition-colors">Evalometrics</Link></li>
              <li><Link to="/ecosystem#studysocius" className="hover:text-primary-400 transition-colors">StudySocius</Link></li>
              <li><Link to="/ecosystem#rxcalculations" className="hover:text-primary-400 transition-colors">RxCalculations</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-primary-400 shrink-0" />
                <span>Global Headquarters<br/>123 Innovation Drive<br/>Tech District</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-400 shrink-0" />
                <a href="tel:+18666973314" className="hover:text-white transition-colors">+1-866-697-3314</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-400 shrink-0" />
                <a href="mailto:info@eduscopeglobal.com" className="hover:text-white transition-colors">info@eduscopeglobal.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#004878] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Eduscope Global. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
