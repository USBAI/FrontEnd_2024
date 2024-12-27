import React from 'react';
import { Message } from '../types';
import ImageProcessingOverlay from './ImageProcessingOverlay';

interface UserMessageProps {
  message: Message;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <>
      <div className="">
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
      </div>
      <div className='rounded-2xl px-4 py-3 bg-white shadow-sm border border-gray-200 max-w-[100%] relative group'>
        <p className="whitespace-pre-wrap text-xs md:text-sm text-gray-800">{message.content}</p>
      </div>
    </>
  );
};

export default UserMessage;