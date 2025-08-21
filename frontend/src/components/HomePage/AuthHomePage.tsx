import axios from "axios";
import { useEffect, useState } from "react";
import MyInformation from "../MyInformation";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  __v: number;
}

const AuthHomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/users/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userList: User[] = response?.data?.user || [];
        setUsers(userList);
      } catch (error: any) {
        console.error("error => ", error);
        setError(error?.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [accessToken]);

  if (loading)
    return <p className="text-white text-center">Loading users...</p>;
  if (error) return <p className="text-red-400 text-center">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8 flex flex-wrap gap-2 justify-center">
      <div>
        <h1 className="text-2xl font-bold text-white ">Users List</h1>
      </div>
      <div className="max-w-6xl mx-auto mt-8 flex flex-wrap gap-6 justify-center">
        {users.length > 0 ? (
          users.map((user) => (
            <MyInformation
              key={user._id}
              id={user._id}
              name={user.name}
              email={user.email}
            />
          ))
        ) : (
          <p className="text-gray-300 w-full text-center">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AuthHomePage;
