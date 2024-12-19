import React from 'react';

interface ResizeHandleProps {
  startResizing: () => void;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ startResizing }) => {
  return (
    <div
      className="absolute top-0 right-0 w-1 h-full cursor-ew-resize group"
      onMouseDown={startResizing}
    >
      <div className="absolute inset-y-0 right-0 w-4 group-hover:bg-blue-500/20 transition-colors -mr-2" />
    </div>
  );
};

export default ResizeHandle;