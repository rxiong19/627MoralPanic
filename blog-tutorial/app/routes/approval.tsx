// So this needs to be only accessible for admin,
// show a dynamic list of users and posts that need to be approved,
// and have buttons to allow or deny each one

// Now what's needed is for the buttons to actually do something

import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getUnapprovedPosts } from "~/models/note.server";
import { getUnapprovedUsers, userIsAdmin } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

import MenuBar from "./menubar";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const isAdmin = await userIsAdmin(userId);
  if (!isAdmin) {
    return redirect(`/selection`);
  }
  const notes = await getUnapprovedPosts();
  const users = await getUnapprovedUsers();
  return json({ notes: notes, users: users });
};

export default function ApprovalPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();
  return (
    <div className="flex flex-col h-screen">
      <MenuBar user={user} pageTitle="Approve Users and Posts" />
      <div className="flex justify-center items-center mt-10">
        <div className="flex flex-col space-y-8">
          <div className="bg-customRed text-white text-center font-bold py-4 rounded">
            <h2>Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Essay Answer 1
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Essay Answer 2
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Essay Answer 3
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Essay Answer 4
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Approve
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Deny
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 ">
                {data["users"].map(
                  (d: {
                    id: string;
                    username: string;
                    essay1: string;
                    essay2: string;
                    essay3: string;
                    essay4: string;
                  }) => (
                    <tr key={`row${d.username}`}>
                      <td className="px-6 py-4">
                        {d.username}
                      </td>
                      <td className="px-6 py-4">
                        {d.essay1}
                      </td>
                      <td className="px-6 py-4">
                        {d.essay2}
                      </td>
                      <td className="px-6 py-4">
                        {d.essay3}
                      </td>
                      <td className="px-6 py-4">
                        {d.essay4}
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/approveUser/${d.id}`}>
                          <button className="bg-customRed hover:bg-hoverRed text-white font-bold py-2 px-4 rounded">
                            Approve
                          </button>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/denyUser/${d.id}`}>
                          <button className="bg-customRed hover:bg-hoverRed text-white font-bold py-2 px-4 rounded">
                            Deny
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
          <div className="bg-customRed text-white text-center font-bold py-4 rounded">
            <h2>Notes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-center">
              <thead className="bg-gray-50 text-center">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    UserId
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Body
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Approve
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Deny
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {data["notes"].map(
                  (d: {
                    id: string;
                    userId: string;
                    title: string;
                    body: string;
                  }) => (
                    <tr key={`row${d.userId}${d.title}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {d.userId}
                      </td>
                      <td className="px-6 py-4">{d.title}</td>
                      <td className="px-6 py-4 max-w-md overflow-auto">
                        {d.body}
                      </td>
                      <td className="px-6 py-4 ">
                        <Link to={`/approvePost/${d.id}`}>
                          <button className="bg-customRed hover:bg-hoverRed text-white font-bold py-2 px-4 rounded">
                            Approve
                          </button>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/denyPost/${d.id}`}>
                          <button className="bg-customRed hover:bg-hoverRed text-white font-bold py-2 px-4 rounded">
                            Deny
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
