import React from 'react'
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import {useState,useEffect} from 'react';
import axios from "axios";
function DeliveryDialog({setSelectedDelivery,deliveryMenuOpen,setDeliveryMenuOpen,orderToEdit,deliverys,editOrderStatus}) {
    const [deliveryList,setDeliveryList] = useState(deliverys);
    useEffect(()=>{
        setDeliveryList(deliverys);
    },[])
    const handleClick = async (item) =>{
      setSelectedDelivery(item);
      const pay = {deliveryID: item._id}
      await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${orderToEdit}/`, pay);
      editOrderStatus(orderToEdit,1);
      setDeliveryMenuOpen(false);
    }
  return (
    <Dialog open={deliveryMenuOpen}>
      <DialogTitle>Set Delivery Guy</DialogTitle>
      <List sx={{ pt: 0 }}>
        {deliveryList.map((item) => (
          <ListItem button onClick={()=>handleClick(item)} key={item}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.username} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

export default DeliveryDialog;
