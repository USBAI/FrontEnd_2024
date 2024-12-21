import React from 'react';

interface StorePreviewContentProps {
  content: string;
}

const StorePreviewContent = ({ content }: StorePreviewContentProps) => {
  // Create a blob URL for the content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          ${content}
          ReactDOM.render(<App />, document.getElementById('root'));
        </script>
        <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
      </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  return (
    <iframe
      src={url}
      className="w-full h-full border-0"
      title="Store Preview"
      sandbox="allow-scripts"
    />
  );
};

export default StorePreviewContent;