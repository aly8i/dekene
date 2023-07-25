import styles from "../../styles/adminList.module.scss"
import Sidebar from "./Sidebar"
import ProductDatatable from "./ProductDatatable"
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useState } from "react";
const ProductList = ({products,token}) => {
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
        <ProductDatatable token={token} products={products}/>
      </div>
    </div>
  )
}

export default ProductList