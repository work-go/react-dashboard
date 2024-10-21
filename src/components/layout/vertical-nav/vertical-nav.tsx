import { Link, LinkProps, useLocation } from "@tanstack/react-router";
import { cn } from "../../../lib/utils";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
  Briefcase,
  Dock,
  FileUser,
  LayoutDashboard,
  LucideProps,
  MessageCircle,
} from "lucide-react";
import { FC, PropsWithChildren, RefAttributes, useState } from "react";
import WorkspaceDropdown from "./workspace-dropdown";
import { workspaces, WorkspaceType } from "@/data/workspaces";

const NavLink: FC<
  PropsWithChildren<{
    to: LinkProps["to"];
    icon: FC<LucideProps & RefAttributes<SVGSVGElement>>;
  }>
> = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex gap-2 items-center justify-start w-full rounded px-6 py-3 text-gray-300 hover:text-white hover:bg-[#101012] transition-colors group",
        {
          "text-white bg-[#101012]": isActive,
        }
      )}
    >
      <Icon
        className={cn("w-5 h-5 group-hover:text-[#99ff00]  transition-colors", {
          "text-[#99ff00]": isActive,
        })}
        strokeWidth={1}
      />
      {children}
    </Link>
  );
};

export default function VerticalNav() {
  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceType>(
    workspaces[0]
  );
  return (
    <div className="h-screen w-[300px] fixed bg-[#161618] text-white overflow-auto flex flex-col  p-3 gap-3">
      <div>
        <WorkspaceDropdown
          selectedWorkspace={selectedWorkspace}
          onChangeWorkspace={setSelectedWorkspace}
          workspaces={workspaces}
        />
      </div>

      <SimpleBar className="flex flex-col h-full max-h-[400px] pb-5">
        <div className="space-y-4">
          <div className="space-y-0.5">
            <h3 className="text-[10px] font-lights uppercase tracking-[0.2rem] pl-6 pb-1 text-gray-400 opacity-80">
              Analytics
            </h3>
            <NavLink icon={LayoutDashboard} to="/dashboard">
              Dashboard
            </NavLink>
          </div>

          <div className="space-y-0.5">
            <h3 className="text-[10px] font-lights uppercase tracking-[0.2rem] pl-6 pb-1 text-gray-400 opacity-80">
              Jobs
            </h3>
            <NavLink icon={FileUser} to="/resume">
              Resume
            </NavLink>
            <NavLink icon={Dock} to="/applications">
              Applications
            </NavLink>
            <NavLink icon={Briefcase} to="/find-jobs">
              Find Jobs
            </NavLink>
          </div>
        </div>
      </SimpleBar>
      <div className="flex flex-col gap-10 px-6 mt-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <p className="text-md">Need help?</p>
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
