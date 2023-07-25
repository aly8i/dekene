import styles from "../../styles/adminNew.module.scss";
import Sidebar from "./Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import {storage} from "../../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import Progress from "../Progress";
import { useRouter } from "next/router";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from "@mui/material";
import Alert from '@mui/material/Alert';
const NewProduct = ({token}) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [prices, setPrices] = useState([]);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);
    const [progress,setProgress]= useState(0);
    const [measurment,setMeasurment]= useState("unit");
    const [priceperkg,setPriceperkg] = useState(null);
    const[loading,setLoading] = useState(false);
    const categories = JSON.parse(process.env.NEXT_PUBLIC_CATEGORIES);
    const [category,setCategory]= useState("");
    const [barcode,setBarcode]= useState("");
    const router = useRouter();
    const [error,setError] = useState(null);
    const server = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      headers: {'Content-Type':'application/json'},
      withCredentials: true
    });
    server.interceptors.request.use(
      async function (config) {
        if (token) {
          config.headers.authorization = token;
        }
        return config;
      },
      async function (error) {
        return Promise.reject(error);
      },
    );
  const postProduct = async (pay) => {
    const res1={}
    
    try{
      const res11 = await server.post("api/products", pay);
      res1=res11;
  }catch(err){
    router.push("/");
  }
    return res1;
  }
  const validate = () =>{
    if(file==null){
      setError("Please add a product Image.");
      return false;
    }else if(title==""){
      setError("Please add a title.");
      return false;
    }else if(desc==""){
      setError("Please add a description.");
      return false;
    }else if(desc.length>=400){
      setError("Please shorten your description.")
      return false;
    }else{
      if(measurment=="unit"){
        setPriceperkg(null);
        if(prices.length==0){
          setError("Please add prices.");
          return false;
        }
        var currentPrices = prices;
        for(var i=0;i<=2;i++){
          if(currentPrices[i]==undefined||currentPrices[i]==null||currentPrices[i]==''||currentPrices[i]==0)
            currentPrices[i] = null;
        }
        setPrices(currentPrices);
      }else{
        setPrices([]);
        if(priceperkg==""||priceperkg==0||priceperkg==null){     
          setError("Please add a price per kg.");
          return false;
        }
      }
    return true;
  }
}
  const handleSave = async()=>{
    const validated = validate();
    if(!validated) return;
    setLoading(true);
    const img = await uploadFiles(file);
    const payload = {title,barcode,desc,prices,extraOptions,category,img,priceperkg,measurment};
    try{
      postProduct(payload);
      setLoading(false);
      router.push("/admin/products");
    }catch(err){
      console.log(err);
    }  
  }
    const changePrice = (e, index) => {
      const currentPrices = prices;
      currentPrices[index] = e.target.value;
      setPrices(currentPrices);
    };
    
    const handleExtraInput = (e) => {
      setExtra({ ...extra, [e.target.name]: e.target.value });
    };
  
    const handleExtra = (e) => {
      setExtraOptions((prev) => [...prev, extra]);
    };
     
    function uploadFiles (file){
      if(!file) return;
      return new Promise(resolve =>{
        const storageRef = ref(storage, `/lasiesta/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed",(snapshot) =>{
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100);
          setProgress(prog);
        }, (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
          .then(urlz => {
            resolve(urlz);
          }
          )
        }
        );
      })
    };
  return (
    <div className={styles.new}>
      <Sidebar />
      <div className={styles.newContainer}>
        <div className={styles.top}>
          <h1>Add New Product</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className={styles.right}>
            <div className={styles.form}>
              <div className={styles.formInput}>
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className={styles.formInput}/>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Title"
                onChange={(e) => setTitle(e.target.value)}
                color="error"
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Barcode"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                color="error"
              />
              </div>
              <div className={styles.formInput}>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  color="error"
                  rows={4}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
             
              <div className={styles.sFormInput}>
              <FormControl color="error" sx={{ minWidth: 210 }}>
                  <InputLabel >Category</InputLabel>
                    <Select
                      id="outlined-name"
                      value={category}
                      label="Category"
                      onChange={(e) => setCategory(e.target.value)}
                      renderValue={(value) => `${value}`}
                      color="error"
                    >
                      {
                        categories.map((cat,i)=>(
                            <MenuItem key={i} color="error" value={cat}>{cat}</MenuItem>
                          )
                        )
                      }
                  </Select>
              </FormControl>
              <div className={styles.priceInput}>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Price 1"
                    color="error"
                    onChange={(e) => changePrice(e, 0)}
                    type='float'
                    disabled={measurment=='kg'?true:false}
                  />
                  </div>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Price 2"
                    color="error"
                    type='float'
                    onChange={(e) => changePrice(e, 1)}
                    disabled={measurment=='kg'?true:false}
                  />
                </div>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Price 3"
                    color="error"
                    type='float'
                    onChange={(e) => changePrice(e, 2)}
                    disabled={measurment=='kg'?true:false}
                  />
                </div>
                </div>
              </div>
              <div className={styles.formInput}>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Ex.Name"
                    color="error"
                    name="text"
                    onChange={handleExtraInput}
                  />
                </div>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Ex.Price"
                    type="float"
                    name="price"
                    color="error"
                    onChange={handleExtraInput}
                  />
                </div>
                <div className={styles.smallFormInput}>
                  <button className={styles.extraBtn} onClick={handleExtra}>Add</button>
                </div>
              </div>
              <div className={styles.formInput}>
                <div className={styles.extraItems}>
                  {extraOptions.map((option) => (
                    <span key={option.text} className={styles.extraItem}>
                      {option.text}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.sFormInput}>
              <FormControl color="error" sx={{ minWidth: 210 }}>
                  <InputLabel >Measurment</InputLabel>
                    <Select
                      id="outlined-name"
                      value={measurment}
                      label="Measurment"
                      onChange={(e) => setMeasurment(e.target.value)}
                      renderValue={(value) => `${value}`}
                      color="error"
                    >
                      <MenuItem color="error" value={'unit'}>unit</MenuItem>
                      <MenuItem color="error" value={'kg'}>kg</MenuItem>
                  </Select>
              </FormControl>
              </div>
              <div className={styles.sFormInput}>
                <TextField
                  id="outlined-name"
                  label="Price per Kg"
                  name="price"
                  color="error"
                  type="number"
                  disabled={measurment=='kg'?false:true}
                  value={priceperkg}
                  onChange={(e)=>setPriceperkg(e.target.value)}
                />
              </div>
              {loading?(<Progress className={styles.progress}/>):<button onClick={handleSave}>Save</button>}
            </div>
          </div>
        </div>
        {error&&<Alert onClose={() => {setError(null)}} severity="error">
        {error}
      </Alert>}
      </div>

    </div>
  );
};

export default NewProduct;