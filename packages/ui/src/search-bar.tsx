"use client";

import React, { useState, useEffect, useRef } from "react";

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
  debounceMs?: number;
  className?: string;
  autoFocus?: boolean;
  value?: string;
}

export function SearchBar({
  placeholder = "Search...",
  onSearch,
  debounceMs = 300,
  className = "",
  autoFocus = false,
  value = "",
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(value);
  const initialRender = useRef(true);

  // Sync prop value to internal state if it changes from outside
  useEffect(() => {
    if (value !== searchTerm) {
      setSearchTerm(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    // Skip the debounce on the initial render to prevent an extraneous search trigger
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs, onSearch]);

  const handleClear = () => {
    setSearchTerm("");
    // We typically want to immediately trigger search with empty string when cleared
    onSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <div className={`relative flex items-center w-full min-w-[200px] ${className}`}>
      {/* Search Icon */}
      <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      <input
        type="text"
        className="block w-full pl-11 pr-10 py-2.5 bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 dark:hover:border-gray-600 transition-colors shadow-sm outline-none placeholder-gray-400 dark:placeholder-gray-500"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus={autoFocus}
      />

      {/* Clear Button */}
      {searchTerm.length > 0 && (
        <button
          onClick={handleClear}
          className="absolute right-3.5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:hover:text-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </div>
  );
}
