import React from 'react';
import { Sparkles, Upload, Globe, Brain } from 'lucide-react';
import { Button } from '../components/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { Footer } from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

interface Step0HomeProps {
  onNext: (idea: string) => void;
}

export function Step0Home({ onNext }: Step0HomeProps) {
  const [idea, setIdea] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [globeEnabled, setGlobeEnabled] = React.useState(false);
  const [deepThinkEnabled, setDeepThinkEnabled] = React.useState(false);
  const typingTimeoutRef = React.useRef<NodeJS.Timeout>();
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onNext(idea);
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
    "I want to build a task management app with real-time collaboration",
    "Create a social platform for book lovers to share reviews and recommendations",
    "Design an e-commerce platform specialized in handmade crafts"
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

  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'light' 
        ? 'bg-gray-50' 
        : 'bg-[#343541]'
    }`}>
      <header className="fixed top-0 w-full px-4 py-3 flex justify-end z-10">
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl space-y-10 text-center">
            <div className={`space-y-4 ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}>
              <div className="flex items-center justify-center space-x-3">
                <Sparkles className="w-8 h-8" />
                <h1 className="text-4xl font-bold tracking-tight">Unified Planner-to-Designer</h1>
              </div>
              <p className={`text-lg ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                Transform your product idea into a complete technical blueprint using AI.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <div className={`relative rounded-2xl shadow-sm ${
                theme === 'light'
                  ? 'bg-white border border-gray-200'
                  : 'bg-[#40414F] border border-gray-700'
              }`}>
                <textarea
                  value={idea}
                  onChange={handleTyping}
                  placeholder="Describe your product idea in detail..."
                  className={`w-full h-32 p-4 rounded-2xl resize-none focus:outline-none focus:ring-0 ${
                    theme === 'light'
                      ? 'bg-white text-gray-900 placeholder-gray-400'
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
                        ? 'text-gray-500 hover:bg-gray-100'
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
                        ? 'bg-indigo-600 text-white'
                        : theme === 'light'
                          ? 'text-gray-500 hover:bg-gray-100'
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
                        ? 'bg-indigo-600 text-white'
                        : theme === 'light'
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                    disabled={!idea.trim()}
                    className="py-2 px-4 text-sm shadow-sm"
                  >
                    Generate Design
                  </Button>
                </div>
              </div>
            </form>

            <div className="space-y-4">
              <h2 className={`text-sm text-center uppercase tracking-wider font-medium ${
                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Example Ideas
              </h2>
              <div className="grid gap-2">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setIdea(example)}
                    className={`p-4 rounded-xl text-left transition-all duration-200 hover:ring-1 ${
                      theme === 'light'
                        ? 'bg-white text-gray-700 hover:ring-gray-200 shadow-sm'
                        : 'bg-[#40414F] text-gray-300 hover:ring-gray-600'
                    }`}
                  >
                    {example}
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