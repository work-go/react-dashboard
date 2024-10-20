import { AuthenticationError } from "../generated/errors/authentication-error";
import { AuthorizationError } from "../generated/errors/authorization-error";
import { ServerError } from "../generated/errors/server-error.";
import { ValidationError } from "../generated/errors/validation-error";

export const throwCustomException = (
  name: string | undefined,
  response: any
) => {
  const message = response?.message || "Something went wrong";

  switch (name) {
    case "ValidationError":
      throw new ValidationError(message, response.details);
    case "ServerError":
      throw new ServerError(message);
    case "AuthenticationError":
      throw new AuthenticationError(message);
    case "AuthorizationError":
      throw new AuthorizationError(message);
    default:
      throw new Error(message);
  }
};
