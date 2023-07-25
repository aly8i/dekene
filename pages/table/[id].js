import axios from "axios";
import Head from "next/head";
import Featured from "../../components/Featured";
import PizzaWrapper from "../../components/PizzaWrapper";
import styles from "../../styles/Home.module.css";
import Arrow from "../../components/Arrow";
import { useDispatch } from "react-redux";
import { addID } from "../../components/redux/tableSlice";
import { useEffect } from "react";

export default function Home({ pizzaList,table }) {
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log(table);
    dispatch(addID({id:table}));
  },[])
  return (
    <div className={styles.container}>
      <Head>
        <title>Resturantz</title>
        <meta name="description" content="Best Food shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaWrapper pizzaList={pizzaList} />
      <Arrow />
    </div>
  );
}
export const getServerSideProps = async ({ params }) => {

  var products= await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`).then((res)=>res.data).catch((err)=>{
    console.log(err);
  });
  

  return {
    props: {
      pizzaList: products,
      table:params.id,
    },
  };
  
};