import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getNoteListItemsForTopic } from "~/models/note.server";
import { useUser } from "~/utils";

import MenuBar from "./menubar";
import { getUser } from "~/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const topicId = params.forumId;
  if (topicId) {
    const user = await getUser(request);
    const noteListItems = await getNoteListItemsForTopic(topicId);
    return json({ noteListItems, user: user });
  }
};

export default function ForumPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <MenuBar user={data.user} pageTitle="Posts"></MenuBar>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          {data.user && data.user.approved ? (
            <Link to="new" className="block p-4 text-xl text-customRed">
              + New Post
            </Link>
          ) : (
            <>
              <Link to="./" className="block p-4 text-xl text-customRed">
                + New Post
              </Link>
            </>
          )}
          <hr />

          {data.noteListItems.length === 0 ? (
            <p className="p-4">No notes yet</p>
          ) : (
            <ol>
              {data.noteListItems.map((note) => (
                <li key={note.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={note.id}
                  >
                    📝 {note.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
