import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Activity, 
  AlertTriangle, 
  Cpu, 
  HardDrive, 
  Database, 
  Gauge, 
  Users, 
  HeartPulse, 
  ListOrdered,
  Palette, 
  LayoutGrid, 
  Type, 
  Eye, 
  Play, 
  Image, 
  Smartphone, 
  Maximize, 
  MousePointer, 
  Sun,
  CheckCircle 
} from 'lucide-react';
import Modal from './Modal';
import { useTheme } from '../context/ThemeContext';

// Define evaluation steps with user-provided metrics
const evaluationSteps = [
  // Backend Metrics
  {
    id: 'response-time',
    title: 'Response Time (Latency)',
    description: 'Time taken for a request to receive a response',
    icon: Clock,
    category: 'backend'
  },
  {
    id: 'throughput',
    title: 'Throughput (Requests per Second)',
    description: 'Number of requests handled per second',
    icon: Activity,
    category: 'backend'
  },
  {
    id: 'error-rate',
    title: 'Error Rate',
    description: 'Percentage of failed requests',
    icon: AlertTriangle,
    category: 'backend'
  },
  {
    id: 'cpu-utilization',
    title: 'CPU Utilization',
    description: 'Percentage of CPU resources used',
    icon: Cpu,
    category: 'backend'
  },
  {
    id: 'memory-usage',
    title: 'Memory Usage',
    description: 'Amount of RAM consumed by the backend',
    icon: HardDrive,
    category: 'backend'
  },
  {
    id: 'database-performance',
    title: 'Database Query Performance',
    description: 'Time taken for database queries to execute',
    icon: Database,
    category: 'backend'
  },
  {
    id: 'cache-hit-ratio',
    title: 'Cache Hit Ratio',
    description: 'Percentage of requests served from cache vs. database',
    icon: Gauge,
    category: 'backend'
  },
  {
    id: 'concurrency',
    title: 'Concurrency & Scalability',
    description: 'Number of concurrent users the system can handle',
    icon: Users,
    category: 'backend'
  },
  {
    id: 'availability',
    title: 'Availability (Uptime)',
    description: 'Percentage of time the backend is operational',
    icon: HeartPulse,
    category: 'backend'
  },
  {
    id: 'queue-length',
    title: 'Queue Length',
    description: 'Number of pending requests in processing queues',
    icon: ListOrdered,
    category: 'backend'
  },
  // Frontend Metrics
  {
    id: 'visual-consistency',
    title: 'Visual Consistency',
    description: 'Ensuring colors, fonts, and UI elements follow a unified design system',
    icon: Palette,
    category: 'frontend'
  },
  {
    id: 'pixel-perfection',
    title: 'Pixel Perfection',
    description: 'Checking that elements align correctly and match design mockups',
    icon: LayoutGrid,
    category: 'frontend'
  },
  {
    id: 'typography',
    title: 'Typography Readability',
    description: 'Evaluating font sizes, line spacing, and contrast for readability',
    icon: Type,
    category: 'frontend'
  },
  {
    id: 'color-contrast',
    title: 'Color Contrast Ratio',
    description: 'Ensuring text and background colors meet accessibility standards',
    icon: Eye,
    category: 'frontend'
  },
  {
    id: 'animation',
    title: 'Animation Smoothness',
    description: 'Measuring FPS for smooth UI transitions',
    icon: Play,
    category: 'frontend'
  },
  {
    id: 'image-quality',
    title: 'Image Quality & Optimization',
    description: 'Ensuring images are high-quality without excessive file size',
    icon: Image,
    category: 'frontend'
  },
  {
    id: 'responsiveness',
    title: 'Responsiveness',
    description: 'Checking UI adaptability across different screen sizes and resolutions',
    icon: Smartphone,
    category: 'frontend'
  },
  {
    id: 'whitespace',
    title: 'White Space Balance',
    description: 'Ensuring proper spacing and padding for a clean layout',
    icon: Maximize,
    category: 'frontend'
  },
  {
    id: 'button-clickability',
    title: 'Button & Link Clickability',
    description: 'Checking if buttons have proper sizes and hover effects for usability',
    icon: MousePointer,
    category: 'frontend'
  },
  {
    id: 'theme-support',
    title: 'Dark Mode & Theme Support',
    description: 'Evaluating if themes adjust properly without visual glitches',
    icon: Sun,
    category: 'frontend'
  }
];

