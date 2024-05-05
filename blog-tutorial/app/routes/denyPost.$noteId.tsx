import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { deleteNoteById } from "~/models/note.server";
import { userIsAdmin } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import MenuBar from "./menubar";
import { useUser } from "~/utils";

export const loader = async ({ params, request }: ActionFunctionArgs) => {
    const userId = await requireUserId(request);
    const isAdmin = await userIsAdmin(userId);
    if (isAdmin) {
        if (params.noteId) {
            await deleteNoteById(params.noteId);
        }
    }
    else {
        return redirect('/selection');
    }
    return {};
};

export default function RemovedUser() {
    useLoaderData<typeof loader>();
    const user = useUser();

    return (
        <>
        <MenuBar user={user} pageTitle="Post Deleted" />
        <div className="flex justify-center items-center">
            <Link to="/approval"><button className="flex bg-customRed hover:bg-hoverRed justify-center items-center text-white font-bold py-20 px-40 mt-20 rounded">Return to approval</button></Link>
        </div>
        </>
    );
}
