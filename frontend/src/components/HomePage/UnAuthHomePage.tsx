import { Link } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

const UnAuthHomePage = () => {
  return (
    <div className="mt-40 flex flex-col items-center justify-center  text-white px-4">
      <CircleUserRound size={120} className="text-[#3E5641] mb-6" />
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to my React Project
      </h1>
      <p className="text-gray-300 mb-8 text-center max-w-md">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
        reprehenderit quis animi, temporibus aperiam recusandae. Maxime impedit
        repellendus quasi illo.
      </p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-[#3E5641] hover:bg-cyan-900 text-white px-5 py-3 rounded-md transition cursor-pointer"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default UnAuthHomePage;
