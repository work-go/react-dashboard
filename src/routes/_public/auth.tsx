import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { userQuery } from "../../queries/user-query";
import { LocalStorageKeys } from "../../lib/local-storage";
import { safeTryAsync } from "../../lib/safe-try";

export const Route = createFileRoute("/_public/auth")({
  component: AuthLayout,
  beforeLoad: async ({ context: { queryClient } }) => {
    const sessionToken = localStorage.getItem(LocalStorageKeys.SESSION_TOKEN);
    const [user] = await safeTryAsync(() =>
      queryClient.fetchQuery(userQuery(sessionToken))
    );
    if (user)
      throw redirect({
        to: "/dashboard",
      });
  },
});

function AuthLayout() {
  return <Outlet />;
}
