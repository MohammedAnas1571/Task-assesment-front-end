import { Modal, ModalContent, ModalTrigger } from "./Modal";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import toast from "react-hot-toast";
import { emailSchema } from "../validation/formValidations";
import handleApiError from "../utils/errorHandler/APiErrorHandler";



type EmailFormData = z.infer<typeof emailSchema>;

type Props = {
  children: React.ReactElement;
};

export default function ForgetPasswordDialog({ children }: Props) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/forgot-password`, data, {
        withCredentials: true,
      });
      toast.success("Reset link sent to your email");
      navigate(-1)
    } catch (err) {
     handleApiError(err)
    }
  };

  return (
    <Modal>
      <ModalTrigger>{children}</ModalTrigger>
      <ModalContent>
        {({ closeModal }) => (
          <div className="flex flex-col items-center ">
            <h1 className="text-xl font-semibold mb-4">Did you forget your password?</h1>
            <p className="text-sm text-gray-400 mb-6">
              Enter your email address and we will send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
              <div className="flex flex-col w-full mb-4 px-10">
                <label className="text-gray-500 text-sm mb-2 " htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  className="p-2  border border-slate-500 w-full mb-5 rounded"
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                <button
                type="submit"
                className="w-full bg-violet-900 text-white py-2 rounded "
              >
                Request reset link
              </button>
              </div>
              
            </form>
            <button
              onClick={() => {
                closeModal();
                navigate(-1);
              }}
              className=" text-violet-900 hover:underline"
            >
              Back to login
            </button>
          </div>
        )}
      </ModalContent>
    </Modal>
  );

}
