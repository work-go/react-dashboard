import { QueryClient } from "@tanstack/react-query";
import { ServerError } from "../generated/errors/server-error.";
import { ValidationError } from "../generated/errors/validation-error";
import { AuthenticationError } from "../generated/errors/authentication-error";
import { AuthorizationError } from "../generated/errors/authorization-error";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError:
      | ServerError
      | ValidationError
      | AuthenticationError
      | AuthorizationError
      | Error;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
