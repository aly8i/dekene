import styles from "../../styles/adminTable.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";

const List = ({orders}) => {

  const formatDate = (val)=>{
    const date = val.split("T")[0];
    const time = val.split("T")[1].split(".")[0];
    return `${date} / ${time}`;
  }

  const statusFn = (status) =>{
    if(status==0){
      return <span className={`${styles.status} ${styles.Preparing}`}>Preparing</span>;
    }else if(status==1){
      return <span className={`${styles.status} ${styles.Pending}`}>On The Way</span>;
    }
    else if(status==2){
      return <span className={`${styles.status} ${styles.Approved}`}>Delivered</span>;
    }
  }
  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableCell}>Action Buttons</TableCell>
            <TableCell className={styles.tableCell}>Tracking ID</TableCell>
            <TableCell className={styles.tableCell}>Products</TableCell>
            <TableCell className={styles.tableCell}>CustomerID</TableCell>
            <TableCell className={styles.tableCell}>Date</TableCell>
            <TableCell className={styles.tableCell}>Total</TableCell>
            <TableCell className={styles.tableCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell className={styles.tableCell}>
                <div className={styles.cellAction}>
                  <Link href={`/orders/${order._id}`} passHref style={{ textDecoration: "none" }}>
                    <div className={styles.viewButton}>View</div>
                  </Link>
                </div>
            </TableCell>
              <TableCell className={styles.tableCell}>{order._id}</TableCell>
              <TableCell className={styles.tableCell}>
                <div className={styles.cellWrapper}>
                {order.products[0]?.product?.img?<img src={order.products[0].product.img} alt="" className={styles.image} />:<></>}
                  {order.products.map((product,i)=>(
                  order?.products?.length==i+1?
                  product?.product?.title+`(${product?.amount})`:
                  product?.product?.title+`(${product?.amount}),`
                  ))}
                </div>
              </TableCell>
              <TableCell className={styles.tableCell}>{order.customerID}</TableCell>
              <TableCell className={styles.tableCell}>{formatDate(order.createdAt)}</TableCell>
              <TableCell className={styles.tableCell}>{order.total}</TableCell>
              <TableCell className={styles.tableCell}>
                    {statusFn(order.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
