import { createFileRoute } from "@tanstack/react-router";
import { unprotectedApi } from "../../../lib/api";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { LocalStorageKeys } from "../../../lib/local-storage";
import {
  GoogleLoginResponseSchema,
  LoginSchema,
} from "../../../generated/schemas/auth-schema";
import { LockKeyhole, Mail } from "lucide-react";

export const Route = createFileRoute("/_public/auth/login")({
  component: () => <LoginRoute />,
  validateSearch: z
    .object({ redirect_uri: z.string().optional().default("/dashboard") })
    .optional()
    .default({ redirect_uri: "/dashboard" }),
});

function LoginRoute() {
  const { redirect_uri } = Route.useSearch();
  const loginWithGoogleMutation = useMutation({
    mutationFn: () =>
      unprotectedApi<z.infer<typeof GoogleLoginResponseSchema>>(
        "/v1/auth/google/login",
        {
          method: "GET",
          credentials: "include",
        }
      ),
    onSuccess: ({ authorizationUrl, codeVerifier }) => {
      localStorage.setItem(LocalStorageKeys.REDIRECT_URI, redirect_uri);
      localStorage.setItem(LocalStorageKeys.CODE_VERIFIER, codeVerifier);
      window.open(authorizationUrl, "_self");
    },
  });

  const loginMutation = useMutation({
    mutationFn: () =>
      unprotectedApi<z.infer<typeof LoginSchema>>("/v1/auth/login", {
        method: "POST",
        body: {},
      }),
  });

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-xl px-24 py-8 bg-[#edf8fe] rounded-lg shadow-lg">
          <h2 className="mb-3 text-5xl leading-tight font-roboto-medium text-start">
            Welcome to WorkGo
          </h2>
          <p className="mb-8 text-gray-500 text-start">
            Sign in with your WorkGo account to access all workgo prodcuts.
          </p>
          <button
            onClick={() => loginWithGoogleMutation.mutate()}
            className="flex items-center justify-center w-full gap-2 py-2 mb-5 bg-white border-2 border-gray-400 rounded-lg hover:bg-gray-100 "
          >
            <div>
              <img src="/google.png" alt="" className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold">Continue with Google</p>
          </button>
          <div className="flex items-center gap-2 mb-5">
            <div className="h-[1px] bg-gray-300 flex-grow"></div>
            <p className="text-xs text-gray-500"> or sign in using email</p>
            <div className="h-[1px] bg-gray-300 flex-grow"></div>
          </div>
          <div className="flex w-full gap-3 p-2 px-5 py-3 mb-4 bg-white border-2 border-gray-400 rounded-lg items-base">
            <Mail className="text-gray-700 " />
            <input
              type="email"
              className="flex-grow text-sm bg-transparent focus:outline-none"
              placeholder="Email"
            />
          </div>

          <div className="flex w-full gap-3 p-2 px-5 py-3 mb-4 bg-white border-2 border-gray-400 rounded-lg items-base">
            <LockKeyhole className="text-gray-700 " />
            <input
              type="email"
              className="flex-grow text-sm bg-transparent focus:outline-none"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mb-6 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Continue
          </button>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 leading-tight" />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
          </div>

          <p className="mb-4 text-xs text-gray-500 text-start">
            By continuing, you agree to our{" "}
            <a href="#" className="font-bold underline">
              Terms & Conditions{" "}
            </a>
            and{" "}
            <a href="#" className="font-bold underline">
              Privacy
            </a>
          </p>
          <p className="text-xs font-bold text-gray-600 text-start">
            Get started with WorkGo.{" "}
            <a
              href="/signup"
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
