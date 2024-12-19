import React from 'react';
import { Message } from '../types';
import ImageProcessingOverlay from './ImageProcessingOverlay';

interface UserMessageProps {
  message: Message;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="rounded-2xl px-4 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 ml-auto max-w-[85%] group relative">
      {message.image && (
        <div className="relative group mb-2">
          <img
            src={message.image}
            alt="Uploaded"
            className="max-h-48 rounded-lg mx-auto"
          />
          {message.status === 'processing' && (
            <ImageProcessingOverlay image={message.image} />
          )}
        </div>
      )}
      <p className="whitespace-pre-wrap text-base md:text-lg">{message.content}</p>
    </div>
  );
};

export default UserMessage;