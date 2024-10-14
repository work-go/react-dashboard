import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { FC } from "react";

const CompanyUiUnit: FC<{ name: string; domain: string; logo: string }> = ({
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

export default function CompanyUi({
  name,
  domain,
  logo,
  onClick,
  companies,
}: {
  name: string;
  domain: string;
  logo: string;
  onClick: CallableFunction;
  companies: { name: string; domain: string; logo: string }[];
}) {
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
        {companies && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="text-gray-100 group-hover:text-[#99ff00] transition-colors shrink-0"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className=" bg-[#1b1b1e] rounded-lg z-10 p-2"
            >
              <DropdownMenuGroup className="flex flex-col gap-1">
                {companies.map((company) => (
                  <DropdownMenuItem
                    key={company.domain}
                    onClick={() => onClick(company)}
                  >
                    <CompanyUiUnit {...company} />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
