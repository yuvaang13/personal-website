"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/profile";

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/80 bg-black/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="focus-ring shrink-0 text-sm font-medium tracking-tight text-white transition-opacity hover:opacity-80"
        >
          Yuvaan Gulati
        </Link>
        <div className="flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`focus-ring whitespace-nowrap rounded-full px-3 py-2 text-xs transition duration-300 hover:bg-white/[0.04] hover:text-white sm:px-4 sm:text-sm ${
                  isActive ? "text-white" : "text-zinc-500"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
