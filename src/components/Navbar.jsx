import React from "react";
import NavSerachForm from "./NavSerachForm";
import NavLinks from "./NavLinks";
import Dorpdown from "./Dorpdown";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ⚡️ Firestock
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <NavLinks />
          <NavSerachForm />
          <Dorpdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
