import React, { useEffect, useState } from 'react';
import { createProjectStructure } from '../../../../../utils/projectManager';
import BrowserChrome from './BrowserChrome';
import StoreRenderer from './StoreRenderer';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

interface ProjectFile {
  name: string;
  type: string;
  content: string;
}

const StorePreview = () => {
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectUrl, setProjectUrl] = useState<string | null>(null);

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
          
          // Create project structure
          const success = await createProjectStructure('NikeStore', data.data);
          if (success) {
            setProjectUrl(`https://nikestore.kluret.com`);
          }
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
      <BrowserChrome url={projectUrl} />
      <div className="h-[calc(100%-2.5rem)]">
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} />
        ) : (
          <StoreRenderer files={files} />
        )}
      </div>
    </div>
  );
};