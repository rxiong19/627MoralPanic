import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { deleteUserById, userIsAdmin } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import MenuBar from "./menubar";

export const loader = async ({ params, request }: ActionFunctionArgs) => {
    const userId = await requireUserId(request);
    const isAdmin = await userIsAdmin(userId);
    if (isAdmin) {
        if (params.userId) {
            await deleteUserById(params.userId);
        }
    }
    else {
        return redirect('/selection');
    }
    return {};
};

export default function ApprovedUser() {
    useLoaderData<typeof loader>();
    const user = useUser();

    return (
        <>
        <MenuBar user={user} pageTitle="User Rejected" />
        <div className="flex justify-center items-center">
            <Link to="/approval"><button className="flex bg-customRed hover:bg-hoverRed justify-center items-center text-white font-bold py-20 px-40 mt-20 rounded">Return to approval</button></Link>
        </div>
        </>
    );
}
