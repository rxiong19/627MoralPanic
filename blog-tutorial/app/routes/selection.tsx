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
  const data = loaderData['topics']
  const user = useUser();
  const isAdmin = loaderData.isAdmin;

  return (
    <div className="flex flex-col h-screen">
      <MenuBar user={user} pageTitle="Pick a topic" />
      <div className="flex justify-center items-center mt-10">
        <div className="flex flex-col justify-center items-center space-y-4">

          {data.map((d: { id: string, title: string }) => (
            <Link key={d.id} to={`/forum/${d.id}`}>
              <button className="bg-customRed hover:bg-hoverRed justify-center text-white font-bold py-10 px-4 rounded">
                {d.title}
              </button></Link>
          ))}
          {isAdmin ? (
            <div className="flex flex-col space-y-4">
              <Link to='/approval'>
                <button className="bg-customRed hover:bg-hoverRed text-white font-bold py-10 px-4 rounded">
                  Approve Users/Posts
                </button></Link>
              <Link to='new'>
                <button className="bg-customRed hover:bg-hoverRed text-white font-bold py-10 px-4 rounded">
                  Create New Topic
                </button></Link>
              <div className="flex-1 p-6">
                <Outlet />
              </div>
            </div>
          ) : (<div></div>)}
          {/* <Link to='/forum/clvpmesye0000b6gypojz4ydi'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">
            Day 1
          </button></Link>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">
            Day 2
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">
            Day 3 
          </button> 
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">
            Day 4
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;
