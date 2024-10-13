import { z } from "zod";
import { GoogleCallbackSearchSchema } from "../generated/rpc/auth-schema";
import { queryOptions } from "@tanstack/react-query";
import { api } from "../lib/api";
import { UserSchema } from "../generated/rpc/user-schema";

export const googleCallbackQuery = (
  params: z.infer<typeof GoogleCallbackSearchSchema>
) =>
  queryOptions({
    queryKey: ["google_oauth_callback", params],
    queryFn: () =>
      api<z.infer<typeof UserSchema>>("/v1/auth/google/callback", {
        method: "GET",
        params,
      }),
    staleTime: 0,
  });
