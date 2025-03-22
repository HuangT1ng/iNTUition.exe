import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface StepWizardProps {
  currentStep: number;
}

const steps = [
  { title: 'Idea', description: 'Share your vision' },
  { title: 'Planning', description: 'Scope & timeline' },
  { title: 'Requirements', description: 'Detailed analysis' },
  { title: 'Design', description: 'System architecture' },
];

export function StepWizard({ currentStep }: StepWizardProps) {
  return (
    <div className="w-full py-4 px-6">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center relative">
            {index > 0 && (
              <div
                className={`absolute w-full h-1 top-4 -left-1/2 ${
                  index <= currentStep ? 'bg-indigo-500' : 'bg-gray-200'
                }`}
              />
            )}
            {index <= currentStep ? (
              <CheckCircle className="w-8 h-8 text-indigo-500" />
            ) : (
              <Circle className="w-8 h-8 text-gray-300" />
            )}
            <p className="mt-2 text-sm font-medium text-gray-900">{step.title}</p>
            <p className="text-xs text-gray-500">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}