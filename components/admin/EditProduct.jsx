import styles from "../../styles/adminNew.module.scss";
import Sidebar from "./Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import {storage} from "../../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from "@mui/material";
import Progress from "../Progress";
import WidgetsIcon from '@mui/icons-material/Widgets';
import Alert from '@mui/material/Alert';
const EditProduct = ({product,token}) => {
    const [showSide,setShowSide] = useState(false);
    const [file, setFile] = useState(null);
    const [img,setImg] = useState(product.img)
    const [title, setTitle] = useState(product.title);
    const [desc, setDesc] = useState(product.desc);
    const [prices, setPrices] = useState(product.prices);
    const [pr0,setPr0]= useState(prices[0]);
    const [pr1,setPr1]= useState(prices[1]);
    const [pr2,setPr2]= useState(prices[2]);
    const [extraOptions, setExtraOptions] = useState(product.extraOptions);
    const [extra, setExtra] = useState(null);
    const [progress,setProgress]= useState(0);
    const[loading,setLoading] = useState(false);
    const [category,setCategory]= useState(product.category);
    const categories = JSON.parse(process.env.NEXT_PUBLIC_CATEGORIES);
    const [measurment,setMeasurment]= useState(product.measurment||"unit");
    const [priceperkg,setPriceperkg] = useState(product.priceperkg||null);
    const router = useRouter();
    const [barcode,setBarcode] = useState(product.barcode||"");

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
      setLoading(true);
      const res1={}
    try{
      const res11 = await server.put(`api/products/${product._id}/`, pay);
      res1=res11;
  }catch(err){
    router.push("/");
  }
    return res1;
  }
  const validate = () =>{
    if(file==null&&!product.img){
      setError("Please add a product Image.")
      return false;
    }else if(title==""){
      setError("Please add a title.")
      return false;
    }else if(desc==""){
      setError("Please add a description.")
      return false;
    }else if(desc.length>=400){
      setError("Please shorten your description.")
      return false;
    }else if(category==""){
      setError("Please add a category.")
      return false;
    }else{
      if(measurment=="unit"){
        setPriceperkg("");
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
  const toggle = () => {
    if(showSide==true){
      setShowSide(false);
    }else{
      setShowSide(true);
    }
  }
  const handleSave = async()=>{
    const validated = validate();
    if(!validated) return;
    setLoading(true);
    var img="";
    if(file!=null){
        img = await uploadFiles(file);
    }else{
        img = product.img;
    }
    const payload = {title,barcode,desc,prices,extraOptions,category,img};
    try{
    postProduct(payload);
    setLoading(false);
    router.push("/admin/products");
    }catch(err){
    console.log(err);
    }  
  }
    const handleOption = (index) => {
      const removedExtra = extraOptions.splice(index,1);
      setExtraOptions(extraOptions.filter((option) =>(option!==removedExtra[0])));
    };
    const changePrice = (e, index) => {
        const currentPrices = prices;
        const input = parseFloat(e.target.value);
        currentPrices[index] = input;
        setPrices(currentPrices);
        setPrices(prices);
        if(index==0){setPr0(e.target.value)}
        if(index==1){setPr1(e.target.value)}
        if(index==2){setPr2(e.target.value)}
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
            const storageRef = ref(storage, `/pizzas/${file.name}`);
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
      <div className={styles.mobside} onClick={()=>{toggle()}}>
        <WidgetsIcon className={styles.mobsideicon}/>
      </div>
      {showSide==true?
      <div className={styles.side2}>
        <Sidebar />
      </div>:<></>}
      <div className={styles.side}>
        <Sidebar />
      </div>
      <div className={styles.newContainer}>
        <div className={styles.top}>
          <h1>Edit your Product</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : product.img ? product.img
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
              <div className={styles.formInput}></div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Title"
                value={title}
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
                  value={desc}
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
                    value={pr0}
                    onChange={(e) => changePrice(e, 0)}
                    disabled={measurment=='unit'?false:true}
                    type='float'
                  />
                </div>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Price 2"
                    value={pr1}
                    color="error"
                    onChange={(e) => changePrice(e, 1)}
                    disabled={measurment=='unit'?false:true}
                    type='float'
                  />
                </div>
                <div className={styles.smallFormInput}>
                  <TextField
                    id="outlined-name"
                    label="Price 3"
                    value={pr2}
                    color="error"
                    onChange={(e) => changePrice(e, 2)}
                    type='float'
                    disabled={measurment=='unit'?false:true}
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
                    name="price"
                    color="error"
                    type="float"
                    onChange={handleExtraInput}
                  />
                </div>
                <div className={styles.smallFormInput}>
                  <button className={styles.extraBtn} onClick={handleExtra}>Add</button>
                </div>
              </div>
              <div className={styles.formInput}>
                <div className={styles.extraItems}>
                {extraOptions.map((option,i) => (
                  <span key={i+option.text} onClick={()=>handleOption(i)} className={styles.extraItem}>
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
              <div className={styles.btn}>
              {loading?(<Progress className={styles.progress}/>):<button onClick={handleSave}>Save</button>}
              </div>
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

export default EditProduct;