import { WorkspacesType, WorkspaceType } from "@/data/workspaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";

const WorkspaceUiUnit: FC<{ name: string; domain: string; logo: string }> = ({
  name,
  domain,
  logo,
}) => {
  return (
    <div className="flex items-center justify-start gap-2 px-6 py-3 rounded-lg hover:bg-[#101012] cursor-pointer transition-colors group">
      <img
        src={logo}
        alt="Work Go"
        className="object-cover w-14 h-14 rounded-2xl"
      />
      <div className="flex justify-between w-full gap-2">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold leading-4">{name}</h1>
          <p className="text-xs tracking-widest text-gray-100 transition-colors group-hover:text-white font-extralight">
            {domain}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function WorkspaceDropdown({
  selectedWorkspace,
  onChangeWorkspace,
  workspaces,
}: {
  selectedWorkspace: WorkspaceType;
  onChangeWorkspace: Dispatch<SetStateAction<WorkspaceType>>;
  workspaces: WorkspacesType;
}) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setIsDropDownOpen((prev) => !prev)}
        className="flex items-center justify-start gap-2 px-6 py-3 rounded-lg hover:bg-[#101012] cursor-pointer transition-colors group"
      >
        <img
          src={selectedWorkspace.logo}
          alt="Work Go"
          className="object-cover w-14 h-14 rounded-2xl"
        />
        <div className="flex justify-between w-full gap-2">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold leading-4">
              {selectedWorkspace.name}
            </h1>
            <p className="text-xs tracking-widest text-gray-100 transition-colors group-hover:text-white font-extralight">
              {selectedWorkspace.domain}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="text-gray-100 group-hover:text-[#99ff00] transition-colors shrink-0"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      {workspaces && (
        <DropdownMenu open={isDropDownOpen} onOpenChange={setIsDropDownOpen}>
          <DropdownMenuTrigger />
          <DropdownMenuContent
            align="end"
            className=" bg-[#161618] rounded-lg w-[300px] z-10 p-2"
          >
            <DropdownMenuGroup className="flex flex-col gap-1">
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.domain}
                  className="border-0 hover:border-0"
                  onClick={() => onChangeWorkspace(workspace)}
                >
                  <WorkspaceUiUnit {...workspace} />
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
