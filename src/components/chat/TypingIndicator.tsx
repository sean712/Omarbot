import React from 'react';
import { Bot } from 'lucide-react';

interface TypingIndicatorProps {
  botImage: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ botImage }) => {
  return (
    <div className="flex justify-start mb-6 animate-fade-in">
      <div className="flex items-start max-w-[70%] flex-row">
        <div className="flex items-center justify-center w-10 h-10 rounded-full mr-3 bg-white border border-gray-200 shadow-sm">
          <img 
            src={botImage}
            alt="Teaching Assistant" 
            className="w-10 h-10 object-cover rounded-full"
          />
        </div>
        <div className="bg-white border border-gray-100 text-gray-800 rounded-lg rounded-bl-none px-4 py-3 shadow-sm">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-imperial-teal rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-imperial-teal rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-imperial-teal rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;