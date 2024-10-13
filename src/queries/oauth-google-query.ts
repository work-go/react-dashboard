import { z } from "zod";
import { GoogleCallbackSearchSchema } from "../generated/rpc/auth-schema";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../lib/api";
import { UserSchema } from "../generated/rpc/user-schema";
import { QueryKeys } from "./__query-keys";

export const googleCallbackQuery = (
  params: z.infer<typeof GoogleCallbackSearchSchema>
) =>
  queryOptions({
    queryKey: [QueryKeys.OAUTH_GOOGLE, params],
    queryFn: () =>
      api<z.infer<typeof UserSchema>>("/v1/auth/google/callback", {
        method: "GET",
        params,
      }),
    staleTime: 0,
  });
