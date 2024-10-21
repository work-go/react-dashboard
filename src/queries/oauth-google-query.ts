import { z } from "zod";
import { queryOptions } from "@tanstack/react-query";
import { unprotectedApi } from "../lib/api";
import { QueryKeys } from "./__query-keys";
import {
  GoogleCallbackSearchSchema,
  RegisterResponseSchema,
} from "../generated/schemas/auth-schema";

export const googleCallbackQuery = (
  params: z.infer<typeof GoogleCallbackSearchSchema> & {
    codeVerifier: string | null;
  }
) => {
  const { codeVerifier, ...searchParams } = params;
  return queryOptions({
    queryKey: [QueryKeys.OAUTH_GOOGLE, params],
    queryFn: () =>
      unprotectedApi<z.infer<typeof RegisterResponseSchema>>(
        "/v1/auth/google/callback",
        {
          method: "GET",
          params: searchParams,
          headers: {
            authorization: `Bearer ${codeVerifier}`,
          },
        }
      ),
    staleTime: 0,
  });
};
