import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" flex items-center justify-center">
      <div className="backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.4)] px-4 py-4 flex items-center justify-evenly w-full ">
        <div className="text-2xl font-semibold text-white">React Project</div>
        <div className="space-x-6 text-gray-300 text-sm font-medium">
          <NavLink
            to="/"
            className="hover:text-white text-lg text-md transition-all ease-in-out duration-300 px-[10px] py-[5px] rounded-md"
          >
            Home
          </NavLink>
          <NavLink
            to="/aboutus"
            className="hover:text-white text-lg text-md transition-all ease-in-out duration-300 px-[10px] py-[5px] rounded-md"
          >
            About Us
          </NavLink>
          <NavLink
            to="/register"
            className="hover:text-white text-lg text-md transition-all ease-in-out duration-300 px-[10px] py-[5px] rounded-md"
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className="hover:text-white text-lg text-md transition-all ease-in-out duration-300 px-[10px] py-[5px] rounded-md"
          >
            Login &rarr;
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
