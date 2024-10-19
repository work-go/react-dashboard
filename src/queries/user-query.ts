import { queryOptions } from "@tanstack/react-query";
import { api } from "../lib/api";
import { z } from "zod";
import { QueryKeys } from "./__query-keys";
import { UserSchema } from "../generated/schemas/user-schema";

export const userQuery = (sessionToken: string | null) =>
  queryOptions({
    queryKey: [QueryKeys.USER, sessionToken],
    queryFn: () => {
      if (!sessionToken) throw new Error("Please authenticate yourself");
      return api<z.infer<typeof UserSchema>>("/v1/auth/verify", {
        headers: { authorization: `Bearer ${sessionToken}` },
      });
    },
    staleTime: 10_000,
  });
