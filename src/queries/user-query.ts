import { queryOptions } from "@tanstack/react-query";
import { api } from "../lib/api";
import { z } from "zod";
import { UserSchema } from "../generated/rpc/user-schema";
import { QueryKeys } from "./__query-keys";

export const userQuery = (token: string) =>
  queryOptions({
    queryKey: [QueryKeys.USER, token],
    queryFn: () =>
      api<z.infer<typeof UserSchema>>("/v1/auth/verify", {
        headers: { authorization: `Bearer ${token}` },
      }),
    staleTime: Infinity,
  });
