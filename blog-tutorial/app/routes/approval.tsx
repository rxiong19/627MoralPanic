// So this needs to be only accessible for admin, 
// show a dynamic list of users and posts that need to be approved, 
// and have buttons to allow or deny each one

// Now what's needed is for the buttons to actually do something 

import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getNoteListItems, getNoteListItemsForTopic, getUnapprovedPosts } from "~/models/note.server";
import { getUnapprovedUsers, userIsAdmin } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import MenuBar from "./MenuBar";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
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
                <div className="flex flex-col space-y-4">
                    <h2 className="bg-customRed text-white font-bold py-10 px-4 rounded">Users</h2>
                    <table>
                        <thead>
                            <th>User</th>
                            <th>Essay Answer</th>
                            <th>Essay Answer</th>
                            <th>Approve</th>
                            <th>Deny</th>
                        </thead>
                        {data['users'].map((d: { username: string, essay1: string, essay2: string }) => (
                           <tr key={`row${d.username}`}>
                                <td key={d.username}>{d.username}</td>
                                <td key={d.essay1}>{d.essay1}</td>
                                <td key={d.essay2}>{d.essay2}</td>
                                <td key={`approve${d.username}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">Approve</button></td>
                                <td key={`deny${d.username}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">Deny</button></td>
                            </tr>
                        ))}
                    </table>
                    <h2 className="bg-customRed text-white font-bold py-10 px-4 rounded">Notes</h2>
                    <table>
                        <thead>
                            <th>UserId</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Approve</th>
                            <th>Deny</th>
                        </thead>
                        {data['notes'].map((d: { userId: string, title: string, body: string }) => (
                            <tr key={`row${d.userId}${d.title}`}>
                                <td key={d.userId}>{d.userId}</td>
                                <td key={d.title}>{d.title}</td>
                                <td key={d.body}>{d.body}</td>
                                <td key={`approve${d.userId}${d.title}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">Approve</button></td>
                                <td key={`deny${d.userId}${d.title}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">Deny</button></td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}