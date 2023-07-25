import HomeIcon from '@mui/icons-material/Home';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CakeIcon from '@mui/icons-material/Cake';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FlatwareIcon from '@mui/icons-material/Flatware';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import styles from "../styles/NavMenu.module.css";
import { Link as ScrollLink } from "react-scroll" ;
import { useDispatch } from "react-redux";
import { updateQuery } from "./redux/filterSlice";
import { useRouter } from "next/router";

function NavMenu() {
  const router = useRouter();
  const categories = JSON.parse(process.env.NEXT_PUBLIC_CATEGORIES || '[]');
  const dispatch = useDispatch();
  const handleFilter = (query) =>{
    router.push({pathname:'/'},undefined,{ scroll: false });
    dispatch(updateQuery({query}));
  }
  const handleHome = ()=>{
    handleFilter("");
    router.push({pathname:'/'},undefined,{ scroll: false });
  }
  return (
    <>
      <div className={styles.container}>
      <ScrollLink to="pizzawrapper" spy={true} smooth={true} offset={-100} duration={500}>
          <ul className={styles.ul}>
              <li className={styles.li} onClick={()=>handleFilter(`${categories[2]}`)}>
                <span>
                  <div className={styles.title}>{`${categories[2]}`}</div>
                </span>
                <BakeryDiningIcon className={styles.icon}/>
              </li>
              <li className={styles.li} onClick={()=>handleFilter(`${categories[3]}`)}>
                  <span>
                    <div className={styles.title}>`${categories[3]}`</div>
                  </span>
                  <FlatwareIcon className={styles.icon}/>
              </li>
              <li className={styles.li} onClick={()=>handleFilter(`${categories[2]}`)}>
                    <span>
                      <div className={styles.title}>{`${categories[1]}`}</div>
                    </span>
                    <AcUnitIcon className={styles.icon}/>
              </li>   
              <li className={styles.li} onClick={()=>handleHome()}>
                  <>
                    <span>
                      <div className={styles.title}>Home</div>
                    </span>
                    <HomeIcon className={styles.icon}/>
                  </>
              </li>
              <li className={styles.li} onClick={()=>handleFilter(`${categories[4]}`)}>
                  <span>
                    <div className={styles.title}>{`${categories[4]}`}</div>
                  </span>
                  <CakeIcon className={styles.icon}/>
              </li>
              <li className={styles.li} onClick={()=>handleFilter(`${categories[5]}`)}>
                    <span>
                      <div className={styles.title}>{`${categories[5]}`}</div>
                    </span>
                    < LocalDrinkIcon className={styles.icon}/>
                </li>
              <li className={styles.li} onClick={()=>handleFilter(`${categories[0]}`)}>
                <span>
                  <div className={styles.title}>{`${categories[2]}`}</div>
                </span>
                <DinnerDiningIcon className={styles.icon}/>
              </li>
          </ul>
        </ScrollLink>
      </div>
    </>
  )
}

export default NavMenu