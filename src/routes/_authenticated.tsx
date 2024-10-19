import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { userQuery } from "../queries/user-query";
import { safeTryAsync } from "../lib/safe-try";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
  beforeLoad: async ({ context: { queryClient }, location }) => {
    const token = localStorage.getItem("authToken")!;
    const [user] = await safeTryAsync(() =>
      queryClient.fetchQuery(userQuery(token))
    );
    if (!user)
      throw redirect({
        to: "/auth/login",
        search: {
          redirect_uri: location.href,
        },
      });
  },
});

function AuthenticatedLayout() {
  return <Outlet />;
}
