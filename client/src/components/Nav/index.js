import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

//small logo used on navbar
import obLogoSmall from '../../assets/obLogoSmall.png';
import CategoryMenu from "../CategoryMenu";



function Nav() {
  //function that verifies if user is logged in also used to log out
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="navbar has-background-black">
          <li>
            <Link to="/orderHistory" className="navbar-item has-text-white is-size-4 pr-1 comforta">
              Order History
            </Link>
          </li>
          <li className="has-text-white is-size-4">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" className="navbar-item has-text-white is-size-4 pr-1 comforta" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar has-background-black">
          <li>
            <Link to="/login" className="navbar-item has-text-white is-size-4 pr-1 comforta">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="navbar-item has-text-white is-size-4 comforta">
              Signup
            </Link>
          </li>

        </ul>
      );
    }
  }
  //displays main black header with all of category links
  return (
    <header>
      <nav
        className="navbar has-background-black"
    
      >
       
          <div className="jankHamburger">

            <a
              role="button"
              className=""
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <a className="navbar-item has-text-white is-size-4 comforta" href="/">
              Obsidian Bazaar
            </a>
              <CategoryMenu />
              <a>{showNavigation()}</a>
            </a>
            
          </div>
        

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item has-text-white is-size-4 comforta" href="/">
              <span className="pr-1 is-flex ">
                <img className="pb-1" src={obLogoSmall} alt="small circular stone" />
              </span>
              Obsidian Bazaar
            </a>
            <CategoryMenu />
          </div>

          <div className="navbar-end">{showNavigation()}</div>
        </div>
      </nav>

    </header>
  );

}

export default Nav;
