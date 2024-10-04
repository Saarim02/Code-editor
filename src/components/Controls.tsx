import React from 'react';

interface ControlsProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  resetCode: () => void;
}

const Controls: React.FC<ControlsProps> = ({ language, setLanguage, resetCode }) => {
  return (
    <div className="controls">
      <label htmlFor="language-select">Language: </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="css">CSS</option>
        <option value="typescript">TypeScript</option>
      </select>
      <button onClick={resetCode}>Reset Code</button>
    </div>
  );
};

export default Controls;


