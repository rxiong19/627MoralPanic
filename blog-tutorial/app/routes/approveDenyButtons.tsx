// Import necessary modules and functions
import { useActionData } from "@remix-run/react";
import { approveUser } from "~/models/user.server";

// Define the component
export function UserApprovalButton ({userId}: { userId: string}) {
  const handleApproveUser = async () => {
    await approveUser(userId);
  };

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded" onClick={handleApproveUser}>
      Approve User
    </button>
  );
};