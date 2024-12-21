import React from 'react';

interface BrowserChromeProps {
  url?: string | null;
}

const BrowserChrome = ({ url }: BrowserChromeProps) => {
  return (
    <div className="bg-gray-800 rounded-t-xl p-2">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 px-2">
          <div className="bg-gray-700 rounded-md h-6 w-full flex items-center px-3">
            <span className="text-xs text-gray-400">
              {url || 'Loading...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserChrome;