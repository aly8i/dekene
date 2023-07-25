import React from 'react'
import styles from '../styles/Search.module.css'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Roll from 'react-reveal/Roll';
import Flip from 'react-reveal/Flip';
const Search = ({setSearched,searched})=>{

        return(
            <>
            {searched==""?(
            <div className={styles.search}>
            <input type="text"className={styles.searchInput} value={searched} onChange={(e)=>setSearched(e.target.value)}/>
            <div className={styles.searchIcon}>
                <Roll left>
                    <SearchIcon/>
                </Roll>
            </div>
            </div>
        ):(
            <div className={styles.search}>
            <input type="text"className={styles.searchInput} value={searched} onChange={(e)=>setSearched(e.target.value)}/>
            <div className={styles.searchIcon} onClick={()=>setSearched("")}>
                <Flip right>
                    <ClearIcon/>
                </Flip>
            </div>
            </div>
            )
        }
        </> 
    )
}

export default Search
