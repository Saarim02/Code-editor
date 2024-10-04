import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism.css';
import { formatCode } from '../utils/formatCode';
import '../styles.css';

interface CodeEditorProps {
  language: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, code, setCode }) => {
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  useEffect(() => {
    const handleSaveShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        localStorage.setItem('code', code);
        alert('Code saved to local storage');
      }
    };
    window.addEventListener('keydown', handleSaveShortcut);
    return () => window.removeEventListener('keydown', handleSaveShortcut);
  }, [code]);

  const handleFormat = () => {
    setCode(formatCode(code, language));
  };

  return (
    <div className="editor-container">
      <Editor
        value={code}
        onValueChange={handleCodeChange}
        highlight={(code) => Prism.highlight(code, Prism.languages[language], language)}
        padding={10}
        className="code-editor"
      />
      <button onClick={handleFormat}>Format Code</button>
    </div>
  );
};

export default CodeEditor;


