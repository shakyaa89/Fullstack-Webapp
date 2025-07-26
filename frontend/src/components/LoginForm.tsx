import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      await axios.post("http://localhost:3000/users/login", loginData);
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <div className=" backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center px-10 py-10 mt-20 rounded-xl w-full max-w-md mx-auto text-[#F0F0F0]">
      <h1 className="text-3xl mb-7 font-bold">Login</h1>
      <p className="text-xl mb-10 font-semibold">Login to your account.</p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className="text-lg w-full px-1 py-2 border-b border-white/30 focus:border-white/100 hover:border-white/100 focus:border-white transition-all duration-300 ease-in-out text-white focus:outline-none mb-5"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          className="text-lg w-full px-1 py-2 border-b border-white/30 focus:border-white/100 hover:border-white/100 focus:border-white transition-all duration-300 ease-in-out text-white focus:outline-none mb-5"
        />

        {error && (
          <p className="text-red-500 text-center font-semibold">{error}</p>
        )}

        {showSuccess && (
          <p className="text-green-500 text-center">
            Login Successful! Redirecting...
          </p>
        )}

        <button
          type="submit"
          className="mt-2w-full bg-[#3E5641] hover:bg-cyan-900 text-white px-4 py-2 rounded-md shadow-md transition cursor-pointer"
        >
          Login
        </button>
        <p className="text-md mb-5 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="underline text-blue-500 hover:text-blue-700 transition-all duration-300 ease-in-out"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
