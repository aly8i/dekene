import styles from "../../styles/adminFeatured.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Featured = ({orders}) => {
  const currency = useSelector((state) => state.default.currency);
  const rate = useSelector((state) => state.default.rate);
  useEffect(()=>{
    todayTotal();
  })
  const target = 1000;
  const convert = (number)=>{
    if(number>=1000){
      const temp = number / 1000;
      return `$${temp}k`;
    }else{
      return `$${number}`
    }

  }
  const getMonth = (x)=>{
    const m = x+1;
    if(m<=9){
      return `0${m}`;
    }else{
      return `${m}`;
    }    
  }
  const getDate = ()=>{
    let newDate = `${new Date()}`
    let month = getMonth(new Date().getMonth());
    return `${newDate.split(" ")[3]}-${month}-${newDate.split(" ")[2]}`;
  }
  const getLastWeekDate = ()=>{
    let now = new Date();
    let back = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    let backdate =  `${back}`;
    let backmonth = getMonth(back.getMonth());
    return `${backdate.split(" ")[3]}-${backmonth}-${backdate.split(" ")[2]}`;
  }
  const getLastMonthDate = ()=>{
    let now = new Date();
    let back = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
    let backdate =  `${back}`;
    let backmonth = getMonth(back.getMonth());
    return `${backdate.split(" ")[3]}-${backmonth}-${backdate.split(" ")[2]}`;
  }

  const todayTotal = ()=>{
    const date = getDate();
    var total = 0;
    const filtered = orders.filter(order=>order.createdAt.split("T")[0]==date);
    filtered.map(order=>total=total+order.total);
    return total;
  }
  const weekTotal = ()=>{
    const date = getLastWeekDate();
    var total = 0;
    const filtered = orders.filter(order=>order.createdAt.split("T")[0]==date);
    filtered.map(order=>total=total+order.total);
    return total;
  }
  const getPercentage = ()=>{
    const per = todayTotal()*100 / target;
    return per;
  }
  const monthTotal = ()=>{
    const date = getLastMonthDate();
    var total = 0;
    const filtered = orders.filter(order=>order.createdAt.split("T")[0]==date);
    filtered.map(order=>total=total+order.total);
    return total;
  }
  return (
    <div className={styles.featured} id="featured">
      <div className={styles.top}>
        <h1 className={styles.title}>Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className={styles.bottom}>
        <div className={styles.featuredChart}>
          <CircularProgressbar styles={{
    path: {
      stroke: `${process.env.NEXT_PUBLIC_FIRST_COLOR_S}`,
    },
    text: {
      // Text color
      fill: `${process.env.NEXT_PUBLIC_FIRST_COLOR}`,
      // Text size
      fontSize: '20px',
    },
  }} value={getPercentage()} text={`${getPercentage()}%`} strokeWidth={5} />
        </div>
        <p className={styles.title}>Total sales made today</p>
        <p className={styles.amount}>{currency=="$"?`${currency} ${todayTotal()}`:`L.L. ${todayTotal() * rate}`}</p>
        <p className={styles.desc}>
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className={styles.summary}>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Target</div>
            <div className={`${styles.itemResult} ${styles.negative}`}>
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className={styles.resultAmount}>{convert(target)}</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Last Week</div>
            <div className={`${styles.itemResult} ${styles.positive}`}>
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className={styles.resultAmount}>{convert(weekTotal())}</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Last Month</div>
            <div className={`${styles.itemResult} ${styles.positive}`}>
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className={styles.resultAmount}>{convert(monthTotal())}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
