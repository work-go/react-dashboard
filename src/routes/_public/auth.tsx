import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { safeTryAsync } from "../../lib/safe-try";
import { userQuery } from "../../queries/user-query";

export const Route = createFileRoute("/_public/auth")({
  component: AuthLayout,
  beforeLoad: async ({ context: { queryClient } }) => {
    const [user] = await safeTryAsync(() => queryClient.fetchQuery(userQuery));
    if (user)
      throw redirect({
        to: "/dashboard",
      });
  },
});

function AuthLayout() {
  return <Outlet />;
}
