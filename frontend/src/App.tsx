import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export interface IAuthContext {
  isAuth: boolean;
  setAuthState: React.Dispatch<
    React.SetStateAction<{
      isAuth: boolean;
    }>
  >;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  setAuthState: () => {},
});

function App() {
  const [authState, setAuthState] = useState({
    isAuth: false,
  });

  console.log("auth => ", authState);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }

    async function fetchData() {
      axios
        .get("http://localhost:3000/api/verify/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setAuthState((prev) => ({
            ...prev,
            isAuth: true,
          }));
        })
        .catch((error) => {});
    }

    fetchData();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuth: authState.isAuth,
          setAuthState: setAuthState,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
