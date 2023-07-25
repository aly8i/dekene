import { useState,useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import styles from "../styles/OrderDetail.module.css";
import Map from '../components/Map';
import TextField from '@mui/material/TextField';
import { motion } from "framer-motion";
import Alert from '@mui/material/Alert';
import axios from "axios";

const OrderDetail = ({ createOrder, mapLocation, deliveryChargePerKm }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state)=> state.user);
  const currency = useSelector((state) => state.default.currency);
  const rate = useSelector((state) => state.default.rate);
  const [name, setName] = useState(user.fullname||"");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber||"");
  const [address, setAddress] = useState(user.address||"");
  const [customerID,setCustomerID] = useState(null);
  const [total,setTotal]=useState(null);
  const [products,setProducts] = useState([]);
  const [lng, setLng] = useState(35.4776);
  const [lat, setLat] = useState(33.8956);
  const [error,setError] = useState(null);
  const [deliveryCharge,setDeliveryCharge] = useState(0);
  const [stage,setStage] = useState(0);
  let array = [];
  const temp = 1;

  const calculateDelivery = async () =>{
    await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${mapLocation?.lat},${mapLocation?.lng};${lat},${lng}?steps=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_APIKEY}`)
    .then((response) => {
      const distance = response.data.routes[0].distance;
      const price = (deliveryChargePerKm * distance / 1000).toFixed(2);
      setDeliveryCharge(price+1);
    })
    .catch((error) => {
      console.error(error); 
    });
  }
  const handleClick1 = async () => {
    await calculateDelivery();

    if(validate()==true){
      setStage(1);
    }
  };
  const handleClick2 = async () => {
    const location = {
      lat: lat,
      lng: lng
    }
    createOrder({ name, total, products,location,customerID,phoneNumber,address, deliveryCharge });
  };


  useEffect(() => {
    array=[];
    setCustomerID(user.id);
    setTotal(cart.total);
    cart.products.map((product)=>{
      let extras = [];
      product.extras.map((extra)=>{
          extras.push(extra.text);
      })
      array.push({product: `${product._id}`,size: `${product.size}`,price: `${product.price}`,amount: `${product.quantity}`,extras: `${extras}`});
    });
    setProducts([...array]);
  },[temp]);
  const validate = () =>{
    setError(null);
    if(name == "" || name == null || phoneNumber == "" || phoneNumber == null || address == "" || address == null){
      setError("Please fill up all your order's details !");
      return false;
    }else{
      return true;
    }
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {stage==0?
            <>
              <h1 className={styles.title}>You cart total is {currency=="$"?`${currency} ${total}`:`L.L. ${total * rate}`}</h1>
              <div className={styles.item}>
                <TextField
                  id="outlined-name"
                  label="Full Name"
                  error
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.item}>
                <TextField
                  error
                  id="outlined-name"
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className={styles.item}>
                <TextField
                  error
                  id="outlined-multiline-static"
                  label="Address"
                  value={address}
                  multiline
                  rows={4}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.map}>
                  <Map lng={lng} lat={lat} setLng={setLng} setLat={setLat}/>
                </div>
              </div>
              <motion.button whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}} className={styles.button} onClick={handleClick1}>
                Proceed
              </motion.button>
          </>:
          <>
            <h1 className={styles.title}>You will pay {currency=="$"?`${currency} ${total}`:`L.L. ${total * rate}`} for your cart.</h1>
            <h1 className={styles.subtitle}>and {currency=="$"?`${currency} ${deliveryCharge}`:`L.L. ${deliveryCharge * rate}`} for Delivery Charge.</h1>
            <motion.button whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}} className={styles.button} onClick={handleClick2}>
              Confirm
            </motion.button>
          </>}
          {error&&<Alert onClose={() => {setError(null)}} severity="error">
          {error}
      </Alert>}
        </div>   
      </div>
    </>
  );
};

export default OrderDetail;
