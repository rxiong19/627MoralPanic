import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { getTopics } from "~/models/note.server";
import { userIsAdmin } from "~/models/user.server";
import { getUser, requireUserId } from "~/session.server";
import { useUser } from "~/utils";

import MenuBar from "./menubar";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  let isAdmin = false;
  if (user) {
    isAdmin = await userIsAdmin(user.id);
  }
  const topics = await getTopics();
  return json({ user: user, topics: topics, isAdmin: isAdmin });
};

const SelectionPage = () => {
  const loaderData = useLoaderData<typeof loader>();
  const data = loaderData["topics"];
  let user;
  if (loaderData.user) {
    user = loaderData.user;
  }
  const isAdmin = loaderData.isAdmin;
  console.log(user);

  return (
    <div className="flex flex-col h-screen">
      <MenuBar user={user} pageTitle="Pick a topic" />
      <div
        className={`grid ${isAdmin ? "grid-cols-2" : "grid-cols-1"} gap-4 mt-10`}
      >
        <div className="flex flex-col justify-center items-center space-y-4 max-w-md mx-auto">
          {data.map((d: { id: string; title: string }) => (
            <Link key={d.id} to={`/forum/${d.id}`} className="w-full">
              <button className="bg-customRed hover:bg-hoverRed justify-center text-white font-bold py-10 px-20 rounded w-full">
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
