import styles from "../../styles/adminList.module.scss"
import Sidebar from "./Sidebar"
import UserDatatable from "./UserDatatable"
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useState } from "react";
const UserList = ({users,token}) => {
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
        <UserDatatable users={users} token={token}/>
      </div>
    </div>
  )
}

export default UserList