import React from 'react';
import logo from '../assets/hashedinlogo.png';
import cart from '../assets/noun_profile_2068277.svg';
import profile from '../assets/shopping-cart.svg';
import '../styles/header.css';
import {NavLink} from 'react-router-dom';

function Header(){
    return(
      <>
      <div  className="flex outer-container">
        <div className="navDiv navBig">
          <NavLink to="/home">
              <img className="clickable" id="hashedInNav" src={logo} alt="hashedIn" />
          </NavLink>
        </div>
        <div className="nav">
        {/* <div className="navBig navDiv" id="search">
          <input className="searchField" type="text" placeholder="Search for anything" />
          <img className="clickable" id="searchIcon" src="https://image.flaticon.com/icons/png/512/55/55369.png" alt="search" />
        </div> */}
          <div className="nav-option">
            <NavLink activeClassName="active" to="/courses" className="navicons">Courses
            </NavLink>
          </div>
        <div className="nav-option">
            <NavLink activeClassName="active" to="/wishlist" className="navicons">Wishlist
            </NavLink>
        </div>
        <div className="navDiv navBig" id="navRight">
          <NavLink to="/cart">
              <img className="clickable" id="cart" src={profile} alt="cart" />
          </NavLink>
        </div>
        
        <div className="navDiv navBig" id="navRight">
          <NavLink to="/profile">
              <img className="clickable" id="cart" src={cart} alt="cart" />
          </NavLink>
        </div>

        </div>
      </div>
      </>
    );
}

export default Header;