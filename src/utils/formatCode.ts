export const formatCode = (code: string, language: string): string => {
    if (language === 'javascript' || language === 'typescript') {
      return code
        .split('\n')
        .map((line) => line.trim())
        .join('\n');
    }
    return code;
  };
  