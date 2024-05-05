import { NavLink, Form } from "@remix-run/react";
import { useState } from "react";

import { User } from "~/models/user.server";

const MenuBar = ({ user, pageTitle }: {user: User, pageTitle: string}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between bg-slate-800 py-4 px-8 text-white">
      <h1 className="text-3xl font-bold">
        <NavLink to=".">{pageTitle}</NavLink>
      </h1>
      <div className="flex items-center space-x-6">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-xl text-blue-500 focus:outline-none"
          style={{ padding: "0.5rem", fontSize: "30pt" }}
        >
          ☰
        </button>
        <p className="px-4 py-2">{user.email}</p>
        {/* You can add more menu items here */}
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </div>

      {/* Menu Bar */}
      {menuOpen ? (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white shadow-lg py-2 px-4 rounded-md">
          <ul>
            <li>
              <NavLink
                to="/"
                className="block p-2 text-lg text-blue-500 hover:text-blue-700"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/notes"
                className="block p-2 text-lg text-blue-500 hover:text-blue-700"
                onClick={() => setMenuOpen(false)}
              >
                Notes
              </NavLink>
            </li>
            {/* Add other menu items here */}
            <li>
              <NavLink
                to="/selection"
                className="block p-2 text-lg text-blue-500 hover:text-blue-700"
                onClick={() => setMenuOpen(false)}
              >
                Selection
              </NavLink>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
};

export default MenuBar;
