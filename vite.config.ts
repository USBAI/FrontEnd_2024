import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Function to get all project names
const getProjectNames = () => {
  const projectsDir = path.join(process.cwd(), 'projects');
  if (!fs.existsSync(projectsDir)) return [];
  return fs.readdirSync(projectsDir);
};

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        ...Object.fromEntries(
          getProjectNames().map(name => [
            name,
            `projects/${name}/index.html`
          ])
        )
      }
    }
  }
});