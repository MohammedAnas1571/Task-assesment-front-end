import React, { useMemo } from "react";
import { Column } from "react-table";
import { RoleDetails } from "../pages/Roles";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import TableContent from "./TableContent";
import AlertDialog from "./AlertDialog";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
  roles: RoleDetails[];
}

const RolesTable: React.FC<Props> = ({ roles }) => {
  const navigate = useNavigate();

  const handleDelete = async (roleId: string) => {
    try {
   
    const res =  await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/admin/role/${roleId}`,{withCredentials: true});
      if(res.data.message){
        toast.success(res.data.message)
        navigate(0); 
      }
    } catch (error) {
      console.error(`Error deleting role with ID ${roleId}:`, error);
    }
  };

  const data = useMemo(
    () =>
      roles.map((role, index) => ({
        id: index + 1,
        name: role.rolename,
        status: role.isBlock ? "Inactive" : "Active",
        originalRole: role,
      })),
    [roles]
  );

  const columns: Column<(typeof data)[number]>[] = useMemo(
    () => [
      { Header: "Id", accessor: "id" },
      { Header: "Role Name", accessor: "name" },
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
        Cell: ({ row }) => (
          <div className="flex space-x-4">
            <Link to={`/roles/${row.original.originalRole._id}`}>
              <FiEdit size={20} className="cursor-pointer" />
            </Link>
            <AlertDialog
              title="Delete"
              description="Are you sure you want to delete?"
              onConfirm={() => handleDelete(row.original.originalRole._id)}
            >
              <button>
                <RiDeleteBinLine size={20} className="cursor-pointer" />
              </button>
            </AlertDialog>
          </div>
        ),
        disableSortBy: true,
      },
    ],
    [roles] 
  );
  
  return <TableContent columns={columns} data={data} />;
};

export default RolesTable;
