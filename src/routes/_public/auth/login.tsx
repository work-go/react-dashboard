import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../../lib/api";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { GoogleLoginResponseSchema } from "../../../generated/rpc/auth-schema";

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
      localStorage.setItem("redirect_uri", redirect_uri);
      localStorage.setItem("codeVerifier", codeVerifier);
      window.open(authorizationUrl, "_self");
    },
  });
  return (
    <>
      <button onClick={() => loginMutation.mutate()}>Login with Google</button>
    </>
  );
}
