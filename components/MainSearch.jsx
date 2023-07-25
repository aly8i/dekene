import React from 'react'
import styles from "../styles/MainSearch.module.css"
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { updateTitle } from "./redux/filterSlice";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';


const MainSearch = () => {
  const [title,setTitle] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const handleTitle = (val) =>{
    setTitle(val);
    router.push({pathname:'/'},undefined,{ scroll: false });
    dispatch(updateTitle({title:val}));
  }
  return (
    <>
      <div className={styles.searchContainer}>
        <input type="text" value={title} onChange={(e)=>handleTitle(e.target.value)}name="search" placeholder="Search..." className={styles.searchInput}/>
        <a className={`${styles.searchBtn}`}>
          <SearchIcon className={styles.icon}/>   
        </a>
        <a className={`${styles.searchBtn2}`} onClick={()=>handleTitle("")}> 
          <ClearIcon className={styles.icon}/>     
        </a>
      </div>
    </>
  )
}

export default MainSearch