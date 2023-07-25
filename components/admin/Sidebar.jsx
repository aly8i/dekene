import styles from "../../styles/adminSidebar.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Link from "next/link";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.top}>
          <span className={styles.logo}>Admin Panel</span>
      </div>
      <hr />
      <div className={styles.center}>
        <ul>
          <p className={styles.title}>MAIN</p>
          <Link href="/admin" passHref>
            <li>
              <DashboardIcon className={styles.icon} />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className={styles.title}>LISTS</p>
            <Link href="/admin/users" passHref>
              <li>
                <PersonOutlineIcon className={styles.icon} />
                <span>Users</span>
              </li>
            </Link>
            <Link href="/admin/products" passHref>
              <li>
                <StoreIcon className={styles.icon} />
                <span>Products</span>
              </li>
            </Link>
            <Link href="/admin/orders" passHref>
              <li>
                <CreditCardIcon className={styles.icon} />
                <span>Orders</span>
              </li>
            </Link>
            <Link href="/admin/tables" passHref>
              <li>
                <TableRestaurantIcon className={styles.icon} />
                <span>Tables</span>
              </li>
          </Link>
          <Link href="/admin/delivery" passHref>
            <li>
              <LocalShippingIcon className={styles.icon} />
              <span>Delivery</span>
            </li>
          </Link>
          <p className={styles.title}>USEFULL</p>
          <Link href="/admin/statics" passHref>
          <li>
            <InsertChartIcon className={styles.icon} />
            <span>Statics</span>
          </li>
          </Link>
          <Link href="/admin/messages" passHref>
            <li>
              <QuestionAnswerIcon className={styles.icon} />
              <span>Messages</span>
            </li>
          </Link>
          <p className={styles.title}>SERVICE</p>
          <Link href="/admin/qrcodes" passHref>
            <li>
              <QrCode2Icon className={styles.icon} />
              <span>Tables QR Codes</span>
            </li>
          </Link>
          <li>
            <PsychologyOutlinedIcon className={styles.icon} />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className={styles.icon} />
            <span>Settings</span>
          </li>
          <p className={styles.title}>USER</p>
          <li>
            <AccountCircleOutlinedIcon className={styles.icon} />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className={styles.icon} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
