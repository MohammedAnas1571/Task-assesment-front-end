import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roleSchema } from '../validation/formValidations';
import Input from './Input';
import axios from 'axios';
import toast from 'react-hot-toast';
import handleApiError from '../utils/errorHandler/APiErrorHandler';

export type AddRoleProps = {
  onCancel: () => void;
  onRoleAdded: () => void;
};

type Role = {
  rolename: string;
};

const AddRole = ({ onCancel, onRoleAdded }: AddRoleProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Role>({
    resolver: zodResolver(roleSchema),
  });

  const onSubmit = async (data: Role) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/role`, data,{
        withCredentials: true});
      if (response.data) {
        toast.success(response.data.message);
        onRoleAdded();
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <>
      <div className="flex p-2 items-center">
        <AiOutlineArrowLeft size={20} onClick={onCancel} />
        <h1 className="text-xl font-bold ml-2">Add Role</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='px-4'>
        <Input label="Role Name" type="text" {...register('rolename')}  />
        {errors.rolename && (
          <p className="text-sm text-red-500">{errors.rolename.message}</p>
        )}
        <div className="absolute bottom-5 right-5 flex gap-5">
          <button
            type="button"
            onClick={onCancel}
            className="border rounded-lg p-1 w-20"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-violet-700 text-white border rounded-lg p-1 w-20"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default AddRole;
