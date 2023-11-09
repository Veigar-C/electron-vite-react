import { useState, useEffect } from 'react'
import UpdateElectron from '@/components/update'
import logoVite from './assets/logo-vite.svg'
import logoElectron from './assets/logo-electron.svg'
import './App.css'
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

// console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)


const getMD =()=>{
  return new Promise((resolve)=>{
    const fs = require('fs');
    const path = 'C:\\Users\\Administrator\\Desktop\\事务日志 - 副本.md';
    fs.readFile(path,'utf-8',(error:any,data:any)=>{
      if(error){
        console.log(error);
        return;
     }
     resolve(data)
    });
  })
}

const setMd =(editor:any)=>{
  const fs = require('fs');
  const path = 'C:\\Users\\Administrator\\Desktop\\事务日志 - 副本.md';
  const value = editor.getMarkdown();
  fs.writeFile(path,value,()=>{

  });
};

function App() {
  // const [count, setCount] = useState(0);
  const [value, setValue] = useState('');
  useEffect(()=>{
    getMD().then((res:any)=>{
      const el = document.querySelector('#editor') as any;
      if(el!==null){
        const editor = new Editor({
          el: el,
          height: '500px',
          initialEditType: 'wysiwyg',
          previewStyle: 'vertical',
          language: 'zh-CN',
          hideModeSwitch: true,
          initialValue: res,
          events: {
            change: ()=>{
              setMd(editor)
            }
          }
        });
        
        editor.getMarkdown();
      }
    })
  },[])

  return (
    <div className='App'>
      <div id="editor">

        {value}
      </div>
    </div>
  )
}

export default App