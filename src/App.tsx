import { RouterProvider, createRouter } from "@tanstack/react-router";
// Import the auto generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreloadStaleTime: 0,
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
