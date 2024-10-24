import { Workspace, workspaces } from "@/data/workspaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuArrow,
  DropdownMenuPortal,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const WorkspaceUiUnit = ({ workspace }: { workspace: Workspace }) => {
  return (
    <div className="flex items-center justify-start gap-4 px-2 py-2 transition-colors rounded-lg cursor-pointer hover:bg-neutral-200 group">
      <img
        src={workspace.logo}
        alt="Work Go"
        className="object-cover rounded-lg w-7 h-7"
      />
      <div className="flex justify-between w-full gap-2">
        <div>
          <h1 className="text-base font-bold text-black truncate max-w-[150px]">
            {workspace.name}
          </h1>
          <p className="text-[10px] tracking-widest text-black transition-colors font-extralight truncate max-w-[150px]">
            {workspace.domain}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function WorkspaceDropdown({
  selectedWorkspace,
  onChangeWorkspace,
}: {
  selectedWorkspace: Workspace;
  onChangeWorkspace: Dispatch<SetStateAction<Workspace>>;
}) {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center justify-start gap-2 px-6 py-3 rounded-lg hover:bg-[#101012] cursor-pointer transition-colors group">
            <img
              src={selectedWorkspace.logo}
              alt="Work Go"
              className="object-cover w-14 h-14 rounded-2xl"
            />
            <div className="flex justify-between w-full">
              <div>
                <h1 className="text-2xl font-bold truncate  max-w-[200px]">
                  {selectedWorkspace.name}
                </h1>
                <p className="text-xs tracking-widest text-gray-100 truncate transition-colors group-hover:text-white font-extralight max-w-[200px]">
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
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            align="center"
            className=" relative bg-neutral-100 rounded-lg w-[calc(var(--radix-popper-anchor-width)-3rem)] p-2"
            sideOffset={-4}
          >
            <DropdownMenuArrow className="fill-neutral-100" />
            <DropdownMenuGroup className="flex flex-col gap-1">
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.domain}
                  className="outline-none hover:outline-none"
                  onClick={() => onChangeWorkspace(workspace)}
                >
                  <WorkspaceUiUnit workspace={workspace} />
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center justify-start gap-4 px-2 py-2 transition-colors rounded-lg outline-none cursor-pointer hover:bg-neutral-200 group hover:outline-none">
                <Plus className="w-7 h-7" />
                <div className="text-base font-bold leading-3 text-black">
                  Add Workspace
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </>
  );
}
