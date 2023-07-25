import dynamic from 'next/dynamic';
import axios from "axios";
const Home = dynamic(
  () => import("../../components/admin/Home"),
  {ssr: false}
)
const page = ({users,orders,products}) => {
  return (
    <div >
      <Home users={users} orders={orders} products={products}/>
    </div>
  );
};
export const getServerSideProps = async (context) => {
  var accessToken= "";
  var res1={};
  var res2={};
  var res3={};
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
    const res11 = await server.get("api/users/");
    res1=res11;
    const res22 = await server.get("api/orders/");
    res2=res22;
    const res33 = await server.get("api/products/");
    res3=res33;
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
      users: res1.data,
      orders: res2.data,
      products: res3.data,
    },
  };
};
export default page;
