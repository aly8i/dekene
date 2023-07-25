import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux/es/exports";
import styles from "../styles/OrderDetail.module.css";
import TextField from '@mui/material/TextField';
import { motion } from "framer-motion";
import Alert from '@mui/material/Alert';
import { addDetails } from "./redux/userSlice";
const TabelOrderDetail = ({ createOrder, editOrder, mapLocation, isCheckout }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state)=> state.user);
  const table = useSelector((state)=> state.table);
  const [name, setName] = useState(user.fullname||"");
  const [phoneNumber, setPhoneNumber] = useState(user.phonenumber||"");
  const [address, setAddress] = useState(table.id||"");
  const [customerID,setCustomerID] = useState(null);
  const [total,setTotal]=useState(null);
  const [products,setProducts] = useState([]);
  const [error,setError] = useState(null);
  const [stage,setStage] = useState(0);
  let array = [];
  const temp = 1;
  const handleProceed = async () => {

    if(validate()==true){
      setStage(1);
    }
    dispatch(addDetails({address:table.id,phonenumber:phoneNumber,location:{lat: mapLocation.lat, lng: mapLocation.lng} }));
  };

  const handleConfirm = async () => {
    const location = {
      lat: mapLocation.lat,
      lng: mapLocation.lng
    }
    if(isCheckout){
      createOrder({ name, total, products, location, customerID,status:2, phoneNumber, address:table.id, deliveryCharge:0 });
    }else{
      editOrder({ name, total, products, location, customerID, phoneNumber, address:table.id, deliveryCharge:0 });
    }
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
              <h1 className={styles.title}>You will pay {currency=="$"?`${currency} ${total}`:`L.L. ${total * rate}`} after delivery.</h1>
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
                  label="Table"
                  value={address}
                  disabled
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <motion.button whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}} className={styles.button} onClick={handleProceed}>
                Proceed
              </motion.button>
          </>:
          <>
            <h1 className={styles.title}>You will pay {currency=="$"?`${currency} ${total}`:`L.L. ${total * rate}`} for your cart.</h1>
            <motion.button whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}} className={styles.button} onClick={handleConfirm}>
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

export default TabelOrderDetail;
