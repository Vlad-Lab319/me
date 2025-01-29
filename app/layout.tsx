import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "./components/navigation/Nav";
import Social from "./components/social/Social";

import "./styles/globals.css";
import Hamburger from "./components/navigation/Hamburger";

export const metadata: Metadata = {
  title: "VE",
  description: "Vladcoder profile",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className="fixed p-0 m-0 h-dvh w-screen grid grid-cols-1">
          <header className="landscape:w-1/5 col-start-1 col-span-1 row-start-1 justify-self-end bg-white">
            <Nav />
          </header>
          <Hamburger />
          <section className="m-0 pb-8 col-start-1 row-start-1 h-dvh w-full grid grid-cols-1 grid-rows-1 place-items-center peer-checked:-translate-x-1/3 landscape:peer-checked:-translate-x-[20%] z-10 bg-[#111]">
            <main className="h-full w-full row-start-1 row-span-1">
              <h1 className="fixed m-2 p-2 text-slate-200 uppercase font-bold text-lg lg:text-2xl">
                Vladimir Eremenko
              </h1>
              {children}
            </main>
            <div className="w-full h-full -z-20 absolute top-0 left-0 bg-sky-500 mix-blend-overlay"></div>
          </section>
          <footer className="fixed z-10 bottom-2 w-full row-start-3 row-span-1 py-2 flex items-center justify-center peer-checked:-translate-x-1/3">
            <Social />
          </footer>
        </body>
      </html>
    </StoreProvider>
  );
}
