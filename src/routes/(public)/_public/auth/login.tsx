import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../../../lib/api";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/(public)/_public/auth/login")({
  component: () => <LoginRoute />,
});

function LoginRoute() {
  const loginMutation = useMutation({
    mutationFn: () =>
      api<{ authorization_url: string }>("/v1/auth/google/login", {
        method: "GET",
        credentials: "include",
      }),
    onSuccess: ({ authorization_url }) => {
      window.open(authorization_url, "_self");
    },
  });
  return (
    <>
      <button onClick={() => loginMutation.mutate()}>Login with Google</button>
    </>
  );
}
