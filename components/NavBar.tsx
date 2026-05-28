"use client";

import { useEffect, useState } from "react";

const navItems = ["Home", "About", "Experience", "Projects", "Contact"];

export function NavBar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0.08, 0.18, 0.32],
      },
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.toLowerCase());
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/80 bg-black/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#home"
          className="focus-ring text-sm font-medium tracking-tight text-white transition-opacity hover:opacity-80"
        >
          Yuvaan Gulati
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;

            return (
              <a
                key={item}
                href={`#${id}`}
                aria-current={isActive ? "page" : undefined}
                className={`focus-ring rounded-full px-4 py-2 text-sm transition duration-300 hover:bg-white/[0.04] hover:text-white ${
                  isActive ? "text-white" : "text-zinc-500"
                }`}
              >
                {item}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
