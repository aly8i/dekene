import { updateDoc,doc } from 'firebase/firestore';
import {db} from "../Firebase"

export const ordersTrigger = () => {
    const orderDoc = doc(db, 'orders', 'orders');
    updateDoc(orderDoc,{count:Math.floor(Math.random()*100)+1})
}
export const messagesTrigger = () => {
    const messageDoc = doc(db, 'messages', 'messages');
    updateDoc(messageDoc,{count:Math.floor(Math.random()*100)+1})
}

export const notificationsTrigger = () => {
    const notificationDoc = doc(db, 'notifications', 'notifications');
    updateDoc(notificationDoc,{count:Math.floor(Math.random()*100)+1,})
}