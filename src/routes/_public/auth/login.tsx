import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { LocalStorageKeys } from "../../../lib/local-storage";
import { unprotectedApi } from "../../../lib/api";

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
    mutationFn: () => unprotectedApi.GET("/v1/auth/google/login"),
    onSuccess: ({ authorizationUrl, codeVerifier }) => {
      localStorage.setItem(LocalStorageKeys.REDIRECT_URI, redirect_uri);
      localStorage.setItem(LocalStorageKeys.CODE_VERIFIER, codeVerifier);
      window.open(authorizationUrl, "_self");
    },
  });

  const loginMutation = useMutation({
    mutationFn: () =>
      unprotectedApi.POST("/v1/auth/login", {
        body: {
          email: "",
          password: "",
        },
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
