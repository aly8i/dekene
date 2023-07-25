import dynamic from 'next/dynamic';
import axios from "axios";
const ProductList = dynamic(
  () => import("../../../components/admin/ProductList"),
  {ssr: false}
)
const page = ({products,token}) => {
  return (
      <ProductList products={products} token={token}/>
    );
};

export default page;

export const getServerSideProps = async (context) => {
  var accessToken = context.req.cookies.accessToken;
  const products = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  return {
    props: {
      products: products.data,
      token: accessToken,
    },
  };
};