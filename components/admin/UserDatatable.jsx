import styles from "../../styles/adminDatatable.module.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./datatablesource";
import axios from "axios";
import { useState,useEffect } from "react";
import Link from "next/link";
import Search from "../Search";
import { useRouter } from 'next/router';
const UserDatatable = ({users,token}) => {
  const [originalUsers,setOriginalUsers] = useState(users);
  const [rows, setRows] = useState(originalUsers);
  const [searched, setSearched] = useState("");
  const router = useRouter();
  const server = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    headers: {'Content-Type':'application/json'},
    withCredentials: true
  });
  useEffect(()=>{
    requestSearch(searched);
},[searched])
  useEffect(()=>{
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
    setOriginalUsers(users);
    setRows(users);

  },[users]);
  const requestSearch = (searchedVal) => {
    if(searchedVal!=""){
      const filteredRows = rows.filter((row) => {
        return row.username?.toLowerCase().includes(searchedVal.toLowerCase())||row._id.includes(searchedVal.toLowerCase())||row.phonenumber?.includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    }else{
      setRows(originalUsers)
    }
    
  };

  const handleDelete = async (id) => {
    const res = await server.delete("api/users/" + id);
    refreshData();
  };
  const refreshData = () => {
    router.replace(router.asPath);
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={styles.cellAction}>
            <Link href={`/admin/users/${params.row._id}`} passHref style={{ textDecoration: "none" }}>
              <div className={styles.viewButton}>View</div>
            </Link>
            <div
              className={styles.deleteButton}
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
      <div className={styles.datatable}>
        <div className={styles.datatableTitle}>
          <div className={styles.search}>
            <Search setSearched={setSearched} searched={searched}/>
          </div>
        </div>
        <DataGrid
          className={styles.datagrid}
          getRowId={(row) => row._id}
          rows={rows}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection={false}
        />
      </div>
  );
};

export default UserDatatable;
