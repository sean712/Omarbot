import React, { useState, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import ChatHeader from '../components/chat/ChatHeader';
import ChatInput from '../components/chat/ChatInput';
import ErrorMessage from '../components/chat/ErrorMessage';
import MessageList from '../components/chat/MessageList';
import SamplePrompts from '../components/chat/SamplePrompts';

const ChatPage: React.FC = () => {
  const { messages, isLoading, error, sendMessage, initializeChat } = useChat();
  const [input, setInput] = useState('');

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  const handleSamplePrompt = (prompt: string) => {
    setInput(prompt);
  };
  return (
    <div className="h-full">
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden h-full flex flex-col">
        <ChatHeader />
        {error && <ErrorMessage message={error} />}
        
        {messages.length === 0 && (
          <div className="p-8 text-center bg-gradient-to-br from-imperial-teal/10 to-white flex-1 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-imperial-navy mb-4">
              Welcome to Marketing Management
            </h2>
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-gray-700 mb-6">
                I'm Professor Omar Merlo, and I'm here to help you with your Marketing Management studies in the Global MBA programme. You can ask me about marketing concepts, strategies, case studies, or get help with your assignments.
              </p>
            </div>
            <SamplePrompts onPromptClick={handleSamplePrompt} />
          </div>
        )}
        
        <MessageList messages={messages} />
        <ChatInput
          input={input}
          isLoading={isLoading}
          error={error}
          onInputChange={setInput}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ChatPage;