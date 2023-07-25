import React from 'react'
import styles from "../styles/PhoneNumberPopup.module.css";
import {authentication} from '../Firebase';
import {RecaptchaVerifier,signInWithPhoneNumber} from "firebase/auth";
import OtpInput from "react-otp-input";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { addPhone,addID } from "../components/redux/userSlice";
import Bounce from 'react-reveal/Bounce'
import { motion } from "framer-motion";
import { signIn } from 'next-auth/react';
const PhoneNumberPopup = ({setClose}) => {
  const [phonenumber,setPhonenumber]=useState("");
  const [OTP,setOTP] =useState("");
  const [username,setUsername] =useState("");
  const [stage,setStage] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const generateRecaptcha =()=>{
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response)=>{
        }
    },authentication);
} 
  const signUpUser = async () => {
    const payload = {username : username,phonenumber : phonenumber};
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signupwithphone/`,payload,{
      withCredentials: true
    });
    dispatch(addPhone({phonenumber,username:res.data.username,fullname:res.data.username}));
    dispatch(addID({id: res.data._id}));
    setStage(0);
    router.push('/');
  }
  const signInUser = async () => {
    const payload = {phonenumber : phonenumber};
    try{
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signinwithphone/`,payload,{
        withCredentials: true
      });
      dispatch(addPhone({phonenumber,username:res.data.username,fullname:res.data.username}));
      dispatch(addID({id: res.data._id}));
      router.push('/');
    }catch(err){
      setStage(2);
    }

  }
  const verifyOTP = () => {
  if (OTP.length === 6){
    let confirmationRes = window.confirmationResult;
    confirmationRes.confirm(OTP).then((result)=>{
      if(result){
      signInUser();
      }
    }).catch((error)=>{
      setStage(3);
    })
  }
}
const requestOTP = (e) => {
  e.preventDefault();
  let number = '+961'
  generateRecaptcha();
  let appVerifier = window.recaptchaVerifier;
  if(phonenumber.startsWith('03')){
    number = number + phonenumber.substring(1,8);
  }else{
    number = number + phonenumber;
  }
  signInWithPhoneNumber(authentication,number,appVerifier)
  .then(confirmationResult=>{
      window.confirmationResult = confirmationResult;
      setStage(1);
  }).catch((error)=>{
      setStage(3);
  })
}
  const Retry = () =>{
    router.reload(window.location.pathname);
  }
  const closeit = () =>{
    setClose(true);
  }
    return (
      <div className={styles.container}>
          <div className={styles.wrapper}>
            <motion.span onClick={closeit} className={styles.close} whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}}>
              X
            </motion.span>
            {stage == 0 &&
              <>
              <Bounce top>
              <h1 className={styles.h1}>Enter your phonenumber</h1>
              <div className={styles.item}>
                <label className={styles.label}>Phone number</label>
                <OtpInput
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e)}
                  numInputs={8}
                  separator={<span style={{ width: "8px" }}></span>}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  inputStyle={{
                    border: "1px solid transparent",
                    borderRadius: "8px",
                    width: "44px",
                    height: "44px",
                    background: "#000",
                    fontSize: "12px",
                    color: "#FFF",
                    fontWeight: "800",
                    caretColor: "blue"
                  }}
                  focusStyle={{
                    border: "1px solid #CFD3DB",
                    outline: "none"
                  }}
                />
              </div>
              <motion.button className={styles.addButton} onClick={requestOTP} whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}}>
                Send OTP
              </motion.button>
              </Bounce>
              </>
            }
            {stage == 1 && 
            <>
            <Bounce top>
              <div className={styles.item}>
              <label className={styles.label}>OTP</label>
              <OtpInput
                value={OTP}
                onChange={(e) => setOTP(e)}
                numInputs={6}
                separator={<span style={{ width: "8px" }}></span>}
                isInputNum={true}
                shouldAutoFocus={true}
                inputStyle={{
                  border: "1px solid transparent",
                  borderRadius: "8px",
                  width: "54px",
                  height: "54px",
                  background: "#000",
                  fontSize: "12px",
                  color: "#FFF",
                  fontWeight: "800",
                  caretColor: "blue"
                }}
                focusStyle={{
                  border: "1px solid #CFD3DB",
                  outline: "none"
                }}
              />
              </div>
              <motion.button className={styles.addButton} onClick={verifyOTP} whileTap={{ scale: 0.8}} whileHover={{ scale: 1.1}}>
                Submit
              </motion.button>
              </Bounce>
            </>
            }
            {
              stage == 2 && 
              <>
              <Bounce top>
                <div className={styles.item}>
                <label className={styles.label}>Username</label>
                <input
                className={styles.input}
                type="text"
                onChange= {(e) => setUsername(e.target.value)}
                />
                </div>
                <button className={styles.addButton} onClick={()=>signUpUser()}>
                Submit
                </button>
              </Bounce>
              </>
            }
            {
              stage == 3 && 
              <>
              <Bounce top>
                <div className={styles.item}>
                  <label className={styles.label}>There was error in your request! please retry</label>
                </div>
                <button className={styles.addButton} onClick={()=>Retry()}>
                Retry
                </button>
              </Bounce>
              </>
            }
          </div>
          <div className={styles.reca}id="recaptcha-container"/>
        </div>
    )
  };
  export default PhoneNumberPopup;