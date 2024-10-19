import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { userQuery } from "../../queries/user-query";
import { LocalStorageKeys } from "../../lib/local-storage";

export const Route = createFileRoute("/_public/auth")({
  component: AuthLayout,
  beforeLoad: async ({ context: { queryClient } }) => {
    const sessionToken = localStorage.getItem(LocalStorageKeys.SESSION_TOKEN);
    await queryClient.fetchQuery(userQuery(sessionToken)).catch(() => {
      throw redirect({
        to: "/dashboard",
      });
    });
  },
});

function AuthLayout() {
  return <Outlet />;
}
