// EditUser.jsx
import React, { useEffect, useState, useRef } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Input from "../component/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userEditSchema } from "../validation/formValidations";
import axios from "axios";
import handleApiError from "../utils/errorHandler/APiErrorHandler";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { UsersDetails } from "./Users";
import { RoleDetails } from "./Roles";

const EditUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [roles, setRoles] = useState<RoleDetails[]>([]);
  const [selectedImage, setSelectedImage] = useState("/public/image 7.png");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UsersDetails>({
    resolver: zodResolver(userEditSchema),
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/roles`,
          { withCredentials: true }
        );
        setRoles(data.data);
      } catch (error) {
        handleApiError(error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/user/${userId}`,
          { withCredentials: true }
        );
        const userData = data.data;
        setValue("name", userData.name);
        setValue("email", userData.email);
        setValue("mobile", String(userData.mobile));
        setValue("role", userData.role._id);
        setValue("image", userData.profilePhoto);
        setValue("isBlock", userData.isBlock ? "true" : "false");
        setSelectedImage(
          `${import.meta.env.VITE_API_BASE_URL}/${userData.profilePhoto}`
        );
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchRoles();
    fetchUserDetails();
  }, [userId, setValue]);

  const onSubmit = async (data: UsersDetails) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("role", data.role);
    formData.append("isBlock", data.isBlock);
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/user/${userId}`,
        formData,
        { withCredentials: true }
      );
      if (response.data) {
        toast.success(response.data.message);
        navigate("/users");
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      setSelectedImage(URL.createObjectURL(imageFile));
      setValue("image", imageFile);
    }
  };

  const { ref: imageRef, ...imageRegister } = register("image");

  return (
   

    <div className="flex-grow flex-shrink flex flex-col">
      <div className="flex p-2 items-center flex-shrink-0">
        <AiOutlineArrowLeft
          size={20}
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold ml-2">Edit User</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col flex-grow flex-shrink"
      >
        <div className="flex-grow flex-shrink min-h-0">
          <div className="flex -mx-4 px-2 flex-wrap">
            <div className="px-4 flex-grow flex-shrink">
              <Input label="Name" type="text" fullWidth {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="px-4 flex-grow flex-shrink">
              <Input
                label="Mobile"
                type="text"
                fullWidth
                {...register("mobile")}
              />
              {errors.mobile && (
                <p className="text-sm text-red-500">{errors.mobile.message}</p>
              )}
            </div>
            <div className="px-4 flex-grow flex-shrink">
              <Input
                label="Email-Id"
                type="text"
                fullWidth
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="flex -mx-4 px-2 flex-wrap flex-col md:flex-row">
            <div className="flex-1 px-4">
              <div className="relative mt-5">
                <label
                  className="text-sm text-gray-400 absolute px-1 bg-white left-2"
                  style={{ transform: "translateY(-10px)" }}
                >
                  Role
                </label>
                <select
                  className="border border-gray-700 rounded-md px-4 h-12 outline-none w-full"
                  {...register("role")}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.rolename}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="text-sm text-red-500">{errors.role.message}</p>
                )}
              </div>
            </div>
            <div className="flex-1 px-4">
              <div className="flex">
                <div className="relative mt-5 border border-gray-700 rounded-md h-24 max-w-36 px-8 flex items-center justify-center">
                  <label
                    className="text-sm text-gray-400 absolute top-0 left-2 px-1 bg-white"
                    style={{ transform: "translateY(-10px)" }}
                  >
                    Upload-image
                  </label>
                  <img
                    src={selectedImage}
                    alt="Profile Picture"
                    className="h-15 w-15 rounded-full object-cover"
                  />
                </div>
                <div className="relative mt-5 ml-4 border border-dashed border-gray-400 rounded-md h-24 max-w-36 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <img
                      src="/public/imageupload.png"
                      alt="Profile Picture"
                      className="h-10 w-10 my-2 cursor-pointer rounded-full object-cover"
                      onClick={() => inputRef.current?.click()}
                    />
                    <input
                      type="file"
                      ref={(e) => {
                        imageRef(e);
                        inputRef.current = e;
                      }}
                      {...imageRegister}
                      onChange={handleImageChange}
                      hidden
                      accept="image/*"
                    />
                    <p className="text-[10px] mb-2 text-center">
                      Upload maximum allowed file size is 10 MB
                    </p>
                  </div>
                </div>
                {errors.image && (
                  <p className="text-sm text-red-500">{errors.image.message}</p>
                )}
              </div>
            </div>
            <div className="flex-1 px-4">
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
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-auto flex-shrink-0 pb-10 px-4">
          <button
            type="button"
            className="border px-8 h-9 rounded-full"
            onClick={() => navigate(-1)}
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

export default EditUser;
