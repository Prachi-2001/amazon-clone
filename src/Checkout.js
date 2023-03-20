import React from 'react';
import "./Checkout.css";
// import Checkout_Ad from "./images/checkout-ad.jpg" ;
import Subtotal from "./Subtotal";
function Checkout() {
  return (
    <div className='checkout'>
      <div className="checkout--left">
        <img className="checkout-ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668.jpg" alt="" />
       
        <div className="checkout--title"><h2>Your Shopping Basket</h2></div>
      </div> 
      {/* end of the left hand checkout */}
        <div className="chekout--right">
      {/* new component for right side subtotal is  created  */}
            <Subtotal/>
        </div>
    </div>
  )
}

export default Checkout
