import axios from "axios";
import React from "react";
import dynamic from 'next/dynamic';
const EditProduct = dynamic(
  () => import("../../../components/admin/EditProduct"),
  {ssr: false}
)

const page = ({ product, token }) => {
  return (
    <EditProduct product={product} token={token}/>
  );
};

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.accessToken;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${context.params.id}`
  );
  return {
    props: {
      product: res.data,
      token: token
    },
  };
};


export default page;
