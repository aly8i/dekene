import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import Flip from 'react-reveal/Flip';
import { useState } from "react";
import { useSelector } from "react-redux";
const PizzaCard = ({ pizza,id }) => {
  const currency = useSelector((state) => state.default.currency);
  const rate = useSelector((state) => state.default.rate);
  const shorten =(str) =>{
    var result;
    if(str.length>=79)
      result = str.substring(0,76)+"...";
    else
      result = str
    return result
  }
  const priceRender = () => {
    if(pizza.measurment=="kg")
      return pizza.priceperkg
    else if(pizza.prices[0]>0)
      return pizza.prices[0] 
    else if(pizza.prices[1]>0)
      return pizza.prices[1]
    else 
      return pizza.prices[2]
  }
  
  const integerRender = () => {
    return Math.floor(priceRender());
  }
  const decimalRender = () => {
    var x =  parseInt((Math.abs(integerRender() - priceRender())*100).toFixed(2));
    if (x==0)
      return ".00"
    else
      return `.${x}`

  }
  return (
    <Flip left delay={300+id*300}>
    <Link href={`/product/${pizza._id}`} passHref>
      <motion.div className={styles.container} whileTap={{ scale: 0.8 }}>
        <Image className={styles.image} src={pizza.img} alt={pizza.title} width="200" height="200" />
        <h1 className={styles.title}>{pizza.title}</h1>
        {currency=="$"?        
          <div className={styles.price}>
            <p className={styles.unit}>$</p><p>{integerRender()}</p><p className={styles.unit}>{decimalRender()}{pizza.measurment=="kg"&&" /kg"}</p>
          </div>
        :  <div className={styles.price}>
            <p className={styles.unit}>L.L.</p><p>{priceRender()*rate}</p><p className={styles.unit}>{pizza.measurment=="kg"&&" /kg"}</p>
          </div>
        }
        <p className={styles.desc}>{shorten(pizza.desc)}</p>      
      </motion.div>
      </Link>
    </Flip>
  );
};

export default PizzaCard;
