import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { getTopics } from "~/models/note.server";
import { userIsAdmin } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

import MenuBar from "./menubar";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const topics = await getTopics();
  const isAdmin = await userIsAdmin(userId);
  return json({ topics: topics, isAdmin: isAdmin });
};

const SelectionPage = () => {
  const loaderData = useLoaderData<typeof loader>();
  const data = loaderData["topics"];
  const user = useUser();
  const isAdmin = loaderData.isAdmin;

  return (
    <div className="flex flex-col h-screen">
      <MenuBar user={user} pageTitle="Pick a topic" />
      <div
        className={`grid ${isAdmin ? "grid-cols-2" : "grid-cols-1"} gap-4 mt-10`}
      >
        <div className="flex flex-col justify-center items-center space-y-4">
          {data.map((d: { id: string; title: string }) => (
            <Link key={d.id} to={`/forum/${d.id}`} className="w-full">
              <button className="bg-customRed hover:bg-hoverRed justify-center text-white font-bold py-10 px-4 rounded w-full">
                {d.title}
              </button>
            </Link>
          ))}
        </div>
        {isAdmin ? (
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="w-full">
              <Link to="/approval" className="w-full">
                <button className="bg-customRed hover:bg-hoverRed justify-center items-center text-white font-bold py-10 px-4 rounded w-full">
                  Approve Users/Posts
                </button>
              </Link>
            </div>
            <div className="w-full">
              <Link to="new" className="w-full">
                <button className="bg-customRed hover:bg-hoverRed justify-center items-center text-white font-bold py-10 px-4 rounded w-full">
                  Create New Topic
                </button>
              </Link>
            </div>
            <div className="flex-1 p-6">
              <Outlet />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SelectionPage;
