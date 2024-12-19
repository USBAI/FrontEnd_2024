import React from 'react';
import { motion } from 'framer-motion';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '../../../../components/search/hooks/useCart';

interface CartItemListProps {
  items: CartItemType[];
}

const CartItemList = ({ items }: CartItemListProps) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CartItem item={item} />
        </motion.div>
      ))}
    </div>
  );
};

export default CartItemList;