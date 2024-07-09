import React from "react";
import { BiSearch } from "react-icons/bi";
import { IconType } from "react-icons";

type NavBarProps = {
  icon: IconType;
  onRoleAdded: () => void;
  name: string;
};

const NavBar: React.FC<NavBarProps> = ({ name, icon: Icon, onRoleAdded }) => {
  return (
    <div>
      <nav className="px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Icon size={20} />
          <h1 className="mx-4 font-bold text-xl">{name}</h1>
          <div className="hidden md:flex items-center flex-grow flex-shrink border-2 border-slate-400 rounded-lg px-2 max-w-96 mx-8">
            <BiSearch className="text-gray-500 " size={20} />
            <input
              type="text"
              placeholder="Search"
              className="ml-2 w-full py-1 px-2 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <button
            onClick={onRoleAdded}
            className="bg-violet-900 px-4 py-2 rounded text-white whitespace-nowrap"
          >
            Add New
          </button>
        </div>
      </nav>
      <div className="flex md:hidden px-4">
        <div className="flex items-center border-2 border-slate-400 rounded-lg px-2 w-full mt-4">
          <BiSearch className="text-gray-500 " size={20} />
          <input
            type="text"
            placeholder="Search"
            className="ml-2 w-full py-1 px-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
