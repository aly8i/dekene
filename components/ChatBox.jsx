import React from 'react'
import styles from "../styles/Chat.module.css"
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect,useRef } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import Progress from './Progress';
import { messagesTrigger } from '../functions/triggers';
import { collection,onSnapshot,query,where } from 'firebase/firestore';
import {db} from "../Firebase"
const ChatBox = () => {
    const [message,setMessage] = useState("");
    const [messages,setMessages] = useState([]);
    const [count, setCount] = useState(0);
    const messagesRef = collection(db,"messages");
    const queryMessages = query(messagesRef,where("count",">",-1));
    const timerRef = useRef();
    const user = useSelector((state) => state.user);
    const lastDiv = useRef(null);
    const [loaded,setLoaded] = useState(false);

    useEffect(()=>{
        if(messages.length==0&&!loaded)
            return;
            lastDiv.current?.parentElement?.scrollTo({ top: lastDiv.current?.offsetTop,
                left: 0,
                behavior: 'smooth'
            });
            setLoaded(true);
      },[messages,loaded])
      const refreshChat = async() => {
        if(user.id){
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${user.id}`);
                await (async()=>{
                    setMessages([...res.data.messages]);
                })().then(()=>{
                    lastDiv.current?.scrollIntoView({  behavior: "smooth" });
                });
        }
      }
    useEffect(() => {
        onSnapshot(queryMessages,(snapshot)=>{
            refreshChat();
        })   
      }, []);
    const getDate = () =>{
        const date = new Date;
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
      }
    
      const getTime = () =>{
        const date = new Date;
        let hours = date.getHours();
        const minutes = date.getMinutes();
    
        let timeSuffix = "am"; 
        if (hours >= 12) {
            timeSuffix = "pm";
            hours -= 12; 
        }
        if (hours === 0) {
            hours = 12;
        }
        const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${timeSuffix}`;
        return formattedTime;
      }
      function handleEnter(e) {
        if (e.key === 'Enter' && document.activeElement === e.target) {
          sendMessage(e);
        }
      }
      const sendMessage = async (e) => {
        e.preventDefault();
        if(message=="") return;
        try{
          const res = axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${user.id}`,{status:"sent",message,time: getTime(), date:getDate()});
        }catch(err){
            console.log("failed to send");
        }
        setMessage('');
        messagesTrigger();
      }
  return (
    <div className={styles.chatContainer}>
        <div className={styles.messages}>
        {
            loaded==false?
            <div className={styles.progressContainer}>
                <Progress/>
            </div>:
            <>
                {
                    messages.map((message,i)=>{

                        if(message.status=="sent"){
                                return(
                                    <div className={styles.sent} key={i}>
                                        {message.message.includes("http://")||message.message.includes("https://")?<a href={message.message} target="_blank" rel="noreferrer"  className={styles.message}><b>{message.message}</b></a>:<div className={styles.message}>{message.message}</div>}
                                        <div className={styles.time}>{message.time}</div>
                                        <div className={styles.sentAnchor}/>
                                    </div>
                                )
                        }else{
                            return(
                                <div className={styles.recieved} key={i} >
                                    {message.message.includes("http://")||message.message.includes("https://")?<a href={message.message} target="_blank" rel="noreferrer" className={styles.message}><b>{message.message}</b></a>:<div className={styles.message}>{message.message}</div>}
                                    <div className={styles.time}>{message.time}</div>
                                    <div className={styles.recievedAnchor}/>
                                </div>
                            )
                        }
                    })
                }
            </>
        }
            <div className={styles.last} ref={lastDiv}/>
        </div>
        <div className={styles.inputContainer}>
            <input type="text" value={message} onKeyDown={handleEnter} onChange={(e)=>setMessage(e.target.value)} name="message" className={styles.input}/>
            <div className={styles.send} onClick={(e)=>{sendMessage(e)}}>
                <SendIcon className={styles.sendIcon}/>
            </div>
        </div>
    </div>
  )
}

export default ChatBox





