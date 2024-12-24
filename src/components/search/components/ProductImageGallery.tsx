import React from 'react';
import { motion } from 'framer-motion';

interface ProductImageGalleryProps {
  images: string[];
  currentIndex: number;
  onImageSelect: (index: number) => void;
  productName: string;
}

const ProductImageGallery = ({ images, currentIndex, onImageSelect, productName }: ProductImageGalleryProps) => {
  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={productName}
          className="w-full h-full object-contain"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 ${
                currentIndex === index
                  ? 'border-black'
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              <img
                src={image}
                alt={`${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;