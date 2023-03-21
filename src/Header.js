import React from "react";
import "./Header.css";
import Amazon_logo from "./images/Amazon-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
function Header() {
  // basket contains set of items 
  const [{basket},dispatch] = useStateValue();
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
        <Link to="/login">
        <div className="header--option">
          <span className="header--optionOne">Hello, Sign in</span>
          <span className="header--optionTwo">Account & Lists</span>
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
