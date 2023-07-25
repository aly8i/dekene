import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import axios from 'axios';
const Cart = dynamic(
  () => import('../components/Cart'),
  {ssr: false}
)
const TableCart = dynamic(
  () => import('../components/TableCart'),
  {ssr: false}
)
const Cartt = ({mapLocation,deliveryChargePerKm}) => {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const table = useSelector((state) => state.table);
  useEffect(()=>{
    if(user.username=='Guest'){
      router.push('/socialogin');
    }
    console.log(table)
  },[])
  return (
    <>
      {table.id?
        <TableCart mapLocation={mapLocation} deliveryChargePerKm={deliveryChargePerKm}/>
        :<Cart mapLocation={mapLocation} deliveryChargePerKm={deliveryChargePerKm}/>
      }
    </>
  )
}

export default Cartt

export const getServerSideProps = async () => {

  var res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/static`).then((res)=>res.data).catch((err)=>{
    console.log(err);
  });
  return {
    props: {
      mapLocation: res?.mapLocation||null,
      deliveryChargePerKm: res?.deliveryChargePerKm||null,
    },
  };
  
};