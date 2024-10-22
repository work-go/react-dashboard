import { z } from "zod";
import { queryOptions } from "@tanstack/react-query";
import { unprotectedApi } from "../lib/api";
import { QueryKeys } from "./__query-keys";
import { GoogleCallbackSearchSchema } from "../generated/schemas/auth-schema";

export const googleCallbackQuery = (
  params: z.infer<typeof GoogleCallbackSearchSchema> & {
    codeVerifier: string | null;
  }
) => {
  const { codeVerifier, ...searchParams } = params;
  return queryOptions({
    queryKey: [QueryKeys.OAUTH_GOOGLE, params],
    queryFn: () =>
      unprotectedApi.GET("/v1/auth/google/callback", {
        params: {
          query: searchParams,
        },
        headers: {
          authorization: `Bearer ${codeVerifier}`,
        },
      }),
    staleTime: 0,
  });
};
