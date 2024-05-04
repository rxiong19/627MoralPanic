import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import MenuBar from "./MenuBar";
import type { LoaderFunctionArgs } from "@remix-run/node";

import { useUser } from "~/utils";
import { getTopics } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { userIsAdmin } from "~/models/user.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const topics = await getTopics();
  const isAdmin = await userIsAdmin(userId);
  console.log('ADMIN:', isAdmin)
  return json({topics: topics, isAdmin: isAdmin});
};

const SelectionPage = () => {
  const loaderData = useLoaderData<typeof loader>();
  const data = loaderData['topics']
  const user = useUser();
  const isAdmin = loaderData.isAdmin;
  console.log('ISADMIN:', isAdmin)

  return (
    <div>
      <MenuBar user={user} pageTitle="Pick your round" />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col space-y-4">

          {data.map((d: {id: string, title: string}) => (
            <Link key={d.id} to={`/forum/${d.id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">
            {d.title}
          </button></Link>
          ))}
          {isAdmin ?(
          <Link to='new'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">
              Create New Topic
              </button></Link>
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
