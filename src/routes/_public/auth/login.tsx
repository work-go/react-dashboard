import { createFileRoute } from "@tanstack/react-router";
import { unprotectedApi } from "../../../lib/api";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { LocalStorageKeys } from "../../../lib/local-storage";
import {
  GoogleLoginResponseSchema,
  LoginSchema,
} from "../../../generated/schemas/auth-schema";

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
        <div className="w-full max-w-xl px-32 py-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-5xl leading-snug font-roboto-medium text-start">
            Welcome to WorkGo
          </h2>
          <p className="mb-8 text-gray-600 text-start">
            Sign in with your WorkGo account to access all workgo prodcuts.
          </p>
          <button
            onClick={() => loginWithGoogleMutation.mutate()}
            className="flex items-center justify-center w-full py-2 mb-6 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            <div>
              <img src="" alt="" />
            </div>
            <p>Sign in with Google</p>
          </button>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 leading-tight" />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
          </div>

          {/* Submit Button */}
          <button className="w-full py-2 mb-6 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
            Sign In
          </button>

          {/* Disclaimer */}
          <p className="mb-4 text-xs text-center text-gray-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Terms of Service
            </a>
            .
          </p>

          {/* Sign Up Link */}
          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
