import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '../types';
import { ViewProductButton } from './ViewProductButton';

interface BotMessageProps {
  message: Message;
  onViewProduct?: (product: string) => void;
}

const BotMessage: React.FC<BotMessageProps> = ({ message, onViewProduct }) => {
  let parsedContent = null;
  try {
    parsedContent = JSON.parse(message.content);
  } catch (e) {
    // Not JSON, use raw content
  }

  const displayContent = parsedContent?.response || message.content;
  const isViewable = parsedContent?.additional_data?.open === true;
  const product = parsedContent?.additional_data?.product;

  return (
    <div className="rounded-2xl px-4 py-0 max-w-[85%] relative group">
      <p className="whitespace-pre-wrap text-xs md:text-sm text-gray-800">{displayContent}</p>
      
      {isViewable && product && (
        <ViewProductButton 
          product={product} 
          onViewProduct={onViewProduct} 
        />
      )}
    </div>
  );
};

export default BotMessage;