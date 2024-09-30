import { listen } from '@tauri-apps/api/event';
import  {useEffect} from 'react';

function Drag_and_drop({ onFileDrop }) {
  useEffect(() => {
    // 监听文件拖拽事件
    const unlisten = listen('tauri://file-drop', (event) => {
      const files = event.payload; // 拖拽的文件路径数组
      console.log('Files dropped:', files);
      if (files && files.length > 0) {
        console .log (typeof (files[0]), files[0])
        onFileDrop (files[0])
      }
    });

    return () => {
      // 组件卸载时移除监听器
      unlisten.then((f) => f());
    };
  }, []);

  return (
    <div
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
        textAlign: 'center',
      }}
    >
      Drag and drop a file here
    </div>
  );
}

export default Drag_and_drop;
