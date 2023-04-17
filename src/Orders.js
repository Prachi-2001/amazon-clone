import React, {useEffect} from 'react';
import './Orders.css';
import { useState } from 'react';
import {db} from './firebase';
import { useStateValue } from './StateProvider';


function Orders() {
    const [{basket,user},dispatch] = useStateValue();
    const [orders,setOrders] = useState([]);

    useEffect(() => {
        console.log('user id',user)
        if(user){
                db
            .collection('users')
            .doc(user && user.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            // placed oreder show 
            .onSnapshot(snapshot => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.uid,
                    data: doc.data()
                })))
            })
        }else {
            setOrders([])
        }
       
    }, [user])

  return (
    <div className='orders'>
      <h2>Hey man</h2>
    </div>
  )
}

export default Orders
