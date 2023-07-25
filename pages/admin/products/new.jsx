import React from 'react';
import dynamic from 'next/dynamic';
const NewProduct = dynamic(
  () => import("../../../components/admin/NewProduct"),
  {ssr: false}
)
function newproduct({token}) {
  return (
    <NewProduct token={token}/>
  )
}
export const getServerSideProps = async (context) => {
  const token = context.req.cookies.accessToken;
  return {
    props: {
      token: token,
    },
  };
};
export default newproduct

