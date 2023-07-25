import styles from "../../styles/adminList.module.scss"
import Sidebar from "./Sidebar"
import OrderDatatable from "./OrderDatatable"
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useState } from "react";

const OrderList = ({orders,deliverys,token}) => {
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
      {showSide==true?
      <div className={styles.side2}>
        <Sidebar />
      </div>:<></>}
      <div className={styles.side}>
        <Sidebar />
      </div>
      <div className={styles.listContainer}>
        <OrderDatatable token={token} orders={orders} deliverys={deliverys}/>
      </div>
    </div>
  )
}

export default OrderList