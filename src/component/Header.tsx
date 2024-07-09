import { FaRegUserCircle, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AlertDialog from './AlertDialog';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { signOutAdmin } from '../redux/adminSlice';
import handleApiError from '../utils/errorHandler/APiErrorHandler';

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

   const hanldeLogout = async()=>{
    try{
        const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/logout`,{
          withCredentials:true
        
        })
        if(data){
          dispatch(signOutAdmin())
          toast.success(data.message)
          navigate("/login")
          
        }
    }catch(err){
      handleApiError(err)
    }
   }
  return (
    <div className='h-16 fixed top-0 w-full z-50 bg-violet-900 text-white'>
      <div className='flex justify-between items-center h-full px-5'>
        <div className="flex items-center">
          <button className='mr-2 md:hidden'>
            <FaBars size={24} />
          </button>
          <Link to={'/'}>
            <img className='w-48' src='/Group 2609047 (1) 9.png' alt='Logo' />
          </Link>
        </div>
        <div>
          <AlertDialog
            title="Log Out"
            description="Are you sure you want to logout?"
            onConfirm={()=> {hanldeLogout()}}
          >
            <FaRegUserCircle size={30} />
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default Header;
