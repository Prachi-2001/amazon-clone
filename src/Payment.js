import React from "react";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import './Payment.css';
import {Link , useNavigate} from 'react-router-dom';
import {useStripe,useElements,CardElement} from '@stripe/react-stripe-js';
import { useState, useEffect } from "react";
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from "./reducer";
import axios from './axios';
import {db} from './firebase';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret)
    console.log('👱', user)

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate('/orders', { replace: true });
        })

    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>


                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>


                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic will go */}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment





// import StripeCheckout from 'react-stripe-checkout';

// function Payment() {
   
//     const [{basket, user}, dispatch] = useStateValue();


//     // react stripe hooks 
//     const stripe = useStripe();
//     const elements = useElements();

//     const navigate = useNavigate();

//         // two pieaces of states 1. is for disable state and 2nd is for handle the error
//         const [error,setError] = useState(null);
//         const [disabled,setDisabled] = useState(true);

//         // states for button functionality 
//         const [succeeded,setSucceeded] = useState(false);
//         const [processing,setProcessing] = useState("");
//         const [clientSecret,setClientSecret] = useState(true);
        
//         // useEffect runs on the payment component loads
//         useEffect(() => {
//           const getClientSecret = async() => {
//             const response = await axios({
//               method: 'post',
//               // stripe expects the total in a currencies subunits.if u are using dollars it 
//               url: `/payments/create?total=${getBasketTotal(basket)* 100}`
//             });
//             setClientSecret(response.data.clientSecret)
//           }
//           getClientSecret();
//           // when the basket value changes useEffect will load 
//         }, [basket])

//         console.log('The secret key',clientSecret)

//     const basketItems = basket.map((item) => (
//         <CheckoutProduct
//         id = {item.id}
//         title={item.title}
//         rating = {item.rating}
//         price = {item.price} 
//         image={item.image}
//        />
//     ))

     

//       // const stripe1 = require('stripe')('sk_test_51Mx29RSCJzcvegipRjcTt8YsO2KDcXrWWJoizxZ3i9MpuKvcdX62wbVjYc3SjYJ7ggk3HDtAIPFftQr0MLsM6MAu00yCwbmqkW');

//       async function createPaymentIntent(total) {
//         const paymentIntent = await stripe.paymentIntents.create({
//           amount: total,
//           currency: 'usd',
//         });
      
//         return paymentIntent;
//       }

//       const paymentIntent = createPaymentIntent(basket.data)


//     const handleSubmit = async (event) => {
//       // do all the fancy stripe stuff 
//       event.preventDefault()
//       setProcessing(true);
      
//       <StripeCheckout
//           stripeKey="pk_test_51Mx29RSCJzcvegipAlWfzIWDMsnZe0ZhELSMHifFhucByOMfXOgVeF7KyZNNBLtpHXWhDiGABaD6OjZNjd1rF7Ly00Edb8Qr1y"
//           name="amazon clone"
//           amount={getBasketTotal(basket)* 100}
//           email={user.email}
//       />

//        const payload  = await stripe.confirmCardPayment(clientSecret,{
//           payment_method: {
//           type: 'card',
//            card: elements.getElement(CardElement)
//          }
//        }).then(
//         ({paymentIntent}) => {
//           // no sql database 
//           db
//           .collection('users')
//           .doc(user?.uid)
//           .collection('orders')
//           // create this paymentIntent id in db 
//           .doc(paymentIntent.id)
//           .set({
//             basket: basket,
//             amount: paymentIntent.amount,
//             // this will give the timestap when the order was created 
//             created: paymentIntent.created
//           })

//          setSucceeded(true);
//          setError(null)
//         setProcessing(false)

//         dispatch({
//           type: 'EMPTY_BASKET'
//         })

//          navigate('/orders', { replace: true });
       
//        }).catch(error => {
//          setError(error.message);
//          setProcessing(false);
//          setSucceeded(false);
//        });

//     }

    
//     const handleChange = event => {
//       // listen for changes in the card element 
//       // and display any errors as the customer type their card details 
//       setDisabled(event.empty);
//       setError(event.error ? event.error.message : "");
//     }

//   return (
//     <div className="payment">
//       <div className="payment--container">

//         <h1>Basket Items</h1>
//         <h3>Checkout (<Link to="/checkout">{basket && basket.length} Items</Link>)</h3>

//         <div className="payment--section">

//           {/* Payment section : delivery address */}
//           <div className="payment--title">
//             <h3>Delivery Address</h3>
//           </div>
//           <div className="payment--address">
//             <p>{user && user.email}</p>
//             <p>156 Ranstim Lane</p>
//             <p>Los Angeles, USA</p>
//           </div>
//         </div>
//         <div className="payment--section">
//             {/* Payment section :  review items */}
//             <div className="payment--title">
//             <h3>Review items and delivery</h3>
//           </div>
//           {/* here we are displaying items from basket  */}
//           <div className="payment--items">
//             {basketItems}
//           </div>

//         </div>
//         <div className="payment--section">
                 
//                  <div className="payment--title">
//             <h3>Payment Method</h3>
//           </div>

//           <div className="payment--detail">
//             {/* Payment section : payment method */}
//             <form onSubmit={handleSubmit}>
//               <CardElement onChange={handleChange}/>
//               <div className="payment--price">
//                 {/* adding currency format  */}
//                 <CurrencyFormat
//                   renderText={(value) => (
                 
//                         <p>
//                           Order total : <strong>{value}</strong>
//                         </p>
                     
//                     )}
//                     decimalScale={2}
//                     value={getBasketTotal(basket)} // Part of the homework
//                     displayType={"text"}
//                     thousandSeparator={true}
//                     prefix={"$"}
//                   /> 
//                   <button disabled={processing || disabled || succeeded}>
//                     <span>{processing? <p>Processing</p> : "Buy Now"}</span>
//                   </button>
//               </div>
//               {error && <p>{error}</p>}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Payment;
