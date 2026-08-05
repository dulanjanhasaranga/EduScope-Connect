import { ExternalLink } from "lucide-react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

import React from "react";

import { Youtube, BookOpen, Code2, Globe, GraduationCap } from 'lucide-react';

const resources = [
  {
    name: 'Google',
    icon: Globe,
    color: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
    buildUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    name: 'YouTube',
    icon: Youtube,
    color: 'text-red-600 bg-red-50 hover:bg-red-100',
    buildUrl: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q + ' tutorial')}`,
  },
  {
    name: 'Stack Overflow',
    icon: Code2,
    color: 'text-orange-600 bg-orange-50 hover:bg-orange-100',
    buildUrl: (q) => `https://stackoverflow.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    name: 'MDN Docs',
    icon: BookOpen,
    color: 'text-purple-600 bg-purple-50 hover:bg-purple-100',
    buildUrl: (q) => `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(q)}`,
  },
  {
    name: 'GeeksForGeeks',
    icon: GraduationCap,
    color: 'text-green-600 bg-green-50 hover:bg-green-100',
    buildUrl: (q) => `https://www.geeksforgeeks.org/search/${encodeURIComponent(q)}/`,
  },
];

export default function SearchResourcesPanel({ query, tags = [] }) {
  const searchQuery = query || tags.join(' ');

  if (!searchQuery) return null;

  return (
    <div className="card border-primary-100 bg-gradient-to-br from-white to-primary-50/30">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Search className="h-5 w-5 text-primary-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Find Resources</h3>
          <p className="text-xs text-gray-500">Search external learning materials</p>
        </div>
      </div>

      <div className="space-y-2">
        {resources.map((resource) => (
          <a
            key={resource.name}
            href={resource.buildUrl(searchQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${resource.color}`}
          >
            <resource.icon className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm font-medium flex-1">{resource.name}</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-primary-100">
        <Link
          to={`/resources?q=${encodeURIComponent(searchQuery)}`}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 hover:gap-2 transition-all"
        >
          Advanced Search
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
