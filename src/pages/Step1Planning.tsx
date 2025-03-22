import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  content: string;
}

interface Step1PlanningProps {
  onNext: () => void;
  onBack: () => void;
}

export function Step1Planning({ onNext, onBack }: Step1PlanningProps) {
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);

  const sections: Section[] = [
    {
      id: 'scope',
      title: 'Project Scope',
      content: 'Define the boundaries and objectives of the project...'
    },
    {
      id: 'feasibility',
      title: 'Feasibility Analysis',
      content: 'Technical and business feasibility assessment...'
    },
    {
      id: 'risks',
      title: 'Risk Assessment',
      content: 'Identify potential risks and mitigation strategies...'
    },
    {
      id: 'timeline',
      title: 'Timeline Estimation',
      content: 'Project phases and estimated completion dates...'
    },
    {
      id: 'resources',
      title: 'Required Resources',
      content: 'Team composition and technical requirements...'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Project Planning</h2>

        <div className="grid gap-6">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setExpandedSection(
                  expandedSection === section.id ? null : section.id
                )}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {section.title}
                </h3>
                {expandedSection === section.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {expandedSection === section.id && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{section.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-8">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext}>
            Proceed to Requirement Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}