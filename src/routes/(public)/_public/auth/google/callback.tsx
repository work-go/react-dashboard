import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { api } from "../../../../../lib/api";

const googleOauthCallbackQuery = (params: GoogleCallbackSearch) =>
  queryOptions({
    queryKey: ["google_oauth_callback", params],
    queryFn: () =>
      api<{ authorization_url: string }>("/v1/auth/google/callback", {
        method: "GET",
        params,
      }),
    staleTime: 0,
  });

export const Route = createFileRoute("/(public)/_public/auth/google/callback")({
  component: GoogleCallbackRoute,
  validateSearch: (search) =>
    z.object({ code: z.string(), state: z.string() }).parse(search),
  loaderDeps: ({ search }) => ({ search }),
  loader: ({ context: { queryClient }, deps: { search } }) =>
    queryClient.ensureQueryData(googleOauthCallbackQuery(search)),
});

function GoogleCallbackRoute() {
  const search = Route.useSearch();
  const { data } = useQuery(googleOauthCallbackQuery(search));
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
