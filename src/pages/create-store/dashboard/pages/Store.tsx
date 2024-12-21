import React, { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import StorePreview from '../components/StorePreview';

const Store = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hi! I'm Kluret AI. Let's build your dream store together! What type of products would you like to sell?",
      sender: 'ai'
    }
  ]);

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Great choice! I'll help you set up your store with those products. Let me analyze the market trends...",
        sender: 'ai'
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-7rem)] grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Store Preview */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden">
        <StorePreview />
      </div>

      {/* Chat Interface */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden">
        <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Store;