import React, { useEffect, useRef } from 'react';

interface ProjectFile {
  name: string;
  type: string;
  content: string;
}

interface StoreRendererProps {
  files: ProjectFile[];
}

const StoreRenderer = ({ files }: StoreRendererProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const homepageFile = files.find(file => file.name === 'homepage.tsx');

  useEffect(() => {
    if (!homepageFile || !iframeRef.current) return;

    // Create HTML content with required scripts and the React component
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            ${homepageFile.content}
            ReactDOM.render(<App />, document.getElementById('root'));
          </script>
        </body>
      </html>
    `;

    // Create blob URL and set it as iframe src
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;

    // Cleanup
    return () => URL.revokeObjectURL(url);
  }, [homepageFile]);

  return (
    <div className="h-full bg-white">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Store Preview"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default StoreRenderer;