import React from 'react';
import SidebarItem from './sidebar/SidebarItem';
import { navItems } from './sidebar/navItems';

interface SidebarProps {
  isOpen: boolean;
  expandedItem: number | null;
  setExpandedItem: (index: number | null) => void;
  navigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, expandedItem, setExpandedItem, navigate }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="p-6 space-y-4">
        {navItems.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            index={index}
            isExpanded={expandedItem === index}
            onExpand={() => setExpandedItem(expandedItem === index ? null : index)}
            onNavigate={navigate}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;