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
                <div className="flex flex-col space-y-4">
                    <h2 className="bg-customRed text-white font-bold py-10 px-4 rounded">Users</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Essay Answer</th>
                                <th>Essay Answer</th>
                                <th>Approve</th>
                                <th>Deny</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data['users'].map((d: { id: string, username: string, essay1: string, essay2: string }) => (
                                <tr key={`row${d.username}`}>
                                    <td key={`username${d.id}`}>{d.username}</td>
                                    <td key={`essay1${d.id}`}>{d.essay1}</td>
                                    <td key={`essay2${d.id}`}>{d.essay2}</td>
                                    <td key={`approve${d.id}`}><Link to={`/approveUser/${d.id}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">Approve</button></Link> </td>
                                    <td key={`deny${d.id}`}><Link to={`/denyUser/${d.id}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">Deny</button></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2 className="bg-customRed text-white font-bold py-10 px-4 rounded">Notes</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>UserId</th>
                                <th>Title</th>
                                <th>Body</th>
                                <th>Approve</th>
                                <th>Deny</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data['notes'].map((d: { id: string, userId: string, title: string, body: string }) => (
                                <tr key={`row${d.userId}${d.title}`}>
                                    <td key={`userId${d.id}`}>{d.userId}</td>
                                    <td key={`title${d.id}`}>{d.title}</td>
                                    <td key={`body${d.id}`}>{d.body}</td>
                                    <td key={`approve${d.userId}${d.title}`}><Link to={`/approvePost/${d.id}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">Approve</button></Link></td>
                                    <td key={`deny${d.userId}${d.title}`}><Link to={`/denyPost/${d.id}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">Deny</button></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}