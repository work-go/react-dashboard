import { createFileRoute } from "@tanstack/react-router";
import { unprotectedApi } from "../../../lib/api";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { LocalStorageKeys } from "../../../lib/local-storage";
import {
  GoogleLoginResponseSchema,
  LoginSchema,
} from "../../../generated/schemas/auth-schema";

export const Route = createFileRoute("/_public/auth/login")({
  component: () => <LoginRoute />,
  validateSearch: z
    .object({ redirect_uri: z.string().optional().default("/dashboard") })
    .optional()
    .default({ redirect_uri: "/dashboard" }),
});

function LoginRoute() {
  const { redirect_uri } = Route.useSearch();
  const loginWithGoogleMutation = useMutation({
    mutationFn: () =>
      unprotectedApi<z.infer<typeof GoogleLoginResponseSchema>>(
        "/v1/auth/google/login",
        {
          method: "GET",
          credentials: "include",
        }
      ),
    onSuccess: ({ authorizationUrl, codeVerifier }) => {
      localStorage.setItem(LocalStorageKeys.REDIRECT_URI, redirect_uri);
      localStorage.setItem(LocalStorageKeys.CODE_VERIFIER, codeVerifier);
      window.open(authorizationUrl, "_self");
    },
  });

  const loginMutation = useMutation({
    mutationFn: () =>
      unprotectedApi<z.infer<typeof LoginSchema>>("/v1/auth/login", {
        method: "POST",
        body: {},
      }),
  });

  return (
    <>
      <button onClick={() => loginWithGoogleMutation.mutate()}>
        Login with Google
      </button>

      <button onClick={() => loginMutation.mutate()}>Login</button>
    </>
  );
}
