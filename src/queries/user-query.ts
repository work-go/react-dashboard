import { queryOptions } from "@tanstack/react-query";
import { api } from "../lib/api";
import { z } from "zod";
import { UserSchema } from "../generated/rpc/user-schema";
import { QueryKeys } from "./__query-keys";

export const userQuery = queryOptions({
  queryKey: [QueryKeys.USER],
  queryFn: () => api<z.infer<typeof UserSchema>>("/v1/auth/verify"),
  staleTime: Infinity,
});
