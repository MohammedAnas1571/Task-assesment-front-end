import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

interface NavItemProps {
    to: string;
    icon: IconType;
    text: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon:Icon, text }) => {
    return (
        <NavLink
            to={to}
            end={to === "/admin"}
            className={({ isActive }) => 
                `flex items-center p-2 mb-2 text-lg rounded-sm ${
                    isActive ? "bg-yellow-100" : "bg-slate-100"
                }`
            }
        >
            <Icon size={20} className="mr-2" />
            <p>{text}</p>
        </NavLink>
    );
};

export default NavItem;
