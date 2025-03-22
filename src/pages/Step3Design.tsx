import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Download } from 'lucide-react';

interface Step3DesignProps {
  onBack: () => void;
}

export function Step3Design({ onBack }: Step3DesignProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">System Design</h2>

        <Card title="High-Level Design (HLD)" className="mb-6">
          <div className="prose max-w-none">
            <h4 className="text-lg font-medium mb-4">System Architecture</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              {/* Mermaid diagram would go here */}
              <p className="text-gray-600">System architecture diagram...</p>
            </div>
          </div>
        </Card>

        <Card title="Low-Level Design (LLD)" className="mb-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium mb-2">API Endpoints</h4>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">
                  GET /api/v1/resources{'\n'}
                  POST /api/v1/resources{'\n'}
                  PUT /api/v1/resources/:id{'\n'}
                  DELETE /api/v1/resources/:id
                </code>
              </pre>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-2">Database Schema</h4>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">
                  Table: resources{'\n'}
                  - id: uuid PRIMARY KEY{'\n'}
                  - name: varchar(255){'\n'}
                  - description: text{'\n'}
                  - created_at: timestamp
                </code>
              </pre>
            </div>
          </div>
        </Card>

        <div className="flex justify-between">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button>
            <Download className="w-5 h-5 mr-2" />
            Export as PDF
          </Button>
        </div>
      </div>
    </div>
  );
}