import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, LucideIcon } from 'lucide-react';
import SidebarDetail from './SidebarDetail';

interface SidebarItemProps {
  item: {
    icon: LucideIcon;
    label: string;
    description: string;
    gradient: string;
    path: string;
    details: Array<{
      icon: LucideIcon;
      title: string;
      description: string;
    }>;
  };
  index: number;
  isExpanded: boolean;
  onExpand: () => void;
  onNavigate: (path: string) => void;
}

const SidebarItem = ({ item, index, isExpanded, onExpand, onNavigate }: SidebarItemProps) => {
  const Icon = item.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div
        onClick={onExpand}
        className="w-full relative bg-white hover:bg-pink-50/50 p-4 rounded-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-pink-200"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/20 via-purple-100/20 to-blue-100/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl" />
        <div className="relative">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${item.gradient} bg-opacity-10`}>
              <Icon className="h-5 w-5 text-gray-700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{item.label}</h3>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </motion.div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 space-y-3"
              >
                {item.details.map((detail, detailIndex) => (
                  <SidebarDetail
                    key={detailIndex}
                    detail={detail}
                    index={detailIndex}
                  />
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(item.path);
                  }}
                  className={`w-full mt-4 px-4 py-3 bg-gradient-to-r ${item.gradient} rounded-lg text-white font-medium flex items-center justify-between group hover:shadow-lg transition-all duration-300`}
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default SidebarItem;