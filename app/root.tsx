import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import tailwindcss from "~/tailwind.css";
import manualcss from "~/root.css";
import { NotFoundMessage } from "./components/NotFound";
import { ErrorMessage } from "./components/Error";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindcss },
  { rel: "stylesheet", href: manualcss },
  { rel: "manifest", href: "./manifest.json" },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="author" content="sebastianpennino" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let ResponseComponent = <></>;
  if (error instanceof Error) {
    ResponseComponent = (
      <ErrorMessage message={`Something went wrong!: ${error.message}`} />
    );
  }
  if (!isRouteErrorResponse(error)) {
    ResponseComponent = <ErrorMessage message="Unknown Error!" />;
  }
  //@ts-ignore TODO: fix this ts error
  if (error && error.status && error.status === 404) {
    ResponseComponent = <NotFoundMessage message="Page not found!" />;
  }

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="author" content="sebastianpennino" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="text-center h-full">{ResponseComponent}</div>
        <Scripts />
      </body>
    </html>
  );
}
