import fs from 'fs';
import path from 'path';

interface ProjectFile {
  name: string;
  type: string;
  content: string;
}

export const createProjectStructure = async (projectName: string, files: ProjectFile[]) => {
  try {
    // Create projects directory if it doesn't exist
    const projectsDir = path.join(process.cwd(), 'projects');
    if (!fs.existsSync(projectsDir)) {
      fs.mkdirSync(projectsDir);
    }

    // Create project directory
    const projectDir = path.join(projectsDir, projectName);
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir);
    }

    // Create files
    for (const file of files) {
      const filePath = path.join(projectDir, file.name);
      fs.writeFileSync(filePath, file.content);
    }

    return true;
  } catch (error) {
    console.error('Error creating project structure:', error);
    return false;
  }
};