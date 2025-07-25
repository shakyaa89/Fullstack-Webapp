import axios from "axios";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("All fields must be filled!");
    }

    const loginData = {
      email,
      password,
    };

    try {
      axios.post("http://localhost:3000/users/login", loginData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Login Form</h1>
      <p>Login to Continue</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
