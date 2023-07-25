import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { resetCart,decrementProduct,incrementProduct,saved,removeProduct,addProduct, addCart } from "./redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import { motion } from "framer-motion";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Zoom from 'react-reveal/Zoom';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {sign,verify} from 'jsonwebtoken';
import { setCookie,getCookie,deleteCookie } from "cookies-next";
import { useEffect,useRef } from "react";
import { ordersTrigger } from "../functions/triggers";
const round = (val) =>{
  return parseFloat((val).toFixed(2))
}
const Cart=({mapLocation,deliveryChargePerKm})=> {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state)=> state.user);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const currency = useSelector((state) => state.default.currency);
  const rate = useSelector((state) => state.default.rate);
  const dispatch = useDispatch();
  const router = useRouter();
  let barFn;
  
  const [error,setError]=useState(null);
  const [savee,setSavee] = useState(<></>);
  useEffect(()=>{
    if(cart.stage==1){
      setSavee(<motion.div className={styles.button} whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}} onClick={() => save()} >SAVE FOR LATER</motion.div>);
    }else{
      setSavee(<motion.div className={styles.button} whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}} onClick={() => unsave()}>UNSAVE</motion.div>)
    }
  },[cart.stage])
  useEffect(()=>{
    const cookie = getCookie('cart');
    if(cart.stage!=1){
    if(cookie){
      verify(cookie,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
        if(!err && decoded) {
          dispatch(addCart({products:decoded.products,size:decoded.size,quantity:decoded.quantity,total:decoded.total}));
        }
      });
    }
  }
  },[])
  
  const handleProducts = async() => {
    let array = []
    cart.products.map((product)=>{
      let extras = [];
      product.extras.map((extra)=>{
          extras.push(extra.text);
      })
      array.push({product: `${product._id}`,size: `${product.size}`,price: `${product.price}`,amount: `${product.quantity}`,extras: `${extras}`});
    });
    return array
  }

  const createOrder = async (data) => {
    const jwt = sign(data,process.env.NEXT_PUBLIC_JWT_SECRET,{expiresIn: '30s'});
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {jwt});
      if (res.status === 201) {
        ordersTrigger();
        deleteCookie('cart');
        dispatch(resetCart());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const validate = async() =>{
    if(cart.total == 0){
      setError("Your cart is empty !  Please add some items .");
    }else{
      const location = {
        lat: 33.8252,
        lng: 35.5066
      }
      const products = await handleProducts();
      var name
      var address
      if(user?.fullname=="dekene jaafar"){
        name =  `${process.env.NEXT_PUBLIC_NAME}`
        address = "in store"
      }
      else{
        name = user?.username || "customer"
        address = user?.address|| "outside"
      }
      await createOrder({ name, total:cart.total, products,location,customerID:user?.id,phoneNumber:"+961",address, deliveryCharge:0 });
    }
  }
  const save = () =>{
    if(cart.total == 0){
      setError("Your cart is empty !  Please add some items .");
    }else{
      const jwt = sign(cart,process.env.NEXT_PUBLIC_JWT_SECRET,{expiresIn: '30d'});
      dispatch(saved({stage:2}));
      setCookie('cart', jwt);
    }
  }
  const handleKeyDown = (event) => {
    if (event.key=='Control') {
      if (barcodeField) {
        const barcodeField = document.getElementById("barcodeField");
        barcodeField.focus();
      }
    }
  };
  const unsave = () =>{
    dispatch(saved({stage:1}));
    deleteCookie('cart');
  }
  const remProduct = (product) => {
    dispatch(removeProduct({id:product._id,size:product.size,extras:product.extras,quantity:product.quantity,price:product.price}));
  }
  const incProduct = (product) => {
    dispatch(incrementProduct({id:product._id,size:product.size,extras:product.extras,quantity:product.quantity,price:product.price}));
  }
  const decProduct = (product) => {
    dispatch(decrementProduct({id:product._id,size:product.size,extras:product.extras,quantity:product.quantity,price:product.price}));
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleBar = async(val) => {
    const code = val.trim();
      clearTimeout(barFn);
      barFn = setTimeout(async() => {
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/barcode/${code}`).then((res)=>{
          const product = res.data;
          dispatch(addProduct({...product, extras:[], price:product.prices[0],size:"s", quantity:1}));
        }).catch((err)=>{
          console.log(err)
        });
        const barcodeField = document.getElementById("barcodeField");
        barcodeField.value='';
      }, 100);
      
  }

  return (
  <div onKeyDown={handleKeyDown}>
    <input id="barcodeField" className={styles.barcode} onChange={(e)=>handleBar(e.target.value)} type="text" />
      {
        cart.total==0?(
          <Zoom>
            <div className={styles.emptyContainer}>
              <div className={styles.emptyWrapper}>
                <div className={styles.chat}>
                  <ChatBubbleIcon className={styles.bubbleIcon}/>
                  <p className={styles.message}>I&apos;m empty</p>
                </div>
                <ShoppingCartIcon className={styles.cartIcon}/>
                <Link href="/" passHref>
                  <motion.div className={styles.backBtn} whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}}>
                    <ArrowBackIcon className={styles.arrow}/>
                  </motion.div>
                </Link>
              </div>
            </div>
          </Zoom>
        ):(
          <>
          <div className={styles.container} onKeyDown={handleKeyDown}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Size</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      fill
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.size}>{product.size||"---"}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.length==0?"---":product.extras.map((extra,i) => (
                      <span className={styles.extra} key={extra._id}>{product.extras.length==i+1?`${extra.text}`:`${extra.text}, `}</span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>{currency=="$"?`${currency} ${product.price}`:`L.L. ${product.price * rate}`}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                  {currency=="$"?`${currency} ${round(product.price * product.quantity)}`:`L.L. ${round(product.price * product.quantity) * rate}`}
                  </span>
                </td>
                <td className={styles.td}>
                  {product.size=="NAN"?<></>:
                  <><motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1}} onClick={()=>decProduct(product)}>
                    <RemoveCircleIcon className={styles.subQ}/>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1}} className={styles.addQ} onClick={()=>incProduct(product)}> 
                    <AddCircleIcon/>
                  </motion.div></>}

                  <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1}} className={styles.xQ} onClick={()=>remProduct(product)}> 
                    <CancelIcon/> 
                  </motion.div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>{currency=="$"?`${currency} ${cart.total}`:`L.L. ${cart.total * rate}`}
          </div>
            <>
              <motion.div className={styles.button} whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}} onClick={() => validate()} >CHECKOUT NOW!</motion.div>
              {savee}
            </>
        </div>
      </div>
      {cash && <OrderDetail createOrder={createOrder} mapLocation={mapLocation} deliveryChargePerKm={deliveryChargePerKm} />}
    </div>
    {error&&<Alert onClose={() => {setError(null)}} severity="error">
        {error}
      </Alert>}
</>
        )
      }
  </div>
  );
};

export default Cart;
