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
        <ul className="navbar-item">
          <li>
            <Link to="/orderHistory" className="has-text-white is-size-4 pr-3">
              Order History
            </Link>
          </li>
          <li className="has-text-white is-size-4">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" className="has-text-white is-size-4" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-item">
          <li>
            <Link to="/login" className="has-text-white is-size-4 pr-3">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="has-text-white is-size-4 ">
              Signup
            </Link>
          </li>

        </ul>
      );
    }
  }
  //displays main black header with all of category links
return (
  <header className="">
    <nav
      className="navbar has-background-black"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io"></a>
        {/* burger menu that displays when window is minimized, not functioning yet */}
        <a
          role="button"
          className="navbar-burger has-text-white"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item has-text-white is-size-4" href="/">
            <span className="pr-3 is-flex">
              <img src={obLogoSmall} alt="small circular stone" />
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
