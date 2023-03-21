import React from 'react'
import "./CheckoutProduct.css"
import { useStateValue } from './StateProvider';

function CheckoutProduct({id,image,title,price,rating}) {
  
  const [{basket},dispatch] = useStateValue();
  const removeFromBasket = () => {
    // remove the item from the basket 
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    })
  }
  return (
    <div className='checkoutProduct'>
      <img className="checkoutproduct--image" src={image} alt="" />
    <div className="checkoutproduct--info">
      <p className='checkoutproduct--title'>{title}</p>
    
      <p className='chekoutproduct--price'> <small>$</small> <strong>{price}</strong></p>
      <div className="checkoutproduct--rating">
           {/* create an array of 5 size and map with stars */}
            {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
      </div>
      <button onClick={removeFromBasket}>Remove from Basket</button>
      </div>
    </div>
  )
}

export default CheckoutProduct
