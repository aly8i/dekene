import styles from "../../styles/adminDatatable.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { tableColumns } from "./datatablesource";
import axios from "axios";
import { useState , useEffect } from "react";
import Link from "next/link";
import Search from "../Search";
import { useRouter } from 'next/router';
import DeliveryDialog from "./DeliveryDialog";
const TableDatatable = ({orders,deliverys,token}) => {
  const [originalOrders,setOriginalOrders] = useState(orders);
  const [rows, setRows] = useState(originalOrders);
  const [searched, setSearched] = useState(""); 
  const [lng,setLng] = useState(null);
  const [lat,setLat] = useState(null);
  const[deliveryMenuOpen,setDeliveryMenuOpen] = useState(false);
  const[selectedDelivery,setSelectedDelivery] = useState(null);
  const [orderToEdit,setOrderToEdit] = useState(null);
  const router = useRouter();
  const server = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    headers: {'Content-Type':'application/json'},
    withCredentials: true
  });
  useEffect(() => {
    server.interceptors.request.use(
      async function (config) {
        const accessToken =  token;
        if (accessToken) {
          config.headers.authorization = accessToken;
        }
        return config;
      },
      async function (error) {
        return Promise.reject(error);
      },
    );
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    function success(pos) {
      setLng(pos.coords.longitude);
      setLat(pos.coords.latitude);
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success,error,options);
  },[]);
  useEffect(()=>{
    
    setOriginalOrders(orders);
    setRows(orders);
  },[orders]);

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const requestSearch = (searchedVal) => {
    if(searchedVal!=""){
      const filteredRows = rows.filter((row) => {
        return row.name.toLowerCase().includes(searchedVal.toLowerCase())||row._id.includes(searchedVal.toLowerCase())||row.name.toLowerCase().includes(searchedVal.toLowerCase())||row.phoneNumber?.includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    }else{
      setRows(originalOrders)
    }
  };
  useEffect(()=>{
      requestSearch(searched);
  },[searched])

  const handleDelete = async (id) => {
    const res = await server.delete("api/orders/" + id);
    refreshData();
  };
  const editOrderStatus = async (id,curr)=>{
    try {
        const res = await server.put("api/orders/" + id, {
          status: curr + 1,
        });
        refreshData();
      } catch (err) {
        console.log(err);
      }
  }
  const handleStatus = (id) => {
    const item = orders.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    if(currentStatus<2){
      if(currentStatus==1){
        setDeliveryMenuOpen(true);
        setOrderToEdit(id);
      }else{
        editOrderStatus(id,currentStatus);
      }
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={styles.cellAction}>
            <Link href={`/admin/orders/${params.row._id}`} passHref style={{ textDecoration: "none" }}>
              <div className={styles.viewButton}>View</div>
            </Link>
            <div
              className={styles.deleteButton}
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
            <div
              className={styles.nextButton}
              onClick={() => handleStatus(params.row._id)}
            >
              Next
            </div>            
          </div>
        );
      },
    },
  ];
  const tableColumn = [
    {
      field: "address",
      headerName: "Table",
      width: 80,
    },
  ];
  return (
    <>
      <div className={styles.datatable}>
        <div className={styles.datatableTitle}>
          <div className={styles.search}>
            <Search setSearched={setSearched} searched={searched}/>
          </div>
          <Link href="/admin/orders/new" passHref >
            <span className={styles.link}>Add New</span>
          </Link>
        </div>
        <DataGrid
          className={styles.datagrid}
          getRowId={(row) => row._id}
          rows={rows}
          columns={actionColumn.concat(tableColumn).concat(tableColumns)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection={false}
        />
      </div>
      <DeliveryDialog
        selectedDelivery={selectedDelivery}
        setSelectedDelivery={setSelectedDelivery}
        deliveryMenuOpen={deliveryMenuOpen}
        setDeliveryMenuOpen={setDeliveryMenuOpen}
        deliverys={deliverys}
        orderToEdit={orderToEdit}
        editOrderStatus={editOrderStatus}
      />
    </>
  );
};

export default TableDatatable;
