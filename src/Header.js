import React from "react";
import "./Header.css";
import Amazon_logo from "./images/Amazon-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import {auth} from './firebase'

function Header() {
  // basket contains set of items 
  // here we get user from app -> reducer -> this page 
  const [{basket, user},dispatch] = useStateValue();

  const handleAuthentication = () => {
    if(user){
      // calling signout method when there is a user logged in
      auth.signOut();
    }else{
      
    }
  }
  return (
    <div className="header">
      <Link to="/">
        <img className="header--logo" src={Amazon_logo} />
      </Link>
      <div className="header--search">
        <input type="text" className="header--search--input" />
        <SearchIcon className="header-search-icon" />
      </div>
      <div className="header--nav">
        <Link to={!user && '/login'}>
        <div onClick={handleAuthentication}  className="header--option">
          <span className="header--optionOne">Hello {!user ? 'Guest' : user.email}</span>
          <span className="header--optionTwo"> {user ? 'SignOut':'SignIn'}</span>
        </div>
        </Link>
        <div className="header--option">
          <span className="header--optionOne">Returns</span>
          <span className="header--optionTwo">& Orders</span>
        </div>
        <div className="header--option">
          <span className="header--optionOne">Your</span>
          <span className="header--optionTwo">Prime</span>
        </div>
        <Link to="/Checkout">
          <div className="header--BasketOption">
            <ShoppingBasketIcon />
            <span className="header-optionLineTwo header-basketCount">{basket.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
