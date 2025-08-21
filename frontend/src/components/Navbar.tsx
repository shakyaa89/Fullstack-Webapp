import {
  BookPlus,
  FileText,
  House,
  KeyRound,
  SearchCheck,
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext, type IAuthContext } from "../App";
import { useContext } from "react";

const Navbar = () => {
  const { isAuth, setAuthState } = useContext<IAuthContext>(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    setAuthState((prev) => ({
      ...prev,
      isAuth: false,
    }));
  };

  return (
    <nav className=" flex items-center justify-center">
      <div className="backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.4)] px-4 py-4 flex items-center justify-evenly w-full ">
        <div className="inline-flex items-center text-2xl font-semibold text-white">
          <SearchCheck size={38} className="mr-2" /> React Project
        </div>
        <div className="space-x-6 text-gray-300 text-sm font-medium">
          <NavLink
            to="/"
            className="inline-flex items-center hover:text-white text-lg text-md transition-all ease-in-out duration-300 px-[10px] py-[5px] rounded-md"
          >
            <House size={20} className="mr-1" /> Home
          </NavLink>
          <NavLink
            to="/about"
            className="inline-flex items-center hover:text-white text-lg text-md transition-all ease-in-out duration-300 px-[10px] py-[5px] rounded-md"
          >
            <FileText size={20} className="mr-1" />
            About Us
          </NavLink>

          {isAuth ? (
            <>
              <NavLink
                to="/questionset/list"
                className=" inline-flex items-center hover:text-white text-lg text-md transition-all ease-in-out duration-300 px-[10px] py-[5px] rounded-md"
              >
                <BookPlus size={20} className="mr-1" />
                Questions
              </NavLink>
              <NavLink
                to="/profile"
                className=" inline-flex items-center hover:text-white text-lg text-md transition-all ease-in-out duration-300 px-[10px] py-[5px] rounded-md"
              >
                <User size={20} className="mr-1" />
                Profile
              </NavLink>
              <button
                onClick={() => {
                  logoutHandler();
                  navigate("/");
                }}
                className=" inline-flex items-center hover:text-white text-lg text-md transition-all ease-in-out duration-300 px-[10px] py-[5px] rounded-md cursor-pointer"
              >
                <KeyRound size={20} className="mr-1" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className=" inline-flex items-center hover:text-white text-lg text-md transition-all ease-in-out duration-300 px-[10px] py-[5px] rounded-md"
              >
                <BookPlus size={20} className="mr-1" />
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="inline-flex items-center hover:text-white text-lg text-md transition-all ease-in-out duration-300 px-[10px] py-[5px] rounded-md"
              >
                <KeyRound size={20} className="mr-1" /> Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
