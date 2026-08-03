import { ArrowUpRight, Github, Mail, MapPin } from "lucide-react";
import { PageHeader, PageShell } from "@/components/PageShell";
import { profile } from "@/lib/profile";

const contactLinks = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/yuvaang13",
    href: profile.github,
    icon: Github,
  },
  {
    label: "Location",
    value: profile.location,
    href: "https://www.google.com/maps/place/Nashua,+NH",
    icon: MapPin,
  },
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="contact"
        title="Projects, STEM ideas, robotics, or AI work."
        body="The best way to reach me is email. You can also find my code and current experiments on GitHub."
      />

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid grid-cols-1 border border-zinc-800 md:grid-cols-3">
            {contactLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="focus-ring group min-h-[260px] border-b border-zinc-800 p-6 transition hover:bg-white/[0.035] md:border-b-0 md:border-r md:last:border-r-0"
                >
                  <div className="flex h-full flex-col justify-between gap-10">
                    <Icon className="h-6 w-6 text-white" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
                        {item.label}
                      </p>
                      <p className="mt-4 break-words text-xl text-zinc-300">
                        {item.value}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm text-white">
                        open →
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
