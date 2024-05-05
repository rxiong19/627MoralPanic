import type { MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Moral Disco" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-lightGreen sm:flex sm:items-center sm:justify-center">
      {user ? (
      <Form action="/logout" method="post">
          <button
            type="submit"
            className="flex rounded bg-customRed px-4 py-2 text-blue-100 absolute top-0 right-0 m-4"
          >
            Logout
          </button>
          </Form>
      ) : (<></>)}
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-80">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="images/moralDiscoLogo.png"
                  alt="Wolf approaching Little Red Riding Hood"
              />
              <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-customRed drop-shadow-md">
                  Moral Disco
                </span>
              </h1>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="flex-col"><Link to="/resources"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-customRed shadow-sm hover:bg-yellow-50 sm:px-8">
                    View Resources
                  </Link>
                {user ? (
                  // <Link
                  //   to="/notes"
                  //   className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                  // >
                  //   View Notes for {user.email}
                  // </Link>
                  <Link
                    to="/selection"

                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-customRed shadow-sm hover:bg-yellow-50 sm:px-8"
                  >
                    View Forum
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-customRed shadow-sm hover:bg-yellow-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-customRed px-4 py-3 font-medium text-white hover:bg-yellow-600"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div></div>
            </div>
          </div>
        </div>

        
      </div>
    </main>
  );
}
