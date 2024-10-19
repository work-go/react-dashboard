import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { userQuery } from "../../../../queries/user-query";
import { googleCallbackQuery } from "../../../../queries/oauth-google-query";
import { LocalStorageKeys } from "../../../../lib/local-storage";

export const Route = createFileRoute("/_public/auth/google/callback")({
  component: () => null,
  validateSearch: z.object({ code: z.string(), state: z.string() }),
  loaderDeps: ({ search }) => ({ search }),
  beforeLoad: async ({ context: { queryClient }, search }) => {
    const codeVerifier = localStorage.getItem(LocalStorageKeys.CODE_VERIFIER);
    const { sessionToken, user } = await queryClient.fetchQuery(
      googleCallbackQuery({ code: search.code, codeVerifier })
    );
    localStorage.setItem(LocalStorageKeys.SESSION_TOKEN, sessionToken);
    await queryClient.setQueryData(userQuery(sessionToken).queryKey, user);
    const redirect_uri =
      localStorage.getItem(LocalStorageKeys.REDIRECT_URI) || "/dashboard";

    localStorage.removeItem(LocalStorageKeys.REDIRECT_URI);
    localStorage.removeItem(LocalStorageKeys.CODE_VERIFIER);

    throw redirect({
      to: redirect_uri,
    });
  },
});
