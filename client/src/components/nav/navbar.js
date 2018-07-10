import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = props => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">
      openChannel
    </Link>
    <div>
      <ul className="navbar-nav">
        <li
          className={
            window.location.pathname === "/" ||
            window.location.pathname === "/goals"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/" className="nav-link">
            Goals
          </Link>
        </li>
        <li
          className={
            window.location.pathname === "/logout"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/discover" className="nav-link">
           Log out
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
