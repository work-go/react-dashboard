import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/_authenticated")({
  component: () => <Outlet />,
});
