import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BrowserChrome from './store/BrowserChrome';
import StoreContent from './store/StoreContent';

interface ProjectFile {
  name: string;
  type: string;
  content: string;
}

const StorePreview = () => {
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectFiles = async () => {
      try {
        const response = await fetch('https://usersecommerce-b63eaa16f631.herokuapp.com/file-manager/get_project_files_and_folders/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            project_name: 'NikeStore'
          })
        });

        const data = await response.json();

        if (data.status === 'success' && data.data) {
          setFiles(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch project files');
        }
      } catch (error) {
        console.error('Error fetching project files:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch project files');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectFiles();
  }, []);

  return (
    <div className="h-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
      <BrowserChrome />
      <StoreContent files={files} isLoading={isLoading} error={error} />
    </div>
  );
};

export default StorePreview;