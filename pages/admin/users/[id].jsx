import axios from "axios";
import React from "react";
import {useState,useEffect} from "react";
import dynamic from 'next/dynamic';
const Single = dynamic(
  () => import("../../../components/single/Single"),
  {ssr: false}
)

const User = ({ user,orders}) => {
  return (
      <Single user={user} orders={orders} type="admin"/>
  );
};

export const getServerSideProps = async (context) => {
  var accessToken= "";
  var res1 ={};
  var res2 ={};
  var res3 ={};
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
  
  if(res1.data.role=="user" || res1.data.role=="admin"){
    const payload2 = {customerID : res1.data._id};
    
    try{
      const res22 = await server.post("api/orders/find",payload2);
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
        user: res1.data,
        orders: res2.data,
      },
    };
  }else if(res1.data.role=="delivery"){
    const payload3 = {deliveryID : res1.data._id};
    try{
      const res33 = await server.post("api/orders/find/delivered",payload3);
      res3=res33
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
        user: res1.data,
        orders: res3.data,
      },
    };
  }
};


export default User;
