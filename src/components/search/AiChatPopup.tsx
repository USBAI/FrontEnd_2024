import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Bot } from 'lucide-react';
import { fetchAiResponse } from './services/productApi';

interface AiChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productInfo: {
    name: string;
    description: string;
  };
}

const AiChatPopup: React.FC<AiChatPopupProps> = ({ isOpen, onClose, productInfo }) => {
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleAiSubmit = async () => {
    if (!aiInput.trim()) return;

    setIsAiLoading(true);
    try {
      const response = await fetchAiResponse(aiInput, productInfo);
      setAiResponse(response);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAiResponse('Sorry, I had trouble processing your request. Please try again.');
    } finally {
      setIsAiLoading(false);
      setAiInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl border border-pink-100/50"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-md opacity-50" />
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="25" height="25" rx="12.5" fill="black"/>
                    <rect x="11" y="4" width="12" height="12" rx="6" fill="white"/>
                    <path d="M0.25293 15H24.7402V15C24.6031 16.1412 23.635 17 22.4856 17H2.5152C1.36436 17 0.394027 16.1422 0.25293 15V15Z" fill="white"/>
                  </svg>
                </div>
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  AI Product Assistant
                </h3>
                <p className="text-sm text-gray-500">Ask me anything about this product</p>
              </div>
            </div>

            {/* Chat Area */}
            <div className="min-h-[100px] max-h-[300px] overflow-y-auto mb-6">
              {aiResponse ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-4 shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-full">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-gray-800 whitespace-pre-wrap flex-1">{aiResponse}</p>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-pink-400" />
                  <p>Ask me about features, specifications, or anything else!</p>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Type your question..."
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-500/50 shadow-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleAiSubmit()}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAiSubmit}
                disabled={isAiLoading || !aiInput.trim()}
                className="flex-shrink-0 p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isAiLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AiChatPopup;