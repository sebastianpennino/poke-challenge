import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Poke Card Creator" }];

export default function Index() {
  const user = useOptionalUser();

  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="./assets/images/poke_back.jpeg"
                alt="Creepy background by a random AI image generator"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white from-2%" />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
                  Poke Card Creator
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl font-bold text-black sm:max-w-3xl drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                A code challenge
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/cards"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 hover:text-blue-900 transition-all sm:px-8"
                  >
                    Enter as {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex justify-center align-middle mt-16">
                By Sebastian Pennino © {new Date().getFullYear()}
              </div>
              <div className="flex justify-center align-middle">
                <a href="https://www.linkedin.com/in/spennino/" className="mr-4">
                  <img
                    src="./assets/images/linkedin.svg"
                    alt="sebastian linkedin profile"
                    className="mx-auto mt-16 w-full max-w-[6rem]"
                    title="check out this guy on linkedin!"
                  />
                </a>
                <a href="https://github.com/sebastianpennino">
                  <img
                    src="./assets/images/github.svg"
                    alt="sebastian github profile"
                    className="mx-auto mt-16 w-full max-w-[6rem]"
                    title="check out this guy on github!"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
