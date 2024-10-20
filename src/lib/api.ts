import { ofetch } from "ofetch";
import { throwCustomException } from "../utils/error-handling";
import { LocalStorageKeys } from "./local-storage";
import { redirect } from "@tanstack/react-router";

const base = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  method: "GET",
  onResponseError: [
    ({ response }) => throwCustomException(response._data.name, response._data),
  ],
});

export const unprotectedApi = base.create({});
export const api = base.create({
  onRequest: ({ options }) => {
    const sessionToken = localStorage.getItem(LocalStorageKeys.SESSION_TOKEN);
    if (!sessionToken)
      throw redirect({
        to: "/auth/login",
        from: location.href,
        search: { redirect_uri: location.href },
      });

    options.headers.append("Authorization", `Bearer ${sessionToken}`);
  },
});
