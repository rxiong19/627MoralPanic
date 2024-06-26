import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";

import {
  createNote,
  createNoteAdmin,
  createImageNote,
  createImageNoteAdmin,
} from "~/models/note.server";
import { userIsAdmin } from "~/models/user.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserId(request);
  return {};
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const isAdmin = await userIsAdmin(userId);

  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const image = formData.get("image") as string;

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { body: null, title: "Title is required", image: null } },
      { status: 400 },
    );
  }

  if (typeof body !== "string" || body.length === 0) {
    return json(
      { errors: { body: "Body is required", title: null, image: null } },
      { status: 400 },
    );
  }

  const topicId = params.forumId;
  if (topicId) {
    if (isAdmin) {
      if (image == null || image.length < 1) {
        const note = await createNoteAdmin({ body, title, userId, topicId });
        return redirect(`/forum/${params.forumId}/${note.id}`);
      }
      else {
        const note = await createImageNoteAdmin({ body, title, image, userId, topicId });
        return redirect(`/forum/${params.forumId}/${note.id}`);
      }
    } else if (image == null || image.length < 1) {
      const note = await createNote({ body, title, userId, topicId });
      return redirect(`/forum/${params.forumId}/${note.id}`);
    } else {
      const note = await createImageNote({
        body,
        title,
        image,
        userId,
        topicId,
      });
      return redirect(`/forum/${params.forumId}/${note.id}`);
    }
  }
};

export default function NewForumPage() {
  useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    } else if (actionData?.errors?.image) {
      imageRef.current?.focus();
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
          <span>Title: </span>
          <input
            ref={titleRef}
            name="title"
            className="flex-1 rounded-md border-2 border-customRed px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.title ? true : undefined}
            aria-errormessage={
              actionData?.errors?.title ? "title-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.title ? (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.title}
          </div>
        ) : null}
      </div>

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

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Image: </span>
          <input
            ref={imageRef}
            name="image"
            className="flex-1 rounded-md border-2 border-customRed px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.image ? true : undefined}
            aria-errormessage={
              actionData?.errors?.image ? "image-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.image ? (
          <div className="pt-1 text-red-700" id="image-error">
            {actionData.errors.image}
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
