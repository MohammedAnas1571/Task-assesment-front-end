import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validation/formValidations";
import Input from "../component/Input";
import axios from "axios";
import handleApiError from "../utils/errorHandler/APiErrorHandler";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsAdmin } from "../redux/adminSlice";
import ForgetPasswordDialog from "../component/ForgetPasswordDialog";
import { RootState } from "../redux/strore";

type LoginForm = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  if (isAdmin) {
    return <Navigate to={"/"} />;
  }

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/sign-in`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        dispatch(loginAsAdmin());
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="\public\image 5.png"
        alt=""
      />
      <div className="relative bg-white w-full mx-8 md:ml-12 px-6 py-8 shadow-lg border md:w-[450px]">
        <div className="flex justify-center">
          <img
            className="w-36 h-36"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLpJzzbEcNfWh75XVxx7F-nLUIsjlQQ965dg&s"
            alt="Logo"
          />
        </div>
        <p className="text-gray-400 text-center">
          Welcome to Digitalflake admin
        </p>
        <form className="mt-16" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            label="Email-id"
            type="email"
            fullWidth={true}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
          <Input
            label="Password"
            type="password"
            fullWidth={true}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
          <div className="text-end">
            <ForgetPasswordDialog>
              <button type="button" className="text-sm text-violet-600">
                Forgot Password?
              </button>
            </ForgetPasswordDialog>
          </div>
          <div className="mt-16 grid">
            <button className="bg-violet-900 h-10 rounded text-white">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
