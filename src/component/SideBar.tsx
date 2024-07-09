import { BiDonateHeart } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import NavItem from "./NavItem";

const SideBar = () => {
  return (
    <div className="w-64 border min-h-[inherit] max-h-0 sticky top-16 bg-slate-100 py-4 flex-shrink-0 hidden md:block">
      <NavItem to="/" icon={IoHomeOutline} text="Home" />
      <NavItem to="/roles" icon={BiDonateHeart} text="Roles" />
      <NavItem to="/users" icon={FaRegUserCircle} text="Users" />
    </div>
  );
};

export default SideBar;
