import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PromptPage } from './pages/PromptPage';
// @ts-ignore
import BackendFrontendOverview from './pages/BackendFrontendOverview';
// @ts-ignore
import EvaluationResult from './pages/EvaluationResult';

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
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<PromptPage onNext={handleSaveIdea} />} />
          <Route path="/backend-frontend-overview" element={<BackendFrontendOverview />} />
          <Route path="/evaluation-results" element={<EvaluationResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;