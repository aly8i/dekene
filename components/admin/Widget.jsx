import styles from "../../styles/adminWidget.module.scss"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Link from "next/link";
import { useSelector } from "react-redux";
const Widget = ({ type,amount }) => {
  let data;
  const currency = useSelector((state) => state.default.currency);
  const rate = useSelector((state) => state.default.rate);
  const diff = Math.floor(Math.random() * 10);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        forward:"/admin/users",
        icon: (
          <PersonOutlinedIcon
            className={styles.icon}
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        forward:"/admin/orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className={styles.icon}
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "This month earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className={styles.icon}
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "PRODUCTS",
        isMoney: false,
        link: "View all products",
        forward:"/admin/products",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className={styles.icon}
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className={styles.widget}>
      <div className={styles.left}>
        <span className={styles.title}>{data.title}</span>
        <span className={styles.counter}>
          {data.isMoney?currency=="$"?`${currency} ${amount}`:`L.L. ${amount * rate}`:`${amount}`}
        </span>
        <Link href={data.forward?data.forward:"/admin"} passHref>
          <span className={styles.link}>{data.link}</span>
        </Link>
      </div>
      <div className={styles.right}>
        <div className={`${styles.percentage} ${styles.positive}`}>
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
