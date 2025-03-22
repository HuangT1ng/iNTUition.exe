import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FileDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample data for the 15 result blocks
const evaluationResults = [
  {
    id: 1,
    backend: 2,
    frontend: 5,
    backendScore: 96.9,
    frontendScore: 95.6,
    analysis: "Robust backend performance is demonstrated by rapid response times and efficient data processing. The frontend UI shows excellent visual consistency and responsive design adaptability across devices."
  },
  {
    id: 2,
    backend: 1,
    frontend: 3,
    backendScore: 94.2,
    frontendScore: 92.8,
    analysis: "The authentication service performs with high reliability. UI animations are smooth with consistent frame rates, providing an engaging user experience."
  },
  {
    id: 3,
    backend: 3,
    frontend: 1,
    backendScore: 91.7,
    frontendScore: 89.4,
    analysis: "Data processing service shows excellent throughput with minimal latency. Frontend typography is highly readable with excellent contrast ratios."
  },
  {
    id: 4,
    backend: 2,
    frontend: 4,
    backendScore: 93.5,
    frontendScore: 90.2,
    analysis: "Backend cache hit ratio optimization results in faster data retrieval. Frontend image quality is optimized for both performance and visual clarity."
  },
  {
    id: 5,
    backend: 1,
    frontend: 2,
    backendScore: 97.2,
    frontendScore: 88.9,
    analysis: "API gateway shows excellent request routing efficiency. The pixel precision of UI elements meets design specifications with minimal variance."
  },
  {
    id: 6,
    backend: 3,
    frontend: 3,
    backendScore: 89.8,
    frontendScore: 93.7,
    analysis: "Backend concurrency handling shows good scalability under load. Frontend color contrast ratios exceed accessibility standards across all UI elements."
  },
  {
    id: 7,
    backend: 1,
    frontend: 1,
    backendScore: 95.3,
    frontendScore: 96.1,
    analysis: "Authentication service demonstrates excellent security measures. Frontend visual consistency creates a cohesive experience across all application modules."
  },
  {
    id: 8,
    backend: 2,
    frontend: 2,
    backendScore: 92.6,
    frontendScore: 91.9,
    analysis: "Backend memory usage is optimized for resource efficiency. White space balance in the UI creates clear visual hierarchy and comfortable reading experience."
  },
  {
    id: 9,
    backend: 3,
    frontend: 5,
    backendScore: 90.4,
    frontendScore: 94.5,
    analysis: "Data processing service handles complex transformations efficiently. Dark mode implementation shows excellent contrast and readability in all lighting conditions."
  },
  {
    id: 10,
    backend: 1,
    frontend: 4,
    backendScore: 98.1,
    frontendScore: 90.8,
    analysis: "API gateway demonstrates excellent error handling and recovery. Button and link designs provide clear affordances with appropriate hover states."
  },
  {
    id: 11,
    backend: 2,
    frontend: 1,
    backendScore: 93.9,
    frontendScore: 92.3,
    analysis: "Backend CPU utilization remains stable even under heavy workloads. Frontend typography selection enhances readability across different content types."
  },
  {
    id: 12,
    backend: 3,
    frontend: 4,
    backendScore: 91.2,
    frontendScore: 89.7,
    analysis: "Data processing service maintains high availability with minimal downtime. Responsive design adapts seamlessly across device sizes maintaining functional integrity."
  },
  {
    id: 13,
    backend: 1,
    frontend: 5,
    backendScore: 96.4,
    frontendScore: 93.2,
    analysis: "Authentication service handles concurrent authentication requests efficiently. Theme support implementation allows seamless switching with no visual glitches."
  },
  {
    id: 14,
    backend: 2,
    frontend: 3,
    backendScore: 94.7,
    frontendScore: 95.0,
    analysis: "Backend queue management prevents bottlenecks during traffic spikes. Animation timing and easing functions create a polished, professional feel."
  },
  {
    id: 15,
    backend: 3,
    frontend: 2,
    backendScore: 92.8,
    frontendScore: 91.5,
    analysis: "Data processing service shows consistent performance across varied data types. UI component spacing maintains visual harmony throughout the application."
  }
];

const EvaluationResult = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // Simulate loading delay
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    const timer = setTimeout(() => {
      setLoading(false);
      clearInterval(progressInterval);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  const handleDownload = () => {
    console.log("Downloading evaluation results...");
    // This would be implemented to actually download results as PDF or JSON
    alert("Download started! (This is just a demo)");
  };

  const handleVisualize = () => {
    navigate('/visualization');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen w-full ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50'
      }`}>
        <div className="flex flex-col items-center max-w-md mx-auto p-8 rounded-xl shadow-lg">
          <div className="flex space-x-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <h2 className="text-xl font-semibold mb-6">Loading evaluation results...</h2>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{progress}% Complete</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-16 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50'
    }`}>
      {/* Sticky header */}
      <header className={`sticky top-0 z-10 shadow-md py-4 ${
        isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent'
          }`}>Evaluation Results</h1>
          
          <button 
            onClick={handleDownload}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDarkMode 
                ? 'bg-blue-700 text-white hover:bg-blue-600' 
                : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white hover:opacity-90'
            } transition-colors`}
          >
            <FileDown size={18} />
            <span>Download</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="grid grid-cols-1 gap-6 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {evaluationResults.map(result => (
            <motion.div 
              key={result.id}
              variants={itemVariants}
              className={`rounded-lg shadow-md overflow-hidden ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className={`p-4 ${
                isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
              }`}>
                <div className="flex justify-between items-center">
                  <h2 className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-blue-800'
                  }`}>Backend {result.backend}, Frontend {result.frontend}</h2>
                  
                  {result.id === 1 && (
                    <button 
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1 ${
                        isDarkMode 
                          ? 'bg-blue-700 text-white hover:bg-blue-600' 
                          : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white hover:opacity-90'
                      } transition-colors shadow-sm`}
                      onClick={handleVisualize}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span>Visualize</span>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 dark:text-gray-300">Backend Score:</span>
                      <span className={`font-bold ${
                        result.backendScore >= 95 
                          ? 'text-green-500' 
                          : result.backendScore >= 85 
                            ? 'text-yellow-500' 
                            : 'text-red-500'
                      }`}>{result.backendScore.toFixed(1)}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          result.backendScore >= 95 
                          ? 'bg-gradient-to-r from-green-400 to-green-500' 
                          : result.backendScore >= 85 
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' 
                            : 'bg-gradient-to-r from-red-400 to-red-500'
                        }`}
                        style={{ width: `${result.backendScore}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 dark:text-gray-300">Frontend Score:</span>
                      <span className={`font-bold ${
                        result.frontendScore >= 95 
                          ? 'text-green-500' 
                          : result.frontendScore >= 85 
                            ? 'text-yellow-500' 
                            : 'text-red-500'
                      }`}>{result.frontendScore.toFixed(1)}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          result.frontendScore >= 95 
                          ? 'bg-gradient-to-r from-green-400 to-green-500' 
                          : result.frontendScore >= 85 
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' 
                            : 'bg-gradient-to-r from-red-400 to-red-500'
                        }`}
                        style={{ width: `${result.frontendScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className={`p-5 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-gradient-to-r from-blue-50/50 via-cyan-50/50 to-teal-50/50'
                }`}>
                  <h3 className={`text-md font-medium mb-3 flex items-center ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    Analysis
                  </h3>
                  <p className={`${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  } text-sm leading-relaxed`}>
                    {result.analysis}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default EvaluationResult; 