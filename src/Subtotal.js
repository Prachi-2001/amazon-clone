import React from "react";
import "./Subtotal.css";
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import {useNavigate} from 'react-router-dom';


function Subtotal() {
  const history = useNavigate();
  // usestatevalue function pass the value in the basket and then dispatch will pass the value 
  const [{basket},dispatch] = useStateValue();

  return (
    <div className="subtotal">
      {/* Inbuilt component  */}
        <CurrencyFormat
        renderText={(value) => (
        <>
              <p>
                {/* Part of the homework */}
                Subtotal ({basket.length}): <strong>{value}</strong>
              </p>
              <small className="subtotal__gift">
                <input type="checkbox" /> This order contains a gift
              </small>
            </>
          )}
          decimalScale={2}
          value={getBasketTotal(basket)} // Part of the homework
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        /> 
          {/* aftrer clicking on proceed to payemnt will redirect on payment by immplementing  useNavigate() hook  */}
    <button onClick={e => history('/payment') }>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
