import { Sparkles, ExternalLink } from "lucide-react";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import React from "react";

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Youtube, BookOpen, Code2, Globe, 
  GraduationCap, FileText, Video
} from 'lucide-react';

const resourceCategories = [
  {
    id: 'all',
    name: 'All Resources',
    icon: Globe,
    engines: ['google', 'youtube', 'stackoverflow', 'mdn', 'geeksforgeeks', 'w3schools', 'wikipedia'],
  },
  {
    id: 'videos',
    name: 'Video Tutorials',
    icon: Video,
    engines: ['youtube', 'google-videos'],
  },
  {
    id: 'docs',
    name: 'Documentation',
    icon: FileText,
    engines: ['mdn', 'w3schools', 'devdocs'],
  },
  {
    id: 'community',
    name: 'Community Q&A',
    icon: Code2,
    engines: ['stackoverflow', 'geeksforgeeks', 'reddit'],
  },
  {
    id: 'academic',
    name: 'Academic',
    icon: GraduationCap,
    engines: ['google-scholar', 'wikipedia', 'coursera'],
  },
];

const searchEngines = {
  google: {
    name: 'Google Search',
    icon: Globe,
    color: 'border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300',
    iconColor: 'text-blue-600',
    description: 'General web search',
    buildUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  'google-videos': {
    name: 'Google Videos',
    icon: Video,
    color: 'border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300',
    iconColor: 'text-blue-600',
    description: 'Video results from Google',
    buildUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}&tbm=vid`,
  },
  'google-scholar': {
    name: 'Google Scholar',
    icon: GraduationCap,
    color: 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-300',
    iconColor: 'text-indigo-600',
    description: 'Academic papers & research',
    buildUrl: (q) => `https://scholar.google.com/scholar?q=${encodeURIComponent(q)}`,
  },
  youtube: {
    name: 'YouTube',
    icon: Youtube,
    color: 'border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300',
    iconColor: 'text-red-600',
    description: 'Video tutorials & lectures',
    buildUrl: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q + ' tutorial')}`,
  },
  stackoverflow: {
    name: 'Stack Overflow',
    icon: Code2,
    color: 'border-orange-200 bg-orange-50 hover:bg-orange-100 hover:border-orange-300',
    iconColor: 'text-orange-600',
    description: 'Programming Q&A',
    buildUrl: (q) => `https://stackoverflow.com/search?q=${encodeURIComponent(q)}`,
  },
  mdn: {
    name: 'MDN Web Docs',
    icon: BookOpen,
    color: 'border-purple-200 bg-purple-50 hover:bg-purple-100 hover:border-purple-300',
    iconColor: 'text-purple-600',
    description: 'Web development documentation',
    buildUrl: (q) => `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(q)}`,
  },
  w3schools: {
    name: 'W3Schools',
    icon: BookOpen,
    color: 'border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-300',
    iconColor: 'text-green-600',
    description: 'Beginner-friendly tutorials',
    buildUrl: (q) => `https://www.google.com/search?q=site:w3schools.com+${encodeURIComponent(q)}`,
  },
  geeksforgeeks: {
    name: 'GeeksForGeeks',
    icon: GraduationCap,
    color: 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300',
    iconColor: 'text-emerald-600',
    description: 'DSA & CS fundamentals',
    buildUrl: (q) => `https://www.geeksforgeeks.org/search/${encodeURIComponent(q)}/`,
  },
  devdocs: {
    name: 'DevDocs',
    icon: FileText,
    color: 'border-cyan-200 bg-cyan-50 hover:bg-cyan-100 hover:border-cyan-300',
    iconColor: 'text-cyan-600',
    description: 'Unified API documentation',
    buildUrl: (q) => `https://devdocs.io/#q=${encodeURIComponent(q)}`,
  },
  wikipedia: {
    name: 'Wikipedia',
    icon: BookOpen,
    color: 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300',
    iconColor: 'text-gray-700',
    description: 'Encyclopedia articles',
    buildUrl: (q) => `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(q)}`,
  },
  reddit: {
    name: 'Reddit',
    icon: Code2,
    color: 'border-orange-200 bg-orange-50 hover:bg-orange-100 hover:border-orange-300',
    iconColor: 'text-orange-500',
    description: 'Community discussions',
    buildUrl: (q) => `https://www.reddit.com/search/?q=${encodeURIComponent(q)}`,
  },
  coursera: {
    name: 'Coursera',
    icon: GraduationCap,
    color: 'border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300',
    iconColor: 'text-blue-700',
    description: 'Online courses',
    buildUrl: (q) => `https://www.coursera.org/search?query=${encodeURIComponent(q)}`,
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function GoogleSearchPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchInput.trim());
  };

  const activeEngines = resourceCategories.find((c) => c.id === activeCategory)?.engines || [];
  const filteredEngines = Object.entries(searchEngines).filter(([key]) =>
    activeEngines.includes(key)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <Link
          to="/questions"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Questions
        </Link>
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-lg shadow-primary-500/30">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
          Search Learning Resources
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find tutorials, documentation, videos, and community answers from the best educational platforms across the web.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur"></div>
          <div className="relative flex items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <Search className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for any topic... (e.g., React hooks, binary search, SQL joins)"
              className="flex-1 px-4 py-4 text-lg border-none outline-none focus:ring-0 bg-transparent"
              id="resource-search-input"
            />
            <button
              type="submit"
              className="btn-primary mr-2 px-6 py-2.5 rounded-lg text-sm font-semibold"
              id="resource-search-btn"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {resourceCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600'
            }`}
            id={`filter-${category.id}`}
          >
            <category.icon className="h-4 w-4" />
            {category.name}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      {query ? (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
          key={`${query}-${activeCategory}`}
        >
          {filteredEngines.map(([key, engine]) => (
            <motion.a
              key={key}
              href={engine.buildUrl(query)}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-start gap-4 p-5 rounded-xl border-2 transition-all duration-200 ${engine.color}`}
              variants={item}
              id={`resource-${key}`}
            >
              <div className={`p-2.5 rounded-xl bg-white/80 shadow-sm ${engine.iconColor}`}>
                <engine.icon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{engine.name}</h3>
                  <ExternalLink className="h-3.5 w-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-gray-600 mt-0.5">{engine.description}</p>
                <p className="text-xs text-gray-400 mt-2 truncate">
                  Search: "{query}"
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <Search className="h-10 w-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Enter a topic to search</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Type any topic, concept, or question above and we'll help you find the best learning resources across multiple platforms.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {['React Hooks', 'Binary Search', 'SQL Joins', 'Machine Learning', 'Data Structures', 'Docker Setup', 'Linear Algebra', 'REST API Design', 'Python OOP'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => { setSearchInput(suggestion); setQuery(suggestion); }}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-primary-300 hover:text-primary-600 transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
