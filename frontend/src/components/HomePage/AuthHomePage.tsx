import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext, type IAuthContext } from "../../App";
import { Link } from "react-router-dom";

interface ProfileData {
  user: {
    name: string;
    email: string;
  };
  bio: string;
  skills: Array<{
    name: string;
    level: string;
  }>;
  github: string;
  linkedin: string;
  portfolioUrl: string;
  profilePicture: string;
}

const AuthHomePage = () => {
  const [userProfile, setUserProfile] = useState<ProfileData | null>(null);
  const { roleState } = useContext<IAuthContext>(AuthContext);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    async function fetchUser() {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/profile/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = response?.data?.profile;
        setUserProfile(data);
      } catch (error: any) {
        alert(error?.response?.data?.message || "Failed to fetch profile");
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 mt-20">
      <div className=" text-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>

        <p className="text-lg font-semibold">{userProfile?.user.name}</p>
        <p className="text-gray-400">{userProfile?.user.email}</p>
        <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mt-3">
          {roleState}
        </span>

        <div className="flex justify-center mt-5 gap-4">
          <Link
            to="/questionset/list"
            className="bg-[#3E5641] text-white px-4 py-2 rounded-lg hover:bg-[#2d3f30] transition"
          >
            View Questions
          </Link>
          <Link
            to="/profile"
            className="bg-[#3E5641] text-white px-4 py-2 rounded-lg hover:bg-[#2d3f30] transition"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthHomePage;
