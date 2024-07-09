import { FaRegUserCircle } from "react-icons/fa";
import NavBar from "../component/NavBar";

import { useEffect, useState } from "react";
import AddUser from "../component/AddUser";
import UsersTable from "../component/UsersTable";
import axios from "axios";
import handleApiError from "../utils/errorHandler/APiErrorHandler";

export type UsersDetails = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: { rolename: string; _id: string };
  image: File | string;
  isBlock: string;
};

const Users = () => {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [users, setUsers] = useState<UsersDetails[]>([]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/users`,
        {
          withCredentials: true,
        }
      );
      setUsers(data.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setIsAddingUser(true);
  };

  const handleCancelAddUser = () => {
    setIsAddingUser(false);
  };

  const handleUserAdded = () => {
    setIsAddingUser(false);
    fetchUsers();
  };

  return (
    <div className="relative flex flex-col min-h-[inherit] h-full">
      {isAddingUser && (
        <AddUser onCancel={handleCancelAddUser} onRoleAdded={handleUserAdded} />
      )}

      {!isAddingUser && (
        <>
          <NavBar
            name="User"
            icon={FaRegUserCircle}
            onRoleAdded={handleAddUser}
          />
          <div className="my-5">
            <UsersTable users={users} />
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
