import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "../../lib/utils";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
  Briefcase,
  Dock,
  FileUser,
  LayoutDashboard,
  MessageCircle,
  Search,
} from "lucide-react";
import { ReactElement } from "react";

const NavLink = ({
  link,
  title,
  icon,
}: {
  link: string;
  title: string;
  icon: ReactElement;
}) => {
  const currentRoute = useLocation();
  const isActive = (path: string) => currentRoute.pathname === path;

  return (
    <Link
      to={link}
      className={cn(
        " my-1 font-semibold block rounded-lg p-2 hover:bg-gradient-to-b  hover:from-[#303032] hover:to-[#1d1d1f] hover:shadow-2xl",
        {
          "bg-gradient-to-b from-[#303032] to-[#1d1d1f] shadow-lg":
            isActive(link),
        }
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        {title}
      </div>
    </Link>
  );
};

const navLinks = [
  {
    link: "/dashboard",
    title: "Dashboard",
    icon: <LayoutDashboard />,
  },
  { link: "/resume", title: "Resume", icon: <FileUser /> },
  { link: "/applications", title: "Applications", icon: <Dock /> },
  { link: "/find-jobs", title: "Find Jobs", icon: <Briefcase /> },
];

export default function VerticalNav() {
  return (
    <div className="h-screen w-[300px] fixed bg-[#161618] text-white overflow-auto flex flex-col px-5 py-10">
      <div className="flex items-center justify-start gap-3">
        <img src="/logo.png" alt="logo" className="w-[30px] h-[30px]" />
        <h1 className="font-semibold text-Xl">WORKGO</h1>
      </div>
      <div className="flex items-center gap-2 px-[10px] py-[5px] mt-6 text-white bg-transparent border border-gray-500 rounded-lg">
        <Search className="w-5 h-5 text-gray-400 "></Search>
        <input
          type="text"
          placeholder="Search"
          className="w-[150px] bg-transparent border-0 outline-none "
        />
      </div>
      <SimpleBar className="flex flex-col h-full max-h-[400px] mt-5">
        <div className="mb-5">
          {navLinks.map((navLink) => (
            <NavLink
              icon={navLink.icon}
              key={navLink.link}
              link={navLink.link}
              title={navLink.title}
            />
          ))}
        </div>
        <div className="h-[1px] bg-white"></div>
      </SimpleBar>
      <div className="flex flex-col gap-10 mt-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <p className="text-md">Inbox</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/avatar.png"
            alt="avatar"
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="flex flex-col">
            <h1 className="font-semibold truncate text-md w-[180px]">
              Sophie Brown
            </h1>
            <p className="text-sm truncate w-[180px]">sophiebrown@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
