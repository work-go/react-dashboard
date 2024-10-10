import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "../lib/utils";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const NavLink = ({ link, title }: { link: string; title: string }) => {
  const currentRoute = useLocation();
  const isActive = (path: string) => currentRoute.pathname === path;

  return (
    <Link
      to={link}
      className={cn("my-3 text-xl font-semibold hover:text-[#EAD8B1]", {
        "text-[#EAD8B1]": isActive(link),
      })}
    >
      {title}
    </Link>
  );
};

const navLinks = [
  { link: "/dashboard", title: "Dashboard" },
  { link: "/resume", title: "Resume" },
  { link: "/applications", title: "Applications" },
  { link: "/find-jobs", title: "Find Jobs" },
];

export default function VerticalNav() {
  return (
    <SimpleBar className="h-screen w-[300px] fixed bg-[#001F3F] text-white overflow-auto flex flex-col p-7">
      <div className="flex items-center justify-between">
        <img src="/logo-nav.svg" alt="logo" className="w-[100px] h-[100px]" />
        <h1 className="font-bold text-2xl">WORKGO</h1>
      </div>
      <div className="flex flex-col mt-10">
        {navLinks.map((navLink) => (
          <NavLink
            key={navLink.link}
            link={navLink.link}
            title={navLink.title}
          />
        ))}
      </div>
      <div className="mt-28 flex flex-col gap-4">
        <img
          src="/avatar.png"
          alt="avatar"
          className="w-[75px] h-[75px] rounded-full"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold">Sophie Brown</h1>
          <p className="text-md">sophiebrown@gmail.com</p>
        </div>
      </div>
    </SimpleBar>
  );
}
