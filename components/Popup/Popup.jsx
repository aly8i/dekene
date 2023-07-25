import { useEffect, useState } from "react";
import Edit from "./Edit";
import Add from "./Add";
const Popup = ({pizzaToEdit,currID,edit,setEdit,setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);
  const [progress,setProgress]= useState(0);

  const closeit = () => {
    if(edit==true){
      setEdit(false);
    }
    setClose(true);
    window.location.reload(false);
  };
  return(
    <>
      { !edit && <Add closeit={closeit} />}

      { edit && <Edit pizzaToEdit={pizzaToEdit} currID={currID} closeit={closeit}/>}
    </>
  );

};
export default Popup;
