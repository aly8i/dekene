
import React from 'react';
import styles from"../styles/Arrow.module.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect,useState } from 'react';

function Arrow() {
  const [windowYPosition, setWindowYPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setWindowYPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {
        windowYPosition<=2000&&
        <div className={styles.container}>
          <ExpandMoreIcon className={styles.bounce}/>
        </div>
      }
    </>
  )
}

export default Arrow