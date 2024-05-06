import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createComment } from "~/models/note.server";
import { getUserById } from "~/models/user.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserId(request);
  return {};
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const user = await getUserById(userId);
  if (user) {
    const username = user.username;
    const formData = await request.formData();
    const body = formData.get("body");
    const forumId = params['forumId'];
    const threadId = params['postId'];
    if (threadId) {

      if (typeof body !== "string" || body.length === 0) {
        return json(
          { errors: { body: "Body is required", title: null } },
          { status: 400 },
        );
      }

      await createComment({ body, username, threadId });
      return redirect(`/forum/${forumId}/${threadId}`);
    }
  }
};

export default function NewCommentPage() {
  useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Body: </span>
          <textarea
            ref={bodyRef}
            name="body"
            rows={8}
            className="w-full flex-1 rounded-md border-2 border-customRed px-3 py-2 text-lg leading-6"
            aria-invalid={actionData?.errors?.body ? true : undefined}
            aria-errormessage={
              actionData?.errors?.body ? "body-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.body ? (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.body}
          </div>
        ) : null}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-customRed px-4 py-2 text-white hover:bg-hoverRed focus:bg-lightRed"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
