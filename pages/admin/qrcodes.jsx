import React, { useState,useRef,useEffect } from 'react';
import QRCode from 'qrcode.react';
import TextField from '@mui/material/TextField';
import styles from "../../styles/adminQR.module.css";
import ReactToPrint from 'react-to-print'
const QRcodes = () => {
    const printRef = useRef();
    const [code, setCode] = useState('');
    const [table, setTable] = useState('');
    useEffect(()=>{
        var xcode = `${process.env.NEXT_PUBLIC_BASE_URL}/table/${table}`;
        console.log(xcode)
        setCode(xcode);
    },[table]);
    return (
    <div className={styles.main}>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Table QR Code Generator</h1>
            <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="Table Number"
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                    color="error"
                />
            </div>
            <QRCode className={styles.qr} value={code} />
            <ReactToPrint
                trigger={() => <button className={styles.printBtn}>Print this out!</button>}
                content={() => printRef.current}
            />
            <div className={styles.print}>
                <div className={styles.printwrapper} ref={printRef}>
                    <h1 className={styles.title2}>Please scan the QR code with Your Camera</h1>
                    <QRCode className={styles.qr} value={code} />
                </div>
            </div>
        </div>
    </div>
    );
}

export default QRcodes