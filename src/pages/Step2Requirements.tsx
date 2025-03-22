import React from 'react';
import { Button } from '../components/Button';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
}

interface Step2RequirementsProps {
  onNext: () => void;
  onBack: () => void;
}

export function Step2Requirements({ onNext, onBack }: Step2RequirementsProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      text: "Let's analyze your requirements. What specific features do you need?",
      sender: 'ai'
    }
  ]);
  const [input, setInput] = React.useState('');
  const chatRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    }]);
    setInput('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Requirement Analysis
        </h2>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div 
            ref={chatRef}
            className="h-[500px] overflow-y-auto p-6 space-y-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button onClick={handleSend}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext}>
            Proceed to System Design
          </Button>
        </div>
      </div>
    </div>
  );
}