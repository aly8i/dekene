import { useEffect, useState } from "react";
import {storage} from "../../Firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import styles from "../../styles/Add.module.css";
import "../../public/img/pizza.png";
import Progress from "../Progress";
const Edit = ({pizzaToEdit,currID,closeit}) => {
    const [fi,setFi] = useState(null);
    const [ti,setTi] =useState(pizzaToEdit.title);//title
    const [de,setDe] = useState(pizzaToEdit.desc);//description
    const [pr,setPr] = useState(pizzaToEdit.prices);//prices
    const [ex,setEx] = useState(pizzaToEdit.extraOptions);//extraOptions
    const [cat,setCat] =useState(pizzaToEdit.category);
    const [x,setX] = useState(null);//extra
    const [pr0,setPr0]= useState(pr[0]);
    const [pr1,setPr1]= useState(pr[1]);
    const [pr2,setPr2]= useState(pr[2]);
    const [prog,setProg] = useState(0);
    const [id,setID] = useState(currID);
    const[loading,setLoading] = useState(false);
    useEffect(()=>{
      if(pizzaToEdit=!null){
        setTi(ti);
        setDe(de);
        setPr(pr);
        setEx(ex);
        setID(currID);
        setCat(cat);
      }
      
    },[]);
    const handleOption = (index) => {
      extraOptions.slice(index,1);
      setExtraOptions(extraOptions);
    };
    const changePrice = (e, index) => {
      const currentPrices = pr;
      const input = parseInt(e.target.value);
      currentPrices[index] = input;
      setPr(currentPrices);
      setPr(pr);
      if(index==0){setPr0(e.target.value)}
      if(index==1){setPr1(e.target.value)}
      if(index==2){setPr2(e.target.value)}
    };
    const handleEdit = async () => {
      setLoading(true);
      const img = "";
      if (fi != null){
        img = await uploadFiles(fi);
      }else{
        img="https://firebasestorage.googleapis.com/v0/b/hfc-resto.appspot.com/o/pizzas%2FEq_it-na_pizza-margherita_sep2005_sml.jpg?alt=media&token=92d4e6a5-8089-4a0d-8e02-ffd112eee416";
      } 
      console.log(id);
      const newProduct = {
        title:ti,
        desc:de,
        img,
        prices:pr,
        extraOptions:ex,
        category:cat,
      };
      const requestOptions = {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(newProduct)
      }
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,requestOptions).then(res => console.log(res.json())).catch(err=>console.log(err));
      closeit();
    }
    const handleExtraInput = (e) => {
        setX({ ...x, [e.target.name]: e.target.value });
      };
    
      const handleExtra = (e) => {
        setEx((prev) => [...prev, x]);
      };
     
   
    function uploadFiles (file){
      if(!file) return;
      return new Promise(resolve =>{
        const storageRef = ref(storage, `/pizzas/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed",(snapshot) =>{
          const p = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100);
          setProg(p);
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
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <span onClick={closeit} className={styles.close}>
            X
          </span>
          <h1>Edit your Pizza</h1>
          <div className={styles.item}>
            <label className={styles.label}>Choose an image</label>
            <input type="file" onChange={(e) => setFi(e.target.files[0])}/>
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Title</label>
            <input
              className={styles.input}
              type="text"
              value={ti?`${ti}`:null}
              onChange={(e) => {setTi(e.target.value);}}
            ></input>
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Category</label>
            <input
              className={styles.input}
              type="text"
              value={cat?`${cat}`:null}
              onChange={(e) => {setCat(e.target.value);}}
            ></input>
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Desc</label>
            <textarea
              rows={4}
              type="text"
              value={de?`${de}`:null}
              onChange={(e) => {setDe(e.target.value);}}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Prices</label>
            <div className={styles.priceContainer}>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Small"
                value={pr?`${pr0}`:null}
                onChange={(e) => changePrice(e,0)}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                value={pr?`${pr1}`:null}
                placeholder="Medium"
                onChange={(e) => changePrice(e,1)}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Large"
                value={pr?`${pr2}`:null}
                onChange={(e) => changePrice(e,2)}
              />
            </div>
          </div>
          <div className={styles.item}>
              <label className={styles.label}>Extra</label>
              <div className={styles.extra}>
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="text"
                  placeholder="Item"
                  name="text"
                  onChange={handleExtraInput}
                />
                <input
                  className={`${styles.input} ${styles.inputSm}`}
                  type="number"
                  placeholder="Price"
                  name="price"
                  onChange={handleExtraInput}
                />
                
                <button className={styles.extraButton} onClick={handleExtra}>
                  Add
                </button>
              </div>
              <div className={styles.extraItems}>
                {ex.map((option,i) => (
                  <span key={i+option.text} className={styles.extraItem}>
                    {option.text}
                  </span>
                ))}
              </div>
            </div>
            {loading?(<Progress className={styles.progress}/>):null}
          <button className={styles.addButton} onClick={handleEdit}>
            Edit
          </button>
        </div>
      </div>
    );
  };
  export default Edit;