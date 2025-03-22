import React from 'react';
import { Sparkles, Upload, Globe, Brain } from 'lucide-react';
import { Button } from '../components/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { Footer } from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import BackendFrontendOverview from './BackendFrontendOverview';

interface PromptPageProps {
  onNext: (idea: string) => void;
}

export function PromptPage({ onNext }: PromptPageProps) {
  const [idea, setIdea] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [globeEnabled, setGlobeEnabled] = React.useState(false);
  const [deepThinkEnabled, setDeepThinkEnabled] = React.useState(false);
  const [showDesign, setShowDesign] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const typingTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onNext(idea);
      // Show loading for 2 seconds before navigating
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to the backend-frontend-overview page
        navigate('/backend-frontend-overview');
      }, 2000);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIdea(e.target.value);
    setIsTyping(true);

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to hide typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const examples = [
    {
      text: "I want to build a task management app with real-time collaboration",
      icon: "✓",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      text: "Create a social platform for book lovers to share reviews and recommendations",
      icon: "♥",
      gradient: "from-cyan-400 to-teal-400"
    },
    {
      text: "Design an e-commerce platform specialized in handmade crafts",
      icon: "★",
      gradient: "from-teal-400 to-emerald-400"
    }
  ];

  const handleUpload = () => {
    // Trigger file input click
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    console.log('Files selected:', e.target.files);
    // You can implement the file handling logic here
  };

  // If showDesign is true, render the BackendFrontendOverview component
  if (showDesign) {
    return <BackendFrontendOverview />;
  }

  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50' 
        : 'bg-[#343541]'
    }`}>
      <header className="fixed top-0 w-full px-4 py-3 flex justify-end z-10">
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl space-y-10 text-center">
            <div className={`space-y-4 ${
              theme === 'light' ? 'text-blue-700' : 'text-white'
            }`}>
              <div className="flex items-center justify-center space-x-3">
                <Sparkles className="w-8 h-8" />
                <h1 className={`text-4xl font-bold tracking-tight ${
                  theme === 'light' ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent' : ''
                }`}>Unified Planner-to-Designer</h1>
              </div>
              <p className={`text-lg ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}>
                Transform your idea into a complete technical product using AI
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <div className={`relative rounded-2xl shadow-sm ${
                theme === 'light'
                  ? 'bg-white/90 border border-blue-100'
                  : 'bg-[#40414F] border border-gray-700'
              }`}>
                <textarea
                  value={idea}
                  onChange={handleTyping}
                  placeholder="Describe your product idea in detail..."
                  className={`w-full h-32 p-4 rounded-2xl resize-none focus:outline-none focus:ring-0 ${
                    theme === 'light'
                      ? 'bg-white/90 text-gray-900 placeholder-gray-400'
                      : 'bg-[#40414F] text-white placeholder-gray-400'
                  }`}
                />
                
                {/* Bottom toolbar with buttons */}
                <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                  {/* Upload button */}
                  <button
                    type="button"
                    onClick={handleUpload}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      theme === 'light'
                        ? 'text-blue-600 hover:bg-blue-50'
                        : 'text-gray-400 hover:bg-gray-700'
                    }`}
                    title="Upload files"
                  >
                    <Upload size={18} />
                  </button>
                  
                  {/* Hidden file input */}
                  <input 
                    type="file"
                    id="file-upload"
                    accept=".pdf,image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                  />
                  
                  {/* Globe toggle button */}
                  <button
                    type="button"
                    onClick={() => setGlobeEnabled(!globeEnabled)}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      globeEnabled
                        ? 'bg-cyan-600 text-white'
                        : theme === 'light'
                          ? 'text-blue-600 hover:bg-blue-50'
                          : 'text-gray-400 hover:bg-gray-700'
                    }`}
                    title="Web search"
                  >
                    <Globe size={18} />
                  </button>
                  
                  {/* DeepThink button */}
                  <button
                    type="button"
                    onClick={() => setDeepThinkEnabled(!deepThinkEnabled)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      deepThinkEnabled
                        ? 'bg-teal-600 text-white'
                        : theme === 'light'
                          ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <Brain size={16} />
                      <span>DeepThink</span>
                    </div>
                  </button>
                </div>
                
                <div className={`absolute bottom-3 right-3 transition-opacity duration-200 ${
                  isTyping ? 'opacity-0' : 'opacity-100'
                }`}>
                  <Button 
                    type="submit"
                    disabled={!idea.trim() || isLoading}
                    className="py-2 px-4 text-sm shadow-sm relative"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span>Generating...</span>
                      </div>
                    ) : (
                      "Generate Design"
                    )}
                  </Button>
                </div>
              </div>
            </form>

            <div className="space-y-6">
              <h2 className={`text-sm text-center uppercase tracking-wider font-medium ${
                theme === 'light' ? 'text-blue-500' : 'text-gray-400'
              }`}>
                Example Ideas
              </h2>
              <div className="grid gap-3">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setIdea(example.text)}
                    className={`p-4 rounded-xl text-left transition-all duration-300 relative overflow-hidden group ${
                      theme === 'light'
                        ? 'bg-white/90 text-gray-700 shadow-sm border border-cyan-100'
                        : 'bg-[#40414F] text-gray-300 border border-gray-700'
                    }`}
                  >
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r ${example.gradient}`}></div>
                    
                    {/* Icon circle */}
                    <div className="flex items-start mb-1">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
                        theme === 'light' 
                          ? `bg-gradient-to-br ${example.gradient} text-white` 
                          : 'bg-gray-700 text-cyan-300'
                      }`}>
                        <span>{example.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          theme === 'light' 
                            ? 'text-gray-800' 
                            : 'text-gray-200'
                        }`}>
                          {example.text}
                        </p>
                        <p className={`text-xs mt-1 ${
                          theme === 'light' 
                            ? 'text-gray-500' 
                            : 'text-gray-400'
                        }`}>
                          Click to use this example
                        </p>
                      </div>
                    </div>
                    
                    {/* Indicator for selection */}
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r ${example.gradient}`}></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 