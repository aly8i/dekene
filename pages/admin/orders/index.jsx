import dynamic from 'next/dynamic';
import axios from "axios";
import {db} from "../../../Firebase"
import { collection,onSnapshot,query,where } from 'firebase/firestore';
import { useState,useEffect, useRef } from 'react';
const OrderList = dynamic(
  () => import("../../../components/admin/OrderList"),
  {ssr: false}
)
const server = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  headers: {'Content-Type':'application/json'},
  withCredentials: true
});
const Page = ({orders=[],deliverys,token}) => {
  const [ordersList,setOrdersList] = useState([...orders]);
  const effect = useRef(0);
  const ordersRef = collection(db,"orders");
  useEffect(async () => {
    const queryOrders = query(ordersRef,where("count",">",-1));
    onSnapshot(queryOrders,async (snapshot)=>{
      if(effect.current!=0){

        server.interceptors.request.use(
          async function (config) {
            if (token) {
              config.headers.authorization = token;
            }
            return config;
          },
          async function (error) {
            return Promise.reject(error);
          },
        );
        await server.get("api/orders/find/all").then((res)=>{
          setOrdersList(res.data.reverse());
        });

      }

        
      effect.current = effect.current + 1;
    })

  }, []);

  return (
      <OrderList orders={ordersList} deliverys={deliverys} token={token}/>
    );
};

export default Page;

export const getServerSideProps = async (context) => {
  var accessToken = context.req.cookies.accessToken||"";
  var res1=[];
  var res2=[];

  server.interceptors.request.use(
    async function (config) {
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
  const res11 = await server.get("api/orders/find/all");
  res1=res11
}catch(err){
  if(err.response.status>=300){
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
    };
  }
}
try{
  const res22 = await server.get("api/delivery");
  res2=res22
}catch(err){
  if(err.response.status>=300){
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
      orders: res1.data.reverse(),
      deliverys: res2.data,
      token: accessToken,
    },
  };
};