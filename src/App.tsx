import React from 'react';
import { PromptPage } from './pages/PromptPage';

function App() {
  const [projectIdea, setProjectIdea] = React.useState('');

  // Modified to only save the idea without changing steps
  const handleSaveIdea = (idea: string) => {
    if (idea) {
      setProjectIdea(idea);
      // No step change, so it stays on homepage
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PromptPage onNext={handleSaveIdea} />
    </div>
  );
}

export default App;