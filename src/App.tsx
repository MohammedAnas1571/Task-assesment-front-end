import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import AdminLayout from "./layout/protectedRoute";
import Layout from "./component/Layout";
import Home from "./pages/Home";
import Roles from "./pages/Roles";
import Users from "./pages/Users";
import EditRole from "./pages/EditRole";
import EditUser from "./pages/EditUser";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="roles" element={<Roles />} />
              <Route path="users" element={<Users />} />
              <Route path="roles/:roleId" element={<EditRole />} />
              <Route path="users/:userId" element={<EditUser />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
