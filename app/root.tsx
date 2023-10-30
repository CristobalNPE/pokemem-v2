import type { LinksFunction } from "@remix-run/node";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-zinc-800 bg-texture-2 bg-blend-multiply">
        <div className=" min-h-[100dvh]  text-white max-w-screen-2xl  mx-auto ">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
