import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/strore"

const AdminLayout: React.FC = () => {
  const { isAdmin } = useSelector((state: RootState) => state.admin);

  console.log(isAdmin)

  return isAdmin ? <Outlet/> : <Navigate to={'/login'} />
};

export default AdminLayout;


