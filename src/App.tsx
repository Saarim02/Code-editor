import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

type FileType = {
  name: string;
  language: string;
  code: string;
  active: boolean;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState('dark'); // Default theme is 'dark'
  const [files, setFiles] = useState<FileType[]>([
    { name: 'main.js', language: 'javascript', code: '// Type your JavaScript code here...', active: true },
    { name: 'styles.css', language: 'css', code: '/* Type your CSS code here... */', active: false },
  ]);
  const [fileName, setFileName] = useState('');
  const codeEditorRef = useRef<HTMLDivElement>(null); // Reference for the editor

  const activeFile = files.find(file => file.active);

  // Handle switching between files
  const handleFileClick = (index: number) => {
    const updatedFiles = files.map((file, i) => ({
      ...file,
      active: i === index,
    }));
    setFiles(updatedFiles);
  };

  // Handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedFiles = files.map(file => (file.active ? { ...file, language: e.target.value } : file));
    setFiles(updatedFiles);
  };

  // Handle code editor input
  const handleCodeChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newCode = e.currentTarget.innerText || '';
    const updatedFiles = files.map(file => (file.active ? { ...file, code: newCode } : file));
    setFiles(updatedFiles);
  };

  // Ensure that when the file changes, the code editor is updated correctly
  useEffect(() => {
    if (codeEditorRef.current && activeFile) {
      codeEditorRef.current.textContent = activeFile.code;
    }
  }, [activeFile]);

  // Get default content based on file type
  const getDefaultContent = (fileExtension: string) => {
    switch (fileExtension) {
      case 'js':
        return '// Type your JavaScript code here...';
      case 'ts':
        return '// Type your TypeScript code here...';
      case 'css':
        return '/* Type your CSS code here... */';
      default:
        return '';
    }
  };

  // Handle file creation
  const handleCreateFile = () => {
    if (fileName) {
      const fileExtension = fileName.split('.').pop(); // Get the file extension (e.g., 'js', 'ts', 'css')
      const newFile: FileType = {
        name: fileName,
        language: fileExtension === 'ts' ? 'typescript' : fileExtension === 'css' ? 'css' : 'javascript',
        code: getDefaultContent(fileExtension || ''),
        active: false,
      };
      setFiles([...files, newFile]);
      setFileName('');
    }
  };

  // Handle file deletion
  const handleDeleteFile = (index: number) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
    }
};

  // Toggle theme (light/dark)
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`app-container ${theme}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Files</h2>
        <ul>
          {files.map((file, index) => (
            <li
              key={file.name}
              className={file.active ? 'active' : ''}
              onClick={() => handleFileClick(index)}
            >
              {file.name}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="New file name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <button onClick={handleCreateFile}>Add New File</button>
      </div>

      {/* Code Editor */}
      <div className="code-editor-container">
        <div className="controls">
          <select value={activeFile?.language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="css">CSS</option>
          </select>
          <div>
            <button onClick={() => alert('Code saved!')}>Save</button>
            <button
              onClick={() => handleDeleteFile(files.findIndex(file => file.active))}
              disabled={files.length <= 1}
            >
              Delete File
            </button>
            <button onClick={toggleTheme}>
              {theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            </button>
          </div>
        </div>

        {/* ContentEditable Code Editor */}
        <div
          id="codeEditor"
          ref={codeEditorRef}
          className="code-editor"
          contentEditable="true"
          onInput={handleCodeChange}
        ></div>
      </div>
    </div>
  );
};

export default App;
