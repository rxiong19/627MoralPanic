import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";

import { deleteNote, getNote, getNoteComments } from "~/models/note.server";
import { getUserById } from "~/models/user.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.postId, "noteId not found");

  const note = await getNote({ id: params.postId, userId });
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }
  const postUser = await getUserById(note.userId);
  let username;
  if (postUser) {
    username = postUser.username;
  }
  else {
    username = '';
  }
  const comments = await getNoteComments({ threadId: params.postId });
  return json({ note: note, comments: comments, username: username, topic: params.forumId });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.postId, "noteId not found");

  await deleteNote({ id: params.postId, userId });

  return redirect(`/forum/${params.forumId}`);
};

export default function ForumDetailsPage() {
  const data = useLoaderData<typeof loader>();
  // const height = window.innerHeight;
  return (
    <div>
      <h3 className="text-2xl font-bold">{data.note.title}</h3> 
      {data.note.image !== null && data.note.image !== undefined && data.note.image.length > 0 ? (
        <img src={`${data.note.image}`} alt={`${data.note.image}`} className="max-h-[500px]" ></img>
      ): ( <></>
      )}
      <p className="py-6">{data.note.body}</p>
      <p className="py-6">-{data.username}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-customRed px-4 py-2 text-white hover:bg-hoverRed focus:bg-lightRed"
        >
          Delete
        </button>
      </Form>
      <Link to={`/forum/newComment/${data.topic}/${data.note.id}`} className="block p-4 text-xl text-customRed">
        + New Comment
      </Link>
      <Outlet />
      <ol>
        {data.comments.map((comment) => (
          <li key={comment.id}>
            <h3
              className={`block border-b p-4 text-xl bg-white`
              }
            >
              {comment.body}
              <br></br>
              -{comment.username}
            </h3>
          </li>
        ))}
      </ol>
    </div>

  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Note not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
