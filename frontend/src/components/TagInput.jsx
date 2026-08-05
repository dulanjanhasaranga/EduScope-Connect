import { X, Tag, Filter, ChevronDown } from "lucide-react";

import React from "react";

import { useState, useRef, useEffect } from 'react';
import api from '../utils/api';

const TagInput = ({ tags, onChange, maxTags = 5 }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showPopularTags, setShowPopularTags] = useState(false);
  const [categorizedTags, setCategorizedTags] = useState({});
  const [allPopularTags, setAllPopularTags] = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
        setShowPopularTags(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Fetch categorized tags on mount
    api.get('/tags/categorized')
      .then((res) => {
        setCategorizedTags(res.data);
        const allTags = Object.values(res.data).flat();
        setAllPopularTags(allTags);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (input.length > 0) {
      // Filter popular tags locally first for instant results
      const localMatches = allPopularTags.filter(
        (t) => t.includes(input.toLowerCase()) && !tags.includes(t)
      );
      setSuggestions(localMatches.slice(0, 8));

      // Also fetch from API for any user-created tags
      api.get(`/tags?search=${input}`)
        .then((res) => {
          const apiTags = res.data.filter((t) => !tags.includes(t));
          // Merge: local matches first, then API results not already in local
          const merged = [...new Set([...localMatches, ...apiTags])];
          setSuggestions(merged.slice(0, 8));
        })
        .catch(() => {});
    } else {
      setSuggestions([]);
    }
  }, [input, tags, allPopularTags]);

  const addTag = (tag) => {
    const normalized = tag.toLowerCase().trim();
    if (normalized && !tags.includes(normalized) && tags.length < maxTags) {
      onChange([...tags, normalized]);
      setInput('');
      setShowSuggestions(false);
      setShowPopularTags(false);
      inputRef.current?.focus();
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-xl bg-white focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-shadow">
        {tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-lg">
            {t}
            <button type="button" onClick={() => removeTag(t)} className="text-primary-400 hover:text-primary-900">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(true);
            setShowPopularTags(false);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (input) setShowSuggestions(true);
          }}
          placeholder={tags.length < maxTags ? "Add a tag..." : `Maximum ${maxTags} tags`}
          disabled={tags.length >= maxTags}
          className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
        />

        <button
          type="button"
          onClick={() => setShowPopularTags(!showPopularTags)}
          className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
          title="Browse popular tags"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Autocomplete suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addTag(suggestion)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Popular tags browser */}
      {showPopularTags && Object.keys(categorizedTags).length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-4 max-h-72 overflow-y-auto">
          {Object.entries(categorizedTags).map(([category, categoryTags]) => {
            const available = categoryTags.filter((t) => !tags.includes(t));
            if (available.length === 0) return null;
            return (
              <div key={category} className="mb-4 last:mb-0">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {available.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => addTag(t)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
                    >
                      <Tag className="h-3 w-3" />
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TagInput;

