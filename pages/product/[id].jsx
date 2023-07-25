import Product from "../../components/Product";
import axios from 'axios'
import React from "react";
const Page = ({ product }) => {
  
  return (
    <Product product={product}/>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`
  );
  return {
    props: {
      product: res.data,
    },
  };
};

export default Page;
