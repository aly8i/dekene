import axios from "axios";
import Head from "next/head";
import Featured from "../components/Featured";
import PizzaWrapper from "../components/PizzaWrapper";
import styles from "../styles/Home.module.css";
import Arrow from "../components/Arrow";

export default function Home({ pizzaList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_NAME}</title>
        <meta name="description" content={`${process.env.NEXT_PUBLIC_DESCRIPTION}`} />
        <link rel="icon" href="/icon-hotel.png" />
      </Head>
      {/* <Featured /> */}
      <PizzaWrapper pizzaList={pizzaList} />
      <Arrow />
    </div>
  );
}
export const getServerSideProps = async () => {

  var products= await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`).then((res)=>res.data).catch((err)=>{
    console.log(err);
  });
  return {
    props: {
      pizzaList: products,
    },
  };
  
};