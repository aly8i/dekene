import styles from "../../styles/adminSingle.module.scss";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import Link from "next/link";
//singleee
const Single = ({user,orders,type}) => {
  return (
    <div className={styles.single}>
      <div className={styles.singleContainer}>
        <div className={styles.top}>
          <div className={styles.left}>
            <Link href={type=="admin"?`/admin/users/edit/${user._id}`:`/user/edit/${user._id}`} passHref>
              <div className={styles.editButton}>Edit</div>
            </Link>
            <h1 className={styles.title}>Information</h1>
            <div className={styles.item}>
              <img
                src={user.img?user.img:"/img/guest.png"}
                alt=""
                className={styles.itemImg}
              />
              <div className={styles.details}>
                <h1 className={styles.itemTitle}>{user.username}</h1>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Google/Facebook ID:</span>
                  <span className={styles.itemValue}>{user.googleID?user.googleID:"NAN"}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Phone:</span>
                  <span className={styles.itemValue}>{user.phonenumber?user.phonenumber:"NAN"}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Address:</span>
                  <span className={styles.itemValue}>
                  {user.address?user.address:"NAN"}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Role:</span>
                  <span className={styles.itemValue}>{user.role}</span>
                </div>
              </div>
            </div>
          </div>
            {user.role=="user"?(
                <div className={styles.right}>
                  <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" type="user"orders={orders}/>
                </div>)
            :(
                <div className={styles.right}>
                  <Chart aspect={3 / 1} title="Delivered Orders ( Last 6 Months)" type="delivery" orders={orders}/>
                </div>
            )}
        </div>
        <div className={styles.bottom}>
        <h1 className={styles.title}>Last Transactions</h1>
          <List orders={orders}/>
        </div>
      </div>
    </div>
  );
};
export default Single;