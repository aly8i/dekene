import { createSlice } from "@reduxjs/toolkit";

const round = (val) =>{
  return parseFloat((val).toFixed(2))
}
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    size: "s",
    quantity: 0,
    total: 0,
    stage: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      var available;
      for(var i=0;i<state.products.length;i++){
        available = true;
        if(state.products[i]._id==action.payload._id){
          if(action.payload.extras.length==state.products[i].extras.length&&action.payload.size==state.products[i].size){
            for(var y=0;y<state.products[i].extras.length;y++){
              if(state.products[i].extras[y].text!=action.payload.extras[y].text){
                available = false;
                break;
              }
            }
            if(available==true){
              return;
            }else{
              continue;
            }
          }else{
            continue;
          }
        }else{
          continue;
        }
      }
      state.products.push(action.payload);
      state.quantity += round(1* action.payload.quantity);
      state.size = action.payload.size;
      state.price = round(action.payload.price);
      state.total += round(action.payload.price * action.payload.quantity);
      state.stage = 1;
    },
    incrementProduct: (state, action) => {
      var booll;
      for(var i=0;i<state.products.length;i++){
        booll=true;
        if(state.products[i]._id==action.payload.id){
          if(action.payload.extras.length==state.products[i].extras.length&&action.payload.size==state.products[i].size){
            for(var y=0;y<state.products[i].extras.length;y++){
              if(state.products[i].extras[y].text!=action.payload.extras[y].text){
                booll = false;
                break;
              }
            }
            if(booll==true){
              const newproduct =  {...state.products[i],quantity:round(state.products[i].quantity+1)};
              state.products[i] = newproduct;
              state.quantity=round(state.quantity+1);
              state.total+=round(action.payload.price);
              state.stage = 1
              return;
            }else{
              continue;
            }
          }else{
            continue;
          }
        }else{
          continue;
        }
      }
    },
    decrementProduct: (state, action) => {
      var booll;
      var newarray=[];
      for(var i=0;i<state.products.length;i++){
        booll=true;
        if(state.products[i]._id==action.payload.id){
          if(action.payload.extras.length==state.products[i].extras.length&&action.payload.size==state.products[i].size){
            for(var y=0;y<state.products[i].extras.length;y++){
              if(state.products[i].extras[y].text!=action.payload.extras[y].text){
                booll = false;
                break;
              }
            }
            if(booll==true){
              if (state.products[i].quantity!=1){
                const newproduct =  {...state.products[i],quantity:round(state.products[i].quantity-1)};
                newarray.push(newproduct);
              }
            }else{
              newarray.push(state.products[i]);
              continue;
            }
          }else{
            newarray.push(state.products[i]);
            continue;
          }
        }else{
          newarray.push(state.products[i]);
          continue;
        }
      }
      state.products = newarray;
      state.quantity -= round(1);
      state.total -= round(action.payload.price);
      state.stage = 1
    },
    removeProduct: (state, action) => {
      var booll;
      var newarray=[];
      for(var i=0;i<state.products.length;i++){
        booll=true;
        if(state.products[i]._id==action.payload.id){
          if(action.payload.extras.length==state.products[i].extras.length&&action.payload.size==state.products[i].size){
            for(var y=0;y<state.products[i].extras.length;y++){
              if(state.products[i].extras[y].text!=action.payload.extras[y].text){
                booll = false;
                newarray.push(state.products[i]);
                break;
              }
            }
          }else{
            newarray.push(state.products[i]);
            continue;
          }
        }else{
          newarray.push(state.products[i]);
          continue;
        }
      }
      state.products = newarray;
      state.quantity -= round(1* action.payload.quantity);
      state.total -= round(action.payload.price * action.payload.quantity);
      state.stage = 1
    },
    resetCart: (state) => {
      state.products = [];
      state.size = "s";
      state.quantity = 0;
      state.total = 0;
      state.stage = 0;
    },
    addCart: (state,action) => {
      state.products = action.payload.products;
      state.size = action.payload.size;
      state.quantity = action.payload.quantity;
      state.total = action.payload.total;
      state.stage = 2;
    },
    saved: (state,action) => {
      state.stage = action.payload.stage;
    },
  },
});

export const { addProduct, saved, resetCart, addCart , decrementProduct , incrementProduct , reduceProduct , removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
