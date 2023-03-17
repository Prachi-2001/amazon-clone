import React from "react";
import "./Header.css";
import Amazon_logo from "./images/Amazon-logo.png"
import SearchIcon from '@mui/icons-material/Search';

function Header() {
  return (
    <div className="header">
      <img className="header--logo" src={Amazon_logo} />
      <div className="header--search">
        <input type="text" className="header--search--input" />
        <SearchIcon className="header-search-icon"/> 
      </div>
      <div className="header--nav">
        <div className="header--option">
          <span className="header--optionOne">Hello, Sign in</span>
          <span className="header--optionTwo">Account & Lists</span>
        </div>
        <div className="header--option">
          <span className="header--optionOne">Returns</span>
          <span className="header--optionTwo">& Orders</span>
        </div>
        <div className="header--option">
          <span className="header--optionOne">Hello</span>
          <span className="header--optionTwo">Prime</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
