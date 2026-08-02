import { Github, Mail, MapPin } from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { profile } from "@/lib/profile";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-zinc-400">
      <NavBar />
      {children}
      <footer className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 text-sm text-zinc-500 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p className="text-white">{profile.name}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="focus-ring inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

export function PageHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 lg:pb-20">
        <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-7 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
          {body}
        </p>
      </div>
    </section>
  );
}
