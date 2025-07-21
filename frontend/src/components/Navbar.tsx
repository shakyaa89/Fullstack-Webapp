import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>
      <NavLink
        to="/aboutus"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        About Us
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Register
      </NavLink>
    </div>
  );
};

export default Navbar;
