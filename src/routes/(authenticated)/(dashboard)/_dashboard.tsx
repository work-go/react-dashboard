import { createFileRoute, Outlet } from "@tanstack/react-router";
import VerticalNav from "../../../components/vertical-nav";

export const Route = createFileRoute("/(authenticated)/(dashboard)/_dashboard")(
  {
    component: Dashboard,
  }
);

function Dashboard() {
  return (
    <>
      <div className="flex">
        <div>
          <VerticalNav></VerticalNav>
        </div>
        <div className=" min-h-screen p-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
