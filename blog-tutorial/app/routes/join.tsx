import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const essay1 = formData.get("essay1") as string;
  const essay2 = formData.get("essay2") as string;
  const essay3 = formData.get("essay3") as string;
  const essay4 = formData.get("essay4") as string;
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      {
        errors: {
          email: "Email is invalid",
          username: null,
          password: null,
          essay1: null,
          essay2: null,
          essay3: null,
          essay4: null,
        },
      },
      { status: 400 },
    );
  }

  if (typeof username !== "string" || username.length === 0) {
    return json(
      {
        errors: {
          email: null,
          username: "Username is required",
          password: null,
          essay1: null,
          essay2: null,
          essay3: null,
          essay4: null,
        },
      },
      { status: 400 },
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      {
        errors: {
          email: null,
          username: null,
          password: "Password is required",
          essay1: null,
          essay2: null,
          essay3: null,
          essay4: null,
        },
      },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return json(
      {
        errors: {
          email: null,
          username: null,
          password: "Password is too short",
          essay1: null,
          essay2: null,
          essay3: null,
          essay4: null,
        },
      },
      { status: 400 },
    );
  }

  const existingUsername = await getUserByUsername(username);
  if (existingUsername) {
    return json(
      {
        errors: {
          email: "A user already exists with this username",
          username: null,
          password: null,
          essay1: null,
          essay2: null,
          essay3: null,
          essay4: null,
        },
      },
      { status: 400 },
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          username: null,
          password: null,
          essay1: null,
          essay2: null,
          essay3: null,
          essay4: null,
        },
      },
      { status: 400 },
    );
  }
  const user = await createUser(email, username, password, essay1, essay2);

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: MetaFunction = () => [{ title: "Sign Up" }];

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const essay1Ref = useRef<HTMLTextAreaElement>(null);
  const essay2Ref = useRef<HTMLTextAreaElement>(null);
  const essay3Ref = useRef<HTMLTextAreaElement>(null);
  const essay4Ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.username) {
      usernameRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    } else if (actionData?.errors?.essay1) {
      passwordRef.current?.focus();
    } else if (actionData?.errors?.essay2) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-lightGreen">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create Account
        </h2>
        <form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              ref={emailRef}
              id="email"
              required
              autoFocus={true}
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={actionData?.errors?.email ? true : undefined}
              aria-describedby="email-error"
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
            />
            {actionData?.errors?.email ? (
              <div className="text-sm text-red-700 pt-1" id="email-error">
                {actionData.errors.email}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="mt-1">
              <input
                ref={usernameRef}
                id="username"
                required
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={true}
                name="username"
                type="username"
                autoComplete="username"
                aria-invalid={actionData?.errors?.username ? true : undefined}
                aria-describedby="username-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.username ? (
                <div className="pt-1 text-red-700" id="username-error">
                  {actionData.errors.username}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.password ? (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="essay1"
              className="block text-sm font-medium text-gray-700"
            >
              How did you find this community?
            </label>
            <div className="mt-1">
              <textarea
                id="essay1"
                ref={essay1Ref}
                name="essay1"
                autoComplete="First answer"
                aria-invalid={actionData?.errors?.essay1 ? true : undefined}
                aria-describedby="essay1-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.essay1 ? (
                <div className="pt-1 text-red-700" id="essay1-error">
                  {actionData.errors.essay1}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <label
              htmlFor="essay2"
              className="block text-sm font-medium text-gray-700"
            >
              Please identify and discuss a moral panic that is of relevance to
              you. (This may be a current or an historical example.)
            </label>
            <div className="mt-1">
              <textarea
                id="essay2"
                ref={essay2Ref}
                name="essay2"
                autoComplete="Second answer"
                aria-invalid={actionData?.errors?.essay2 ? true : undefined}
                aria-describedby="essay2-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.essay2 ? (
                <div className="pt-1 text-red-700" id="essay2-error">
                  {actionData.errors.essay2}
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="essay3"
              className="block text-sm font-medium text-gray-700"
            >
              Why do you want to join this community?
            </label>
            <div className="mt-1">
              <textarea
                id="essay3"
                ref={essay3Ref}
                name="essay3"
                autoComplete="Third answer"
                aria-invalid={actionData?.errors?.essay3 ? true : undefined}
                aria-describedby="essay3-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.essay3 ? (
                <div className="pt-1 text-red-700" id="essay2-error">
                  {actionData.errors.essay3}
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <label
              htmlFor="essay4"
              className="block text-sm font-medium text-gray-700"
            >
              What do you see as your potential contributions to this community?
            </label>
            <div className="mt-1">
              <textarea
                id="essay4"
                ref={essay4Ref}
                name="essay4"
                autoComplete="Third answer"
                aria-invalid={actionData?.errors?.essay4 ? true : undefined}
                aria-describedby="essay3-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.essay4 ? (
                <div className="pt-1 text-red-700" id="essay2-error">
                  {actionData.errors.essay4}
                </div>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-customRed text-white py-2 px-4 hover:bg-lightGreen hover:text-gray-600 focus:outline-none focus:bg-red-400"
          >
            Create Account
          </button>
          <div className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              className="text-blue-500 underline"
              to={{
                pathname: "/login",
                search: searchParams.toString(),
              }}
            >
              Log in
            </Link>{" "}
            OR{" "}
            <Link
              className="text-blue-500 underline"
              to={{
                pathname: "/",
                search: searchParams.toString(),
              }}
            >
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
