import styles from "../styles/Featured.module.css";
import Image from "next/image";
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore, { Autoplay } from 'swiper/core';
import {useState,useEffect} from 'react'
import axios from "axios";
const Featured = () => {
  const [data,setData]=useState([]);
  useEffect(()=>{
    try{
    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/static/`).then((res)=>{
      setData(res.data?.slider1);
    });
    }catch(err){
      console.log(err);
    }
  },[])
  SwiperCore.use([Autoplay]);
  return (
    <Swiper className={styles.container}
      modules={{Pagination}}
      spaceBetween={40}
      slidesPerView={1}
      autoplay={{
          "delay": 5500,
          "disableOnInteraction": false
        }}
      pagination={{ clickable: true }}>
      {
        data?.map((image,id) => {
          return (
            <SwiperSlide key={id} className={styles.wrapper}>
              <div className={styles.imgContainer}>
                <Image src={image} alt={image} fill object-fit="contain" />
              </div>
            </SwiperSlide>
          );
        })
      }
    </Swiper>
  );
};

export default Featured;
