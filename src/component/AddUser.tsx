import { AiOutlineArrowLeft } from "react-icons/ai";
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userSchema } from "../validation/formValidations";
import { AddRoleProps } from "./AddRole";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { RoleDetails } from "../pages/Roles";
import handleApiError from "../utils/errorHandler/APiErrorHandler";
import toast from "react-hot-toast";

export type User = {
  name: string;
  email: string;
  mobile: string;
  role: string;
  image: File;
};
const AddUser = ({ onCancel, onRoleAdded }: AddRoleProps) => {
  const [roles, setRoles] = useState<RoleDetails[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>(
    "/public/image 7.png"
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fetchRoles = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/roles`,
        {
          withCredentials: true,
        }
      );
      setRoles(data.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const onSubmit = async (data: User) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("role", data.role);
    formData.append("image", data.image);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/user`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        toast.success(response.data.message);
        onRoleAdded();
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
        <AiOutlineArrowLeft size={20} onClick={onCancel} />
        <h1 className="text-xl font-bold ml-2">Add User</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col flex-grow flex-shrink">
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
          <div className="flex -mx-4 px-2 flex-wrap">
            <div className="flex-auto px-4">
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
            <div className="flex-auto px-4">
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
              </div>
                <div>
            </div>

                {errors.image && (
                  <p className="text-sm text-red-500">{errors.image.message}</p>
                )}
                </div>
            <div className="flex-auto px-4"></div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-auto flex-shrink-0 pb-10 px-4">
          <button
            type="button"
            onClick={onCancel}
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

export default AddUser;
