import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import Input from "../component/Input";
import { editSchema } from "../validation/formValidations";
import handleApiError from "../utils/errorHandler/APiErrorHandler";
import { RoleDetails } from "./Roles";

const EditRole: React.FC = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState<RoleDetails | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RoleDetails>({
    resolver: zodResolver(editSchema),
  });

  const fetchRoleDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/role/${roleId}`,
        {
          withCredentials: true,
        }
      );
      setRole(data.data);
      setValue("rolename", data.data.rolename);
      setValue("isBlock", data.data.isBlock.toString());
    } catch (err) {
      handleApiError(err);
    }
  };

  useEffect(() => {
    fetchRoleDetails();
  }, [roleId]);

  const onSubmit = async (data: RoleDetails) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/role/${roleId}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        toast.success(response.data.message);
        navigate("/roles");
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="flex-grow flex-shrink flex flex-col">
      <div className="flex p-2 items-center flex-shrink-0">
        <AiOutlineArrowLeft size={20} onClick={() => navigate(-1)} />
        <h1 className="text-xl font-bold ml-2">Add User</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col flex-grow flex-shrink"
      >
        <div className="flex-grow flex-shrink min-h-0">
          <div className="flex -mx-4 px-2 flex-wrap flex-col md:flex-row">
            <div className="px-4 flex-grow flex-shrink">
              <Input
                label="Role Name"
                type="text"
                fullWidth
                {...register("rolename")}
              />
              {errors.rolename && (
                <p className="text-sm text-red-500">
                  {errors.rolename.message}
                </p>
              )}
            </div>
            <div className="px-4 flex-grow flex-shrink">
              <div className="relative mt-5">
                <label
                  className="text-sm text-gray-400 absolute px-1 bg-white left-2"
                  style={{ transform: "translateY(-10px)" }}
                >
                  Status
                </label>
                <select
                  className="border border-gray-700 rounded-md px-4 h-12 outline-none w-full"
                  {...register("isBlock")}
                >
                  <option value="false">Active</option>
                  <option value="true">Inactive</option>
                </select>
              </div>
            </div>
            <div className="px-4 flex-grow flex-shrink-0"></div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-auto flex-shrink-0 pb-10 px-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border px-8 h-9 rounded-full"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-violet-900 text-white border rounded-full px-8 h-9"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRole;
