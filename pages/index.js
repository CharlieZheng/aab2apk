import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Drag_and_drop from './widgets/drag_and_drop'
import Select_file from './widgets/select_file'
import React, {useState} from 'react';
import { invoke } from '@tauri-apps/api/tauri'

const geistSans = localFont({
    src: "./fonts/GeistVF.woff", variable: "--font-geist-sans", weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono", weight: "100 900",
});

function aab2apk(event) {
          invoke('aab2apk', { name: JSON.stringify(event.target.value) })
            .then(console.log)
            .catch(console.error)
} 
const Body = () => {
    const [aab_file_abs_Path, setAab_file_abs_Path] = useState('');

    function file_selected (path) {
        setAab_file_abs_Path(path)
    }
       
    return (<div><Drag_and_drop onFileDrop={file_selected}
       
        style={{
            border: '2px dashed #ccc', padding: '20px', borderRadius: '10px', width: '700px', 
        }}
    ><p>Drag and drop a file here</p>
     
    </Drag_and_drop><Select_file on_file_selected={file_selected}/>
    <button onClick={aab2apk} value={aab_file_abs_Path}>aab2apk</button>
    
    </div>);
};
export default function Home() {
    return (<>
        <Head>
            <title>aab2apk</title>
           
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
            <main className={styles.main}>
                
  <Body/>
              

            </main>
            <footer className={styles.footer}>
              
            </footer>
        </div>
    </>);
}
