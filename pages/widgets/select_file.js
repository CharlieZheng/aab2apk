import { open } from '@tauri-apps/api/dialog';
import { useState } from 'react';

function Select_file({on_file_selected}) {
  const [filePath, setFilePath] = useState(null);

  const handleFileSelect = async () => {
    const selected = await open({
      multiple: false, // 是否允许选择多个文件
      filters: [{ name: 'All Files', extensions: ['*'] }] // 文件过滤器
    });

    if (selected) {
      setFilePath(selected);
      console.log('Selected file:', selected);
      on_file_selected (selected )
    }
  };

  return (
    <div>
      <button onClick={handleFileSelect}>Select File</button>
      {filePath && <p>Selected file path: {filePath}</p>}
    </div>
  );
}

export default Select_file;
