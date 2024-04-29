import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  NavLink,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteNote, getNote, getNoteComments    } from "~/models/note.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.forumId, "noteId not found");

  const note = await getNote({ id: params.forumId, userId });
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }
  const comments = await getNoteComments({threadId: params.forumId});
  return json({ note: note, comments: comments });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.forumId, "noteId not found");

  await deleteNote({ id: params.forumId, userId });

  return redirect("/forum");
};

export default function ForumDetailsPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <h3 className="text-2xl font-bold">{data.note.title}</h3>
      <p className="py-6">{data.note.body}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
      <Link to={`/forum/newComment/${data.note.id}`} className="block p-4 text-xl text-blue-500">
            + New Comment
          </Link>
      <ol>
              {data.comments.map((comment) => (
                <li key={comment.id}>
                  <h3
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={comment.id}
                  >
                    {comment.body}
                  <br></br>
                  -{comment.userId}
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
