import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// It's the layout component
export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/dashboard" className="[&.active]:font-bold">
          Dashboard
        </Link>
        <Link to="/attendance-management" className="[&.active]:font-bold">
          Attendance Management
        </Link>
        <Link to="/document-management" className="[&.active]:font-bold">
          Document Management
        </Link>
        <Link to="/employee-management" className="[&.active]:font-bold">
          Employee Management
        </Link>
        <Link to="/payroll-management" className="[&.active]:font-bold">
          Payroll Management
        </Link>
        <Link to="/recruitment" className="[&.active]:font-bold">
          Recruitment
        </Link>
        <Link to="/time-tracking" className="[&.active]:font-bold">
          Time Tracking
        </Link>
      </div>
      <hr />
      <Outlet />
      {import.meta.env.MODE === "development" && <TanStackRouterDevtools />}
    </>
  ),
});
