import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image as ImageIcon, X, SendHorizontal, ImagePlus } from 'lucide-react';
import ImageEditor from './ImageEditor';

interface ChatInputProps {
  onSendMessage: (text: string, image?: File) => Promise<void>;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [isHovered, setIsHovered] = useState({ send: false, image: false });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setShowImageEditor(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
              setImagePreview(reader.result as string);
              setShowImageEditor(true);
            };
            reader.readAsDataURL(file);
          }
        }
      }
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!input.trim() && !selectedImage) return;
    
    const imageToSend = selectedImage;
    setInput('');
    removeImage();
    
    await onSendMessage(input, imageToSend || undefined);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleEditedImage = (editedImage: File) => {
    setSelectedImage(editedImage);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(editedImage);
    setShowImageEditor(false);
  };

  return (
    <>
      <div className="relative w-full">
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-4 w-24 mx-auto"
          >
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl cursor-pointer shadow-lg"
              onClick={() => setShowImageEditor(true)}
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
        
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
          
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            onPaste={handlePaste}
            placeholder="Type your message..."
            className="w-full px-14 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg"
            disabled={isLoading}
          />

          <motion.button
            onClick={() => fileInputRef.current?.click()}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-all duration-300"
            disabled={isLoading}
            onHoverStart={() => setIsHovered(prev => ({ ...prev, image: true }))}
            onHoverEnd={() => setIsHovered(prev => ({ ...prev, image: false }))}
            whileHover="hover"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isHovered.image ? 'hoveredImage' : 'defaultImage'}
                initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
              >
                {isHovered.image ? (
                  <ImagePlus className="h-5 w-5 text-blue-400" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-blue-400" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <motion.button
            onClick={handleSubmit}
            disabled={isLoading || (!input.trim() && !selectedImage)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onHoverStart={() => setIsHovered(prev => ({ ...prev, send: true }))}
            onHoverEnd={() => setIsHovered(prev => ({ ...prev, send: false }))}
            whileHover="hover"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-5 w-5 border-2 border-blue-400 border-t-transparent rounded-full"
                />
              ) : (
                <motion.div
                  key={isHovered.send ? 'hoveredSend' : 'defaultSend'}
                  initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                >
                  {isHovered.send ? (
                    <SendHorizontal className="h-5 w-5 text-blue-400" />
                  ) : (
                    <Send className="h-5 w-5 text-blue-400" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showImageEditor && imagePreview && (
          <ImageEditor
            imageUrl={imagePreview}
            onClose={() => setShowImageEditor(false)}
            onSave={handleEditedImage}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatInput;