import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from "../styles/Progress.module.css";
export default function Progress() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress className={styles.prog}/>
    </Box>
  );
}