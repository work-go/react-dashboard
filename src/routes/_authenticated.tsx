import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { userQuery } from "../queries/user-query";
import { LocalStorageKeys } from "../lib/local-storage";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
  beforeLoad: async ({ context: { queryClient }, location }) => {
    const sessionToken = localStorage.getItem(LocalStorageKeys.SESSION_TOKEN);
    await queryClient.fetchQuery(userQuery(sessionToken)).catch(() => {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect_uri: location.href,
        },
      });
    });
  },
});

function AuthenticatedLayout() {
  return <Outlet />;
}
