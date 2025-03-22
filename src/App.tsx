import React from 'react';
import { StepWizard } from './components/StepWizard';
import { Step0Home } from './pages/Step0Home';
import { Step1Planning } from './pages/Step1Planning';
import { Step2Requirements } from './pages/Step2Requirements';
import { Step3Design } from './pages/Step3Design';

function App() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [projectIdea, setProjectIdea] = React.useState('');

  const handleNext = (idea?: string) => {
    if (idea) {
      setProjectIdea(idea);
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep > 0 && <StepWizard currentStep={currentStep} />}
      
      {currentStep === 0 && <Step0Home onNext={handleNext} />}
      {currentStep === 1 && <Step1Planning onNext={handleNext} onBack={handleBack} />}
      {currentStep === 2 && <Step2Requirements onNext={handleNext} onBack={handleBack} />}
      {currentStep === 3 && <Step3Design onBack={handleBack} />}
    </div>
  );
}

export default App;