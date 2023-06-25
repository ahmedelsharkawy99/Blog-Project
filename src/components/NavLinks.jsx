import { NavLink } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const NavLinks = () => {
  const { user } = useAuthContext();

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/">
          Home
        </NavLink>
      </li>
      {user && (
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/profile">
            Profile
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
