import axios from "axios";
import React from "react";
import styles from "../../styles/User.module.css";
import dynamic from 'next/dynamic';
const Single = dynamic(
  () => import("../../components/single/Single"),
  {ssr: false}
)

const User = ({ user,orders }) => {
  return (
  <div className={styles.container}>
    <Single user={user} orders={orders}/>
  </div>
  );
};

export const getServerSideProps = async (context) => {
  var accessToken= "";
  var res1={};
  var res2=[];
  const server = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    headers: {'Content-Type':'application/json'},
    withCredentials: true
  });
  server.interceptors.request.use(
    async function (config) {
      accessToken =  context.req.cookies.accessToken;
      if (accessToken) {
        config.headers.authorization = accessToken;
      }
      return config;
    },
    async function (error) {
      return Promise.reject(error);
    },
  );
  try{
    const res11 = await server.get(`api/users/${context.params.id}`);
    res1=res11;
    const payload2 = {customerID : res1.data._id};
    const res22 = await server.post("api/orders/find/",payload2);
    res2=res22;
}catch(err){
  if(err && err.response.status>=300){
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
    };
  }
}

  return {
    props: {
      user: res1.data,
      orders: res2.data?.reverse(),
    },
  };
};


export default User;
