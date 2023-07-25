import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LiquorIcon from '@mui/icons-material/Liquor';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HomeIcon from '@mui/icons-material/Home';
import styles from "../styles/mobileNavMenu.module.css";
import { updateQuery } from "./redux/filterSlice";
import { useDispatch } from "react-redux";
import { Link as ScrollLink } from "react-scroll" ;
import { useRouter } from 'next/router';

const actions = [
  { icon: <LunchDiningIcon />, name: 'Burgers', action:'burger' },
  { icon: <LocalPizzaIcon />, name: 'Pizzas', action:'pizza' },
  { icon: <LiquorIcon />, name: 'Drinks', action:'drink' },
  { icon: <KebabDiningIcon />, name: 'Grills', action:'grill' },
  { icon: <DinnerDiningIcon />, name: 'Dishes', action:'dish'},
  { icon: <FastfoodIcon />, name: 'Meals' , action:'meal'},
];

export default function MobileNavMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleFilter = (query) =>{
    router.push({pathname:'/'}, undefined, { scroll: false });
    dispatch(updateQuery({query}));

  }
  return (
    <div className={styles.container}>
      <ScrollLink to="pizzawrapper" spy={true} smooth={true} offset={-100} duration={500}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<HomeIcon FabProps={{
              sx: {
                bgcolor: '#FFFFFF',
                '&:hover': {
                  bgcolor: '#DBDBDB',
                }
              }
            }} className={styles.icon} onClick={()=>handleFilter("")}/>}
          className={styles.dial}
          FabProps={{
                sx: {
                  bgcolor: '#FFFFFF',
                  '&:hover': {
                    bgcolor: '#DBDBDB',
                  }
                }
            }}
        >
          
          {actions.map((action) => (
            
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              className={styles.icon}
              onClick={()=>handleFilter(action.action)}
            />
            
          ))}
        </SpeedDial>
      </ScrollLink>
    </div>
  );
}
