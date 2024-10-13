import { queryOptions } from "@tanstack/react-query";
import { api } from "../lib/api";
import { z } from "zod";
import { UserSchema } from "../generated/rpc/user-schema";

export const userQuery = queryOptions({
  queryKey: ["user"],
  queryFn: () => api<z.infer<typeof UserSchema>>("/v1/auth/verify"),
  staleTime: Infinity,
});
