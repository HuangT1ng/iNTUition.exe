import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Github } from 'lucide-react';

export function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className={`w-full py-4 px-6 ${
      theme === 'light' ? 'bg-white border-t border-gray-200' : 'bg-[#343541] border-t border-gray-800'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          © 2025 Unified Planner-to-Designer. All rights reserved.
        </p>
        <div className="flex items-center space-x-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm flex items-center space-x-2 ${
              theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href="#"
            className={`text-sm ${
              theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'
            }`}
          >
            Terms
          </a>
          <a
            href="#"
            className={`text-sm ${
              theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'
            }`}
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}