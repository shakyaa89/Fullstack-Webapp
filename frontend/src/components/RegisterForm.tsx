import axios from "axios";
import { UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevents default behaviour, stop page refresh on form submit
    const finalData = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/users/create",
        finalData
      );
      setEmail("");
      setName("");
      setPassword("");
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.4)] px-10 py-10 mt-20 text-[#F0F0F0] rounded-xl w-full max-w-md mx-auto">
      <h1 className="mb-7">
        <UserRoundPlus size={100} />
      </h1>
      <p className="text-xl mb-10 font-semibold">Create an account</p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          className="text-lg w-full px-1 py-2 border-b border-white/30 focus:border-white/100 focus:border-white hover:border-white/100 transition-all duration-300 ease-in-out text-white focus:outline-none mb-5"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="text-lg w-full px-1 py-2 border-b border-white/30 focus:border-white/100 focus:border-white hover:border-white/100 transition-all duration-300 ease-in-out text-white focus:outline-none mb-5"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="text-lg w-full px-1 py-2 border-b border-white/30 focus:border-white/100 focus:border-white hover:border-white/100 transition-all duration-300 ease-in-out text-white focus:outline-none mb-5"
        />

        {error && (
          <p className="text-red-500 text-center font-semibold">{error}</p>
        )}

        {showSuccess && (
          <p className="text-green-500 text-center">
            Registration Successful! Redirecting...
          </p>
        )}

        <button
          type="submit"
          className="mt-2 w-full bg-[#3E5641] hover:bg-[#2d3f30] text-white px-4 py-2 rounded-md shadow-md transition cursor-pointer"
        >
          Register
        </button>
        <p className="text-md mb-5 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline text-blue-500 hover:text-blue-700 transition-all duration-300 ease-in-out"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
export default RegisterForm;
