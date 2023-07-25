import React from 'react'
import styles from "../../styles/adminList.module.scss"
import Sidebar from "./Sidebar"
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useState } from "react";
import MessageBox from './MessageBox';
const MessagesPage = () => {
    const [showSide,setShowSide] = useState(false);
    const toggle = () => {
        if(showSide==true){
            setShowSide(false);
        }else{
            setShowSide(true);
        }
    }
    return (
        <div className={styles.list}>
            <div className={styles.mobside} onClick={()=>{toggle()}}>
            <WidgetsIcon className={styles.mobsideicon}/>
        </div>
        {showSide==true&&
        <div className={styles.side2}>
            <Sidebar />
        </div>}
        <div className={styles.side}>
            <Sidebar />
        </div>
            <div className={styles.listContainer}>
                <MessageBox/>
            </div>
      </div>
    )
}

export default MessagesPage