const ProcessStep = ({ step, status, index, activeStep }) => {
  const isActive = status === 'active';
  const isCompleted = status === 'completed';
  const isPending = status === 'pending';
  
  const Icon = step.icon;
  
  return (
    <div className="flex items-start mb-4 relative">
      {/* Line connector */}
      {index < evaluationSteps.length - 1 && (
        <div 
          className="absolute left-[36px] top-8 w-0.5 h-12 bg-gray-200 dark:bg-gray-700 z-0"
          style={{ transform: 'translateX(-50%)' }}
        />
      )}
      
      {/* Icon container with animation */}
      <div className="relative z-10 mr-4 ml-3">
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              key="active-pulse"
              className="absolute inset-0 bg-purple-500 rounded-full"
              initial={{ opacity: 0.5, scale: 1 }}
              animate={{ opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </AnimatePresence>
        
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isActive 
            ? 'bg-purple-500 text-white' 
            : isCompleted 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
        }`}>
          {isCompleted ? (
            <CheckCircle size={24} />
          ) : (
            <Icon size={24} />
          )}
        </div>
      </div>
      
      {/* Step content */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className={`font-medium text-base ${
            isActive 
              ? 'text-purple-500 dark:text-purple-400' 
              : isCompleted 
                ? 'text-green-500 dark:text-green-400' 
                : 'text-gray-700 dark:text-gray-300'
          }`}>
            {step.title}
          </h3>
          <span className={`text-xs px-2 py-0.5 rounded ${
            step.category === 'backend'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              : 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300'
          }`}>
            {step.category === 'backend' ? 'Backend' : 'Frontend'}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {step.description}
        </p>
      </div>
    </div>
  );
};

const EvaluateModal = ({ isOpen, onClose, onComplete }) => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const metricsContainerRef = useRef(null);
  
  // Reset state when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsProcessing(true);
      setIsComplete(false);
      
      // Start processing
      startProcessing();
    }
  }, [isOpen]);
  
  // Auto-scroll to the current step
  useEffect(() => {
    if (metricsContainerRef.current && currentStep > 0) {
      const activeElement = metricsContainerRef.current.querySelector(`[data-metric-index="${currentStep}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStep]);
  
  // Simulate the processing
  const startProcessing = useCallback(() => {
    // Simulate each step taking 1 second for a faster demo (with 20 steps)
    const interval = setInterval(() => {
      setCurrentStep(prevStep => {
        const nextStep = prevStep + 1;
        
        // Check if we've completed all steps
        if (nextStep >= evaluationSteps.length) {
          clearInterval(interval);
          setIsProcessing(false);
          setIsComplete(true);
          
          // Call the onComplete callback
          if (onComplete) {
            setTimeout(onComplete, 1000);
          }
          
          return prevStep;
        }
        
        return nextStep;
      });
    }, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [onComplete]);
  
  // Determine step status
  const getStepStatus = (index) => {
    // ONLY show the active state for the EXACT current step being processed
    if (index === currentStep && isProcessing && !isComplete) return 'active';
    // Mark previous steps as completed
    if (index < currentStep) return 'completed';
    // Mark all metrics as completed when evaluation is complete
    if (isComplete) return 'completed';
    // Default state is pending
    return 'pending';
  };
  
  // Handle cancel during processing
  const handleClose = () => {
    // Always allow closing the modal
    onClose();
  };
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} // Always allow closing
      title="System Evaluation"
    >
      <div className="py-2 px-3">
        {/* Category Headings */}
        <div className="mb-4 flex gap-2">
          <div className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs font-medium">
            Backend Metrics
          </div>
          <div className="px-3 py-1 bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 rounded-full text-xs font-medium">
            Frontend Metrics
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="mb-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: isComplete ? '100%' : `${(currentStep / evaluationSteps.length) * 100}%` }}
          ></div>
        </div>
        
        {/* Processing steps */}
        <div ref={metricsContainerRef} className="mb-6 max-h-[60vh] overflow-y-auto pr-2">
          <div className="pb-[3px]">
            {evaluationSteps.map((step, index) => (
              <div key={step.id} data-metric-index={index}>
                <ProcessStep
                  step={step}
                  status={getStepStatus(index)}
                  index={index}
                  activeStep={currentStep}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Success message when complete */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800"
            >
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" size={24} />
                <div>
                  <h3 className="font-semibold text-green-700 dark:text-green-300">Evaluation Complete!</h3>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    All 20 metrics have been successfully evaluated.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Button area */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClose}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isProcessing
                ? 'bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                : 'bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700'
            }`}
          >
            {isComplete ? 'Close' : 'Cancel'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EvaluateModal; 