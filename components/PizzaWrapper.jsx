import React from 'react';
import PizzaCard from "./PizzaCard";
import styles from "../styles/PizzaList.module.css";
import { useSelector } from "react-redux";
import * as Scroll from 'react-scroll';
import { useEffect } from 'react';
function PizzaWrapper({pizzaList}) {
  const filter = useSelector((state) => state.filter);
  useEffect(()=>{
    if(filter.query!=""||filter.title!=""){
      let scroller = Scroll.scroller;
      scroller.scrollTo('pizzawrapper', {
        duration: 500,
        spy: true,
        smooth: true,
        offset: -100,
      })
    }
},[filter])

  return (
      <div className={styles.wrapper} id="pizzawrapper">
          {pizzaList?.filter(pizza => pizza?.category?.includes(filter.query)&&(pizza?.title?.toLowerCase().includes(filter.title.toLowerCase())||filter?.title?.toLowerCase().includes(pizza.title.toLowerCase()))).map((pizza,id) => (
            <PizzaCard key={pizza._id} pizza={pizza} id={id} />
          ))}
      </div>
  )
}

export default PizzaWrapper