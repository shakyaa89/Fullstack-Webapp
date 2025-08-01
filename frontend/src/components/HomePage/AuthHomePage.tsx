import axios from "axios";
import { useEffect, useState } from "react";
import MyInformation from "../../MyInformation";

export interface user {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  __v: number;
}

const AuthHomePage = () => {
  const [users, setUser] = useState<user[]>([]);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    async function fetchData() {
      axios
        .get("http://localhost:3000/users/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const userList: user[] = response?.data?.user;
          setUser(userList);
        })
        .catch((error) => {
          console.log("error => ", error);
          const errors = error?.response?.data?.message || "An error occurred";
          alert(errors);
        });
    }

    fetchData();
  }, []);

  return (
    <div>
      {users.map((user) => {
        return (
          <>
            <MyInformation
              id={user?._id}
              name={user?.name}
              email={user?.email}
            />
          </>
        );
      })}
    </div>
  );
};

export default AuthHomePage;
