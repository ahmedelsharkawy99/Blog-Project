import React, { useMemo } from "react";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import useAuthContext from "../hooks/useAuthContext";

const Dorpdown = () => {
  const { user } = useAuthContext();
  const avater = useMemo(() => {
    return user ? (
      <img
        className="avatar"
        src={user.photoURL}
        alt={user?.displayName}
        width="34"
        height="34"
      />
    ) : (
      "Login"
    );
  }, [user]);

  return (
    <ul className="navbar-nav mb-2 mb-lg-0">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="/dropdown"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {avater}
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <div className="d-flex justify-content-center align-items-center p-2">
            <LogIn />
            <LogOut />
          </div>
        </ul>
      </li>
    </ul>
  );
};

export default Dorpdown;
