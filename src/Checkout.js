import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
// import Checkout_Ad from "./images/checkout-ad.jpg" ;
import { useStateValue } from './StateProvider';


import Subtotal from "./Subtotal";
function Checkout() {
  const [{basket},dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout--left">
        <img
          className="checkout-ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668.jpg"
          alt=""
        />

        <div >
          <h2 className="checkout--title">Your Shopping Basket</h2>
            {basket.map(item => {
              return <CheckoutProduct 
                id = {item.id}
                title={item.title}
                rating = {item.rating}
                price = {item.price} 
                image={item.image}
              />
            })}
        </div>
      </div>
      {/* end of the left hand checkout */}
      <div className="chekout--right">
        {/* new component for right side subtotal is  created  */}
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
