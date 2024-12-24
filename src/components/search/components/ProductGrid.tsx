import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  hoveredProduct: string | null;
  setHoveredProduct: (id: string | null) => void;
  setSelectedProduct: (product: Product | null) => void;
  lastProductRef?: (node: HTMLDivElement) => void;
}

const ProductGrid = ({
  products,
  hoveredProduct,
  setHoveredProduct,
  setSelectedProduct,
  lastProductRef
}: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
      {products.map((product, index) => (
        <div
          key={product.id}
          ref={index === products.length - 1 ? lastProductRef : undefined}
        >
          <ProductCard
            product={product}
            isHovered={hoveredProduct === product.id}
            onHoverStart={() => setHoveredProduct(product.id)}
            onHoverEnd={() => setHoveredProduct(null)}
            onClick={() => setSelectedProduct(product)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;