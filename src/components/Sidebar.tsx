import React, { useState } from 'react';

interface SidebarProps {
  files: string[];
  currentFile: string;
  setCurrentFile: React.Dispatch<React.SetStateAction<string>>;
  createFile: (filename: string) => void;
  deleteFile: (filename: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ files, currentFile, setCurrentFile, createFile, deleteFile }) => {
  const [newFile, setNewFile] = useState('');

  const handleCreateFile = () => {
    if (newFile) {
      createFile(newFile);
      setNewFile('');
    }
  };

  return (
    <div className="sidebar">
      <h3>Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file} className={file === currentFile ? 'active' : ''}>
            <span onClick={() => setCurrentFile(file)}>{file}</span>
            <button onClick={() => deleteFile(file)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newFile}
        onChange={(e) => setNewFile(e.target.value)}
        placeholder="New file name"
      />
      <button onClick={handleCreateFile}>Create File</button>
    </div>
  );
};

export default Sidebar;



