import { LocalStorageKeys } from "./local-storage";
import createClient, { MiddlewareOnResponse } from "openapi-fetch";
import { paths } from "../generated/generated/api-types";
import { router } from "../App";
import { throwCustomException } from "../utils/error-handling";

const parseCustomErrors: MiddlewareOnResponse = async ({ response }) => {
  if (!response.ok) {
    const $response = await response.json();
    throwCustomException($response?.name, $response);
  }
};

export const unprotectedApi = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
});

unprotectedApi.use({
  onResponse: parseCustomErrors,
});

export const protectedApi = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
});

protectedApi.use({
  onRequest: ({ request }) => {
    const sessionToken = localStorage.getItem(LocalStorageKeys.SESSION_TOKEN);
    if (!sessionToken)
      router.navigate({
        to: "/auth/login",
        from: location.href,
        search: { redirect_uri: location.href },
      });

    request.headers.append("Authorization", `Bearer ${sessionToken}`);
  },
  onResponse: parseCustomErrors,
});
