import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { userQuery } from "../../../../queries/user-query";
import { googleCallbackQuery } from "../../../../queries/oauth-google-query";

export const Route = createFileRoute("/_public/auth/google/callback")({
  component: () => null,
  validateSearch: z.object({ code: z.string(), state: z.string() }),
  loaderDeps: ({ search }) => ({ search }),
  beforeLoad: async ({ context: { queryClient }, search }) => {
    const { token } = await queryClient.fetchQuery(
      googleCallbackQuery({ code: search.code, state: search.state })
    );
    localStorage.setItem("authToken", token);
    await queryClient.fetchQuery(userQuery(token));
    const redirect_uri = localStorage.getItem("redirect_uri") || "/dashboard";
    localStorage.removeItem("redirect_uri");
    throw redirect({
      to: redirect_uri,
    });
  },
});
