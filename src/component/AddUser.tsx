import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UsersDetails } from "../pages/Users";
import { Column } from "react-table";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import TableContent from "./TableContent";
import AlertDialog from "./AlertDialog";
import axios from "axios";
import handleApiError from "../utils/errorHandler/APiErrorHandler";
import toast from "react-hot-toast";

interface Props {
  users: UsersDetails[];
}

const UsersTable: React.FC<Props> = ({ users }) => {
  const navigate = useNavigate();

  const data = useMemo(
    () =>
      users.map((user, index) => ({
        id: index + 1,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        role: user.role.rolename,
        status: user.isBlock ? "Inactive" : "Active",
        originalUser: user,
      })),
    [users]
  );

  const columns: Column<(typeof data)[number]>[] = useMemo(
    () => [
      { Header: "Id", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Mobile", accessor: "mobile" },
      { Header: "Email-Id", accessor: "email" },
      {
        Header: RoleHeader,
        accessor: "role",
        disableSortBy: true,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={value === "Active" ? "text-green-500" : "text-red-500"}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Action",
        id: "action",
        Cell: ActionCell,
        disableSortBy: true,
      },
    ],
    [data]
  );

  function RoleHeader() {
    return (
      <div className="flex items-center gap-2">
        <span>Role</span>
        <img
          src="/public/image 7.png"
          alt="Profile"
          className="rounded-full w-10 h-10 object-cover"
        />
      </div>
    );
  }

  function ActionCell({ row }: { row: { original: { originalUser: { _id: string } } } }) {
    const handleEdit = () => {
      navigate(`/users/${row.original.originalUser._id}`);
    };

    const handleDelete = async () => {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/admin/user/${row.original.originalUser._id}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.message) {
          toast.success(res.data.message);
          navigate(0); 
        }
      } catch (err) {
        handleApiError(err);
      }
    };

    return (
      <div className="flex space-x-4">
        <FiEdit size={20} className="cursor-pointer" onClick={handleEdit} />
        <AlertDialog
          title="Delete"
          description="Are you sure you want to delete?"
          onConfirm={handleDelete}
        >
          <RiDeleteBinLine size={20} className="cursor-pointer" />
        </AlertDialog>
      </div>
    );
  }

  return <TableContent columns={columns} data={data} />;
};

export default UsersTable;
