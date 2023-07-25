import styles from "../styles/adminNew.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import {storage} from "../Firebase";
import axios from 'axios';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import Progress from "./Progress";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const EditUser = ({user,token,type}) => {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(user.username);
    const [fullname, setFullname] = useState(user.fullname);
    const [googleID, setGoogleID] = useState(user.googleID);
    const [phonenumber,setPhonenumber]= useState(user.phonenumber||"");
    const [address,setAddress]= useState(user.address||"");
    const [role,setRole]= useState(user.role);
    const [loading,setLoading] = useState (false);
    const router = useRouter();
    const postUser = async (pay) => {
      var res1 = {}
      const server = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        headers: {'Content-Type':'application/json'},
        withCredentials: true
      });
      server.interceptors.request.use(
        async function (config) {
          const accessToken =  token;
          if (accessToken) {
            config.headers.authorization = accessToken;
          }
          return config;
        },
        async function (error) {
          return Promise.reject(error);
        },
      );
      try{
        const res11 = await server.put(`api/users/${user._id}/`, pay);
        res1=res11;
    }catch(err){
        return {
          redirect: {
            permanent: false,
            destination: "/"
          },
        };
    }
        return res1;
    }
    const handleSave = async()=>{
        setLoading(true);
        var img="";
        if(file!=null){
            img = await uploadFiles(file);
        }else{
            img = user.img;
        }
        
        const payload = {username,fullname,phonenumber,img,role,address};
        try{
        postUser(payload);
        setLoading(false);
        router.push(`/user/${user._id}`);
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
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100);
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
      <div className={styles.newContainer}>
        <div className={styles.top}>
          <h1>Edit Your Profile</h1>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.img ? user.img
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
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    color="error"
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    color="error"
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="Phone Number"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                    color="error"
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="Google ID"
                    value={googleID}
                    color="error"
                    disabled
                />
              </div>
              <div className={styles.formInput}>
                <TextField
                    id="outlined-name"
                    label="Address"
                    value={address}
                    color="error"
                    onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              {type=="admin"?(
                <div className={styles.formInput}>
                  <FormControl sx={{ minWidth: 210 }} error>
                    <Select
                      id="outlined-name"
                      value={role}
                      label="Role"
                      onChange={(e) => setRole(e.target.value)}
                      renderValue={(value) => `${value}`}
                      error
                    >
                      <MenuItem value={'admin'}>Admin</MenuItem>
                      <MenuItem value={'delivery'}>Delivery</MenuItem>
                      <MenuItem value={'user'}>User</MenuItem>
                    </Select>
                  </FormControl>
                </div>
       
              ):(
                <div className={styles.formInput}>
                  <FormControl sx={{ minWidth: 210 }} error>
                    <Select
                      id="outlined-name"
                      value={role}
                      label="Role"
                      onChange={(e) => setRole(e.target.value)}
                      renderValue={(value) => `${value}`}
                      error
                      disabled
                    >
                      <MenuItem value={'admin'}>Admin</MenuItem>
                      <MenuItem value={'delivery'}>Delivery</MenuItem>
                      <MenuItem value={'user'}>User</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}
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

export default EditUser;