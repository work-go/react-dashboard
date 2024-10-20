import { ofetch } from "ofetch";
import { throwCustomException } from "../utils/error-handling";

export const api = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  credentials: "same-origin",
  method: "GET",
  onResponseError: [
    ({ response }) => throwCustomException(response._data.name, response._data),
  ],
});
