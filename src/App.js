import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Product from "./Product";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// it loads stripe and store it into a promise 
const promise = loadStripe(
  "pk_test_51Mx29RSCJzcvegipAlWfzIWDMsnZe0ZhELSMHifFhucByOMfXOgVeF7KyZNNBLtpHXWhDiGABaD6OjZNjd1rF7Ly00Edb8Qr1y"
);

function App() {
  // create useeffect eventlistener for tracking who is sign in
  // kind of if statement in react
  const [{}, dispatch] = useStateValue();

  // this useeffect will run after login or logout
  useEffect(() => {
    // will only load once when only app component loads
    auth.onAuthStateChanged((authUser) => {
      // console.log('The user is', authUser)
      // if the user just logged in / the user was logged in
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    // wrapped app in router
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header /> <Home />
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/login"
            element={
              <div>
                <Login />
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/payment"
            element={
              <div>
                <Header /> 
                {/* elements is component. In React, the <Elements> component is provided by the @stripe/react-stripe-js library and is used to wrap the Stripe PaymentIntents and PaymentMethods APIs.*/}
                <Elements stripe={promise}><Payment /></Elements>
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/checkout"
            element={
              <div>
                <Header /> <Checkout />{" "}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
