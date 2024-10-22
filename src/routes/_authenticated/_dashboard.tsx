import { createFileRoute, Outlet } from "@tanstack/react-router";
import VerticalNav from "../../components/layout/vertical-nav/vertical-nav";

export const Route = createFileRoute("/_authenticated/_dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <div className="flex">
        <div>
          <VerticalNav></VerticalNav>
        </div>
        <div className="min-h-screen ml-[300px] p-10 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
