import axios from "axios";
import React from "react";
import dynamic from 'next/dynamic';
const Statics = dynamic(
  () => import("../../components/admin/Statics"),
  {ssr: false}
)

const page = ({ data, token }) => {
  return (
    <Statics data={data} token={token}/>
  );
};

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.accessToken;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/static`
  );
  return {
    props: {
      data: res.data,
      token: token
    },
  };
};


export default page;
