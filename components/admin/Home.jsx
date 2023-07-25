import Sidebar from "./Sidebar";
import styles from "../../styles/adminHome.module.scss";
import Widget from "./Widget";
import Featured from "./Featured";
import Chart from "../chart/Chart"; 
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useState } from "react";
const Home = ({users,orders,products}) => {
  const [showSide,setShowSide] = useState(false);
  const calcEarnings = ()=>{
    let total = 0;
    orders.map((order)=>{
      total=total+order.total;
    })
    return total;
  }
  const toggle = () => {
    if(showSide==true){
      setShowSide(false);
    }else{
      setShowSide(true);
    }
  }
  return (  
  <div className={styles.home}>
    <div className={styles.mobside} onClick={()=>{toggle()}}>
      <WidgetsIcon className={styles.mobsideicon}/>
    </div>
    {showSide==true?
    <div className={styles.side2}>
      <Sidebar />
    </div>:<></>}
    <div className={styles.side}>
      <Sidebar />
    </div>
    <div className={styles.homeContainer}>
      <div className={styles.widgets}>
        <Widget type="user" amount={users.length}/>
        <Widget type="order" amount={orders.length}/>
        <Widget type="earning" amount={calcEarnings()}/>
        <Widget type="product" amount={products.length}/>
      </div>
      <div className={styles.charts}>
        <Featured className={styles.featured} orders={orders}/>
        <Chart className={styles.chart} title="Last 6 Months (Revenue)" orders={orders} type="revenue" aspect={2 / 1} />
      </div>
    </div>
  </div>
  );
};

export default Home;
