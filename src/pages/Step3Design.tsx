import React from 'react';

interface Step3DesignProps {
  onBack: () => void;
}

export function Step3Design({ onBack }: Step3DesignProps) {
  // Empty handler - does nothing when the button is clicked
  const handleGenerateDesign = () => {
    // Intentionally empty - button does nothing
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">Design Generator</h2>
        
        <button 
          className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-lg hover:from-violet-700 hover:to-purple-700 transition-colors"
          onClick={handleGenerateDesign}
        >
          Generate Design
        </button>

        <div className="mt-8">
          <button 
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            onClick={onBack}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}