import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductImageGalleryProps {
  images: string[];
  currentIndex: number;
  onImageSelect: (index: number) => void;
  productName: string;
}

const ProductImageGallery = ({ images, currentIndex, onImageSelect, productName }: ProductImageGalleryProps) => {
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - startX;
    if (deltaX > 50) {
      // Swipe right
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      onImageSelect(prevIndex);
    } else if (deltaX < -50) {
      // Swipe left
      const nextIndex = (currentIndex + 1) % images.length;
      onImageSelect(nextIndex);
    }
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onImageSelect(prevIndex);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    onImageSelect(nextIndex);
  };

  return (
    <div className="space-y-4">
      {/* Main Image with Left and Right Arrows */}
      <div
        className="relative aspect-square bg-white rounded-lg overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt={productName}
          className="w-full h-full object-contain"
        />
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full flex items-center justify-center"
        >
          &#8249;
        </button>
        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full flex items-center justify-center"
        >
          &#8250;
        </button>

      </div>
      {/* Dots for Navigation */}
      <div className="flex justify-center mt-2 space-x-2 bg-gray-200 rounded-full p-1 w-fit m-auto">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? 'bg-pink-400' : 'bg-white'
            }`}
          ></div>
        ))}
      </div>
      {/* Small Thumbnails */}
      {images.length > 1 ? (
        <div className="flex justify-center mt-2 space-x-2 gap-4 max-w-[90%] flex-wrap m-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`aspect-square rounded-lg overflow-hidden w-16 h-16 ${
                currentIndex === index ? 'border-black' : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt={`${productName} ${index + 1}`}
                className="w-16 h-16 object-cover"
              />
            </button>
          ))}
        </div>

      ) : (
        <div className="flex justify-center mt-2 space-x-2 gap-4">
          {/* Display the main image as a fallback after 7 seconds */}
          <div
            key="main"
            className="aspect-square rounded-lg overflow-hidden w-16 h-16 bg-gray-300"
            style={{
              animation: 'fadeIn 7s linear forwards',
              display: 'block',
            }}
          >
            <img
              src={images[0]} // The main image as fallback
              alt={`${productName} Fallback`}
              className="w-full h-full object-cover hidden"
              style={{
                animation: 'fadeIn 7s linear forwards',
                display: 'block',
              }}
            />
          </div>
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden w-16 h-16 animate-pulse bg-gray-300"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
 