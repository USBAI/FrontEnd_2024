import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Check, X } from 'lucide-react';
import { Message } from '../types';
import TypingAnimation from './TypingAnimation';

interface MessageBubbleProps {
  message: Message;
  onEdit?: (messageId: string, content: string) => void;
  onSave?: (messageId: string, content: string) => void;
  onCancel?: (messageId: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onEdit,
  onSave,
  onCancel,
}) => {
  const [editingContent, setEditingContent] = React.useState('');

  return (
    <div
      className={`rounded-2xl px-4 py-3 ${
        message.type === 'user'
          ? 'bg-white/10 backdrop-blur-sm text-white border border-white/20 ml-auto max-w-[85%] group relative'
          : 'bg-gray-800/50 backdrop-blur-xl border border-white/10 max-w-[85%]'
      }`}
    >
      {message.image && (
        <div className="relative group mb-2">
          <img
            src={message.image}
            alt="Uploaded"
            className="max-h-48 rounded-lg mx-auto"
          />
          {message.status === 'processing' && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  {/* AI Scanning Animation */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent animate-scan" />
                  <img
                    src={message.image}
                    alt="Processing"
                    className="max-h-48 rounded-lg opacity-50"
                  />
                </div>
                <p className="text-xs text-blue-200">AI Processing Image...</p>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="relative">
        {message.type === 'user' && message.isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-base md:text-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              rows={3}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => onCancel?.(message.id)}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <X className="h-4 w-4 text-red-400" />
              </button>
              <button
                onClick={() => onSave?.(message.id, editingContent)}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <Check className="h-4 w-4 text-green-400" />
              </button>
            </div>
          </div>
        ) : (
          <div className="relative group">
            {message.isTyping ? (
              <TypingAnimation />
            ) : (
              <p className={`whitespace-pre-wrap font-medium ${
                message.type === 'user' ? 'text-base md:text-lg' : 'text-xs md:text-sm'
              }`}>
                {message.content}
              </p>
            )}
            {message.type === 'user' && (
              <button
                onClick={() => onEdit?.(message.id, message.content)}
                className="absolute -right-8 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all"
              >
                <Edit2 className="h-3.5 w-3.5 text-white/70" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;