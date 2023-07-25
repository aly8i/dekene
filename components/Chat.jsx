import React from 'react'
import styles from "../styles/Chat.module.css"
import ChatIcon from '@mui/icons-material/Chat';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect,useRef } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import ChatBox from './ChatBox';
const Chat = () => {
  const user = useSelector((state) => state.user);
  const [opened,setOpened] = useState(false);

  const toggleChat = () =>{
    if(opened==false)
        setOpened(true);
    else
        setOpened(false);
  }

  return (
    <>
        {
            user.username!="Guest"&&    
            <>
                <div className={`${styles.searchContainer} ${opened&&styles.chat}`}  onClick={()=>{if(opened==false) toggleChat()}}>
                {
                    opened==true&&
                    <ChatBox/>
                }
                <a className={`${styles.searchBtn}`} >
                    {
                    opened==false&&
                    <ChatIcon className={styles.icon}/>
                    }
                </a>
                </div>
                {
                    opened==true&&
                    <a className={`${styles.searchBtn}`} >
                        <div className={`${styles.searchContainer}`} onClick={()=>toggleChat()}>
                            <ClearIcon className={styles.icon}/>
                        </div>
                    </a>
                }
            </>
        }
    </>
  )
}

export default Chat


