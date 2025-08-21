import { useContext } from "react";
import AuthHomePage from "../components/HomePage/AuthHomePage";
import UnAuthHomePage from "../components/HomePage/UnAuthHomePage";
import { AuthContext, type IAuthContext } from "../App";

const HomePage = () => {
  const { isAuth } = useContext<IAuthContext>(AuthContext);

  return <div>{isAuth ? <AuthHomePage /> : <UnAuthHomePage />}</div>;
};

export default HomePage;
