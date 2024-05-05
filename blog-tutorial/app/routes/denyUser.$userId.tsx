import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { deleteUserById, userIsAdmin } from "~/models/user.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: ActionFunctionArgs) => {
    const userId = await requireUserId(request);
    const isAdmin = await userIsAdmin(userId);
    if (isAdmin) {
        await deleteUserById(params.userId);
    }
    else {
        return redirect('/selection');
    }
    return {};
};  

export default function ApprovedUser() {
    const loaderData = useLoaderData<typeof loader>();

    return (
        <div>
            <h1>User removed!</h1>
            <Link to="/approval">Return to approval</Link>
        </div>
    );
}
