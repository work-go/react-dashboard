import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "sonner";

// It's the layout component
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => (
      <>
        <Toaster richColors />

        <Outlet />
        {import.meta.env.MODE === "development" && <TanStackRouterDevtools />}
      </>
    ),
  }
);
