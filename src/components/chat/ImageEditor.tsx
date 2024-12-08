import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pencil, Circle, Download, Check } from 'lucide-react';

interface ImageEditorProps {
  imageUrl: string;
  onClose: () => void;
  onSave: (editedImage: File) => void;
}

const ImageEditor = ({ imageUrl, onClose, onSave }: ImageEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<'pencil' | 'circle'>('pencil');
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      // Calculate aspect ratio to maintain image proportions
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.8;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (maxWidth * height) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (maxHeight * width) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
    };
  }, [imageUrl]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;

    if (tool === 'pencil') {
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === 'circle') {
      const radius = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
      ctx.beginPath();
      ctx.arc(lastX, lastY, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }

    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'edited-image.png', { type: 'image/png' });
        onSave(file);
      }
    }, 'image/png');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
    >
      <div className="relative">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => setTool('pencil')}
            className={`p-2 rounded-lg ${tool === 'pencil' ? 'bg-green-500' : 'bg-gray-700'}`}
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={() => setTool('circle')}
            className={`p-2 rounded-lg ${tool === 'circle' ? 'bg-green-500' : 'bg-gray-700'}`}
          >
            <Circle className="h-5 w-5" />
          </button>
          <button
            onClick={handleSave}
            className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600"
          >
            <Check className="h-5 w-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-red-500 hover:bg-red-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          className="border border-gray-600 rounded-lg cursor-crosshair"
        />
      </div>
    </motion.div>
  );
};

export default ImageEditor;