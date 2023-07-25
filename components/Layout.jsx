import axios from "axios";
import { useEffect,useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Bottom from './Bottom';
import MainSearch from './MainSearch';
import MobileNavMenu from "./MobileNavMenu";
import Chat from "./Chat";
const Layout = ({ children}) => {
  const [statics,setStatics] = useState({});
  useEffect(()=>{
    const fetch = async () =>{
      await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/static/`).then((res)=>{
        setStatics(res.data);
      })
    }
    fetch();  
  },[])

  return (
    <>
      <Navbar />
      {children}
      <MobileNavMenu/>
      <Chat/>
      <MainSearch/>
      {/* <Footer statics={statics}/> */}
      <Bottom/>
    </>
  );
};

export default Layout;
