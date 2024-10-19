import { z } from "zod";
import {
  GoogleCallbackResponseSchema,
  GoogleCallbackSearchSchema,
} from "../generated/rpc/auth-schema";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../lib/api";
import { QueryKeys } from "./__query-keys";

export const googleCallbackQuery = (
  params: z.infer<typeof GoogleCallbackSearchSchema>
) =>
  queryOptions({
    queryKey: [QueryKeys.OAUTH_GOOGLE, params],
    queryFn: () =>
      api<z.infer<typeof GoogleCallbackResponseSchema>>(
        "/v1/auth/google/callback",
        {
          method: "GET",
          params,
          headers: {
            authorization: `Bearer ${localStorage.getItem("codeVerifier")}`,
          },
        }
      ),
    staleTime: 0,
  });
