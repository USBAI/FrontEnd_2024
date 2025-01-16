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
          <div className="relative group mb-2 justify-end flex">
            <img
              src={message.image}
              alt="Uploaded"
              className="max-h-48 rounded-lg ml-auto" 
            />
            {message.status === 'processing' && (
              <ImageProcessingOverlay image={message.image} />
            )}
          </div>

          
        )}
      </div>
      <div className='usermessagesstyle'>
        <p className="whitespace-pre-wrap text-[15px] text-gray-800">{message.content}</p>
      </div>
    </>
  );
};

export default UserMessage;