import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, Outlet, useLocation } from "@remix-run/react";
import invariant from "tiny-invariant";
import FloatingButton from "~/components/FloatingButton";
import SearchBar from "~/components/SearchBar";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(userId, "userId not found");

  return null
};

export default function CardsPage() {
  const location = useLocation();
  const user = useUser();

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-slate-800 p-2 text-white h-16">
        <div className="flex items-center justify-between">
          <Link to="/cards">
            <img src="/assets/images/logo192.png" width="32" height="32" alt="Home" />
          </Link>
          <div className="text-center">
            <h1 className="poke-title text-xl md:text-3xl font-bold">
              Poke Card Creator
            </h1>
            <p className="text-xs">{user.email}</p>
          </div>
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="rounded bg-gray-600 px-4 py-2 text-blue-100 hover:bg-red-500 active:bg-blue-600"
            >
              Logout
            </button>
          </Form>
        </div>

      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        {/* only show the ADD button and search bar on /cards */}
        {location.pathname === "/cards" && (
          <>
            <SearchBar />
            <Link to="/cards/new">
              <FloatingButton />
            </Link>
          </>
        )}
        <Outlet />
      </main>
    </div>
  );
}
