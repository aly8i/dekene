import styles from "../../styles/adminNew.module.scss";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {storage} from "../../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import Progress from "../Progress";
const NewUser = () => {
  const [file, setFile] = useState(null);
  const [username,setUsername] = useState("");
  const [phonenumber,setPhonenumber] = useState("");
  const [address,setAddress] = useState("");
  const [googleID,setGoogleID] = useState("");
  const [fullname,setFullname] = useState("");
  const [role,setRole] = useState("");
  const [loading,setLoading] = useState(false);
  const signUp = async (pay) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, pay);
    return res;
  }
  const handleSave = async()=>{
    setLoading(true);
    const img = await uploadFiles(file);
    const payload = {username,phonenumber,address,googleID,fullname,role,img};
    try{
      signUp(payload);
      setLoading(false);
    }catch(err){
      console.log(err);
    }  
  }
  function uploadFiles (file){
    if(!file) return;
    return new Promise(resolve =>{
      const storageRef = ref(storage, `/pizzas/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed",(snapshot) =>{
        console.log("uploading");
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
          <h1>Add New User</h1>
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
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Full Name"
                onChange={(e) => setFullname(e.target.value)}
                color="error"
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="User Name"
                onChange={(e) => setUsername(e.target.value)}
                color="error"
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Phone Number"
                color="error"
                onChange={(e) => setPhonenumber(e.target.value)}
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Address"
                color="error"
                onChange={(e) => setAddress(e.target.value)}
              />
              </div>
              <div className={styles.formInput}>
              <TextField
                id="outlined-name"
                label="Google ID"
                color="error"
                onChange={(e) => setGoogleID(e.target.value)}
              />
              </div>
              <div className={styles.formInput}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  color="error"
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <FormControlLabel value="user" control={<Radio color="error"/>} label="User" />
                  <FormControlLabel value="admin" control={<Radio color="error"/>} label="Admin" />
                  <FormControlLabel value="delivery" control={<Radio color="error"/>} label="Delivery" />
                </RadioGroup>
              </div>
              <div className={styles.formInput}>
              {loading?(<Progress className={styles.progress}/>):<button onClick={handleSave}>Save</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
