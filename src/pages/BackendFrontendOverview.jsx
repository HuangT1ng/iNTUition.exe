import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const BackendFrontendOverview = () => {
  const { theme } = useTheme();
  const [backendVisible, setBackendVisible] = useState([false, false, false]);
  const [frontendVisible, setFrontendVisible] = useState([false, false, false, false, false]);
  const [arrowSets, setArrowSets] = useState([false, false, false]);

  useEffect(() => {
    // Animate backend cards appearing
    const backendTimers = [];
    backendTimers.push(setTimeout(() => setBackendVisible(prev => [true, prev[1], prev[2]]), 300));
    backendTimers.push(setTimeout(() => setBackendVisible(prev => [prev[0], true, prev[2]]), 600));
    backendTimers.push(setTimeout(() => setBackendVisible(prev => [prev[0], prev[1], true]), 900));

    // Animate frontend cards appearing after backend
    const frontendTimers = [];
    frontendTimers.push(setTimeout(() => setFrontendVisible(prev => [true, prev[1], prev[2], prev[3], prev[4]]), 1200));
    frontendTimers.push(setTimeout(() => setFrontendVisible(prev => [prev[0], true, prev[2], prev[3], prev[4]]), 1500));
    frontendTimers.push(setTimeout(() => setFrontendVisible(prev => [prev[0], prev[1], true, prev[3], prev[4]]), 1800));
    frontendTimers.push(setTimeout(() => setFrontendVisible(prev => [prev[0], prev[1], prev[2], true, prev[4]]), 2100));
    frontendTimers.push(setTimeout(() => setFrontendVisible(prev => [prev[0], prev[1], prev[2], prev[3], true]), 2400));

    // Animate arrows appearing after all cards are visible
    const arrowTimers = [];
    // First backend card's arrows appear at 2700ms
    arrowTimers.push(setTimeout(() => setArrowSets(prev => [true, prev[1], prev[2]]), 2700));
    // Second backend card's arrows appear 500ms later
    arrowTimers.push(setTimeout(() => setArrowSets(prev => [prev[0], true, prev[2]]), 3200));
    // Third backend card's arrows appear 500ms after that
    arrowTimers.push(setTimeout(() => setArrowSets(prev => [prev[0], prev[1], true]), 3700));

    // Cleanup timers
    return () => {
      backendTimers.forEach(timer => clearTimeout(timer));
      frontendTimers.forEach(timer => clearTimeout(timer));
      arrowTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Backend card data
  const backendCards = [
    { title: "API Gateway", description: "Handles all incoming requests and routes them to appropriate services" },
    { title: "Authentication Service", description: "Manages user authentication and authorization" },
    { title: "Data Processing Service", description: "Processes and transforms data for frontend consumption" }
  ];

  // Frontend card data
  const frontendCards = [
    { title: "User Dashboard", description: "Main user interface with overview" },
    { title: "Profile Management", description: "User profile settings and preferences" },
    { title: "Data Visualization", description: "Charts and graphs for data analysis" },
    { title: "Content Management", description: "Interface for managing content" },
    { title: "Settings Panel", description: "Application configuration options" }
  ];

  // Define arrow component
  const Arrow = ({ from, to, color, visible, delay }) => {
    return (
      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{ 
          pointerEvents: "none", 
          zIndex: 5 
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, delay }}
      >
        <svg className="absolute" style={{ top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}>
          <motion.line
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={color}
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.4, delay }}
          />
          
          {/* Arrow head */}
          <motion.polygon
            points="0,-6 10,0 0,6"
            fill={color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: delay + 0.3 }}
            style={{
              transform: `translate(${to.x}px, ${to.y}px) rotate(90deg)`,
            }}
          />
        </svg>
      </motion.div>
    );
  };

  // Backend positions (x coordinates)
  const backendPositions = [
    { x: "calc(50% - 200px)", index: 0 }, // Left backend card 
    { x: "calc(50%)", index: 1 },         // Center backend card
    { x: "calc(50% + 200px)", index: 2 }  // Right backend card
  ];
  
  // Frontend positions (x coordinates)
  const frontendPositions = [
    { x: "calc(50% - 240px)", index: 0 }, // Far left frontend card
    { x: "calc(50% - 120px)", index: 1 }, // Left frontend card
    { x: "calc(50%)", index: 2 },         // Center frontend card
    { x: "calc(50% + 120px)", index: 3 }, // Right frontend card
    { x: "calc(50% + 240px)", index: 4 }  // Far right frontend card
  ];

  // Colors for each backend component
  const colors = [
    "#2563EB", // blue-600 for backend 0
    "#0891B2", // cyan-600 for backend 1
    "#0D9488"  // teal-600 for backend 2
  ];

  return (
    <div className={`relative w-full min-h-screen px-4 py-8 ${theme === 'light' ? 'bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50' : 'bg-[#343541]'}`}>
      <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'light' ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent' : 'text-white'}`}>
        Backend to Frontend System Overview
      </h2>

      <div className="relative flex flex-col items-center">
        {/* Backend Cards Row */}
        <div className="flex justify-center space-x-6 mb-24 w-full">
          {backendCards.map((card, index) => (
            <motion.div
              key={`backend-${index}`}
              id={`backend-${index}`}
              className={`w-64 p-4 rounded-lg shadow-md ${theme === 'light' ? 'bg-white/90 border border-blue-100' : 'bg-[#40414F] border border-gray-700'} relative z-10`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: backendVisible[index] ? 1 : 0, y: backendVisible[index] ? 0 : -20 }}
              transition={{ duration: 0.5 }}
              style={{ 
                position: 'relative',
                // Position backend cards using calculated positions
                left: index === 0 ? '-200px' : index === 2 ? '200px' : '0'
              }}
            >
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-blue-700' : 'text-white'}`}>{card.title}</h3>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{card.description}</p>
              
              {/* Visual indicator for bottom center of card */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Arrow Container - positioned between backend and frontend cards */}
        <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
          {/* Render all arrows */}
          {arrowSets.map((backendSetVisible, backendIndex) => (
            frontendVisible.map((frontendIsVisible, frontendIndex) => (
              frontendIsVisible && backendSetVisible && (
                <Arrow
                  key={`arrow-${backendIndex}-${frontendIndex}`}
                  from={{ 
                    x: `calc(50% + ${(backendIndex - 1) * 200}px)`, 
                    y: 180  // Bottom of backend card
                  }}
                  to={{ 
                    x: `calc(50% + ${(frontendIndex - 2) * 120}px)`, 
                    y: 235  // Top of frontend card
                  }}
                  color={colors[backendIndex]}
                  visible={backendSetVisible}
                  delay={0.1 * frontendIndex} // Stagger each arrow in the set
                />
              )
            ))
          ))}
        </div>

        {/* Frontend Cards */}
        <div className="flex justify-center flex-wrap gap-4 w-full">
          {frontendCards.map((card, index) => (
            <motion.div
              key={`frontend-${index}`}
              id={`frontend-${index}`}
              className={`w-52 p-4 rounded-lg shadow-md ${theme === 'light' ? 'bg-white/90 border border-cyan-200' : 'bg-[#40414F] border border-gray-700'} relative z-10`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: frontendVisible[index] ? 1 : 0, y: frontendVisible[index] ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'relative',
                // Position frontend cards using calculated positions
                left: (index - 2) * 60 + 'px' 
              }}
            >
              <h3 className={`text-md font-semibold mb-2 ${theme === 'light' ? 'text-blue-700' : 'text-white'}`}>{card.title}</h3>
              <p className={`text-xs ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{card.description}</p>
              
              {/* Visual indicator for top center of card */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-transparent" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animation status indicators */}
      <div className="fixed bottom-4 right-4 flex gap-2">
        {arrowSets.map((isVisible, index) => (
          <div 
            key={index}
            className={`w-4 h-4 rounded-full ${isVisible ? 'bg-blue-600' : 'bg-gray-300'}`}
            title={`Arrow set ${index+1} ${isVisible ? 'visible' : 'hidden'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BackendFrontendOverview; 