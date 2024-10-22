import { queryOptions } from "@tanstack/react-query";
import { QueryKeys } from "./__query-keys";
import { unprotectedApi } from "../lib/api";

export const userQuery = (sessionToken: string | null) =>
  queryOptions({
    queryKey: [QueryKeys.USER, sessionToken],
    queryFn: () => {
      if (!sessionToken) throw new Error("Please authenticate yourself");
      return unprotectedApi.GET("/v1/auth/verify", {
        headers: { authorization: `Bearer ${sessionToken}` },
      });
    },
    staleTime: 10_000,
  });
