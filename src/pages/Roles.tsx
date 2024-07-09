import { BiDonateHeart } from 'react-icons/bi';
import { useEffect, useState } from 'react';

import AddRole from '../component/AddRole';
import axios from 'axios';
import handleApiError from '../utils/errorHandler/APiErrorHandler';
import NavBar from '../component/NavBar';
import RolesTable from '../component/RolesTable';

export type RoleDetails = {
  _id:string;
  rolename: string;
  isBlock: string;
};

const Roles = () => {
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [roles, setRoles] = useState<RoleDetails[]>([]);

  const fetchRoles = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/roles`,{
         withCredentials: true
      });
      setRoles(data.data); 
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAddRole = () => {
    setIsAddingRole(true);
  };

  const handleCancelAddRole = () => {
    setIsAddingRole(false);
  };

  const handleRoleAdded = () => {
    setIsAddingRole(false);
    fetchRoles(); 
  };

  return (
    <div className='flex-grow flex-shrink flex flex-col relative'>
      {isAddingRole && <AddRole onCancel={handleCancelAddRole} onRoleAdded={handleRoleAdded} />}
      {!isAddingRole && (
        <>
          <NavBar name= "Role" icon={BiDonateHeart} onRoleAdded={handleAddRole}/>
          <div className='my-5'>
            <RolesTable  roles={roles} />
          </div>
        </>
      )}
    </div>
  );
};

export default Roles;
