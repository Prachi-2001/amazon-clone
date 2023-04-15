import React from "react";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import './Payment.css'
import {Link} from 'react-router-dom'

function Payment() {
    const [{basket, user},dispatch] = useStateValue();
    const basketItems = basket.map((item) => (
        <CheckoutProduct
        id = {item.id}
        title={item.title}
        rating = {item.rating}
        price = {item.price} 
        image={item.image}
       />
    ))

  return (
    <div className="payment">
      <div className="payment--container">

        <h1>Basket Items</h1>
        <h3>Checkout (<Link to="/checkout">{basket && basket.length} Items</Link>)</h3>

        <div className="payment--section">

          {/* Payment section : delivery address */}
          <div className="payment--title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment--address">
            <p>{user && user.email}</p>
            <p>156 Ranstim Lane</p>
            <p>Los Angeles, USA</p>
          </div>
        </div>
        <div className="payment--section">
            {/* Payment section :  review items */}
            <div className="payment--title">
            <h3>Review items and delivery</h3>
          </div>
          {/* here we are displaying items from basket  */}
          <div className="payment--items">
            {basketItems}
          </div>

        </div>
        <div className="payment--section">
                 
                 <div className="payment--title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment--detail">
            {/* Payment section : payment method */}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
