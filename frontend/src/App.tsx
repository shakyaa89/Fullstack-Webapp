import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import CreateQuestionSetPage from "./pages/QuestionSet/CreateQuestionSetPage";
import { jwtDecode } from "jwt-decode";
import ListQuestionSetPage from "./pages/QuestionSet/ListQuestionSetPage";
import AttemptQuizPage from "./pages/QuestionSet/AttemptQuizPage";
import ProfilePage from "./pages/ProfilePage";

export interface IAuthState {
  isAuth: boolean;
  roleState: "Admin" | "Professional" | "guest";
}

export interface IAuthContext extends IAuthState {
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
}

export interface JWTDecode {
  role: "Admin" | "Professional";
  id: string;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  roleState: "guest",
  setAuthState: () => {},
});

function App() {
  const [authState, setAuthState] = useState<IAuthState>({
    isAuth: false,
    roleState: "guest",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoading(false);
      return;
    }
    async function fetchData() {
      axios
        .get("http://localhost:3000/api/verify/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          const { role }: JWTDecode = jwtDecode(accessToken as string);

          setAuthState((prev) => ({
            ...prev,
            isAuth: true,
            roleState: role,
          }));
          setIsLoading(false);
        })
        .catch(() => {
          localStorage.clear();
          setIsLoading(false);
        });
    }
    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuth: authState.isAuth,
          roleState: authState.roleState,
          setAuthState: setAuthState,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          {!authState?.isAuth && (
            <>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </>
          )}
          {authState?.isAuth && (
            <>
              <Route path="/profile" element={<ProfilePage />} />

              <Route
                path="/questionset/list"
                element={<ListQuestionSetPage />}
              />
              <Route
                path="questionset/:id/attempt"
                element={<AttemptQuizPage />}
              />
            </>
          )}
          {authState?.roleState === "Admin" && (
            <>
              <Route
                path="/admin/questionset/create"
                element={<CreateQuestionSetPage />}
              />
            </>
          )}
          <Route
            path="*"
            element={
              <div className="mt-40 flex flex-col items-center justify-center text-white px-4">
                <h1 className="text-9xl font-extrabold text-red-600 mb-6 animate-pulse">
                  404
                </h1>
                <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
                <p className="text-gray-300 mb-8 text-center max-w-md">
                  The page you are looking for doesn’t exist.
                </p>
                <a
                  href="/"
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-semibold transition"
                >
                  Go Home
                </a>
              </div>
            }
          />
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
