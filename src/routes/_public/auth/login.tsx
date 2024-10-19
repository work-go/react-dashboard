import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../../lib/api";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { LocalStorageKeys } from "../../../lib/local-storage";
import { GoogleLoginResponseSchema } from "../../../generated/schemas/auth-schema";

export const Route = createFileRoute("/_public/auth/login")({
  component: () => <LoginRoute />,
  validateSearch: z
    .object({ redirect_uri: z.string().optional().default("/dashboard") })
    .optional()
    .default({ redirect_uri: "/dashboard" }),
});

function LoginRoute() {
  const { redirect_uri } = Route.useSearch();
  const loginMutation = useMutation({
    mutationFn: () =>
      api<z.infer<typeof GoogleLoginResponseSchema>>("/v1/auth/google/login", {
        method: "GET",
        credentials: "include",
      }),
    onSuccess: ({ authorizationUrl, codeVerifier }) => {
      localStorage.setItem(LocalStorageKeys.REDIRECT_URI, redirect_uri);
      localStorage.setItem(LocalStorageKeys.CODE_VERIFIER, codeVerifier);
      window.open(authorizationUrl, "_self");
    },
  });
  return (
    <>
      <button onClick={() => loginMutation.mutate()}>Login with Google</button>
    </>
  );
}
