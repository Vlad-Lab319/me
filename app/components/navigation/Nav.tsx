"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="h-full pr-2 landscape:pl-6 landscape:lg:pl-12 flex flex-col gap-4 items-start justify-center">
      <Link
        className={`font-bold uppercase ${pathname === "/" ? "text-sky-600" : "text-slate-600"} hover:underline hover:text-sky-600`}
        href="/"
        onClick={() =>
          (document.getElementById("menu-toggle")!.checked = false)
        }
      >
        Home
      </Link>
      <Link
        className={`font-bold uppercase ${pathname === "/contacts" ? "text-sky-600" : "text-slate-600"} hover:underline hover:text-sky-600`}
        href="/contacts"
        onClick={() =>
          (document.getElementById("menu-toggle")!.checked = false)
        }
      >
        Contacts
      </Link>
    </nav>
  );
};
