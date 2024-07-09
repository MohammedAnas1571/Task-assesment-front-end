import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-row relative top-16 min-h-[calc(100vh-64px)]">
        <SideBar />
        <div className="flex-1 min-h-[inherit] flex flex-col">
          <div className="shadow-lg m-4 flex-grow flex-shrink flex flex-col rounded-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
