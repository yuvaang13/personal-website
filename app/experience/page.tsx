import { PageHeader, PageShell } from "@/components/PageShell";
import { timeline } from "@/lib/profile";

const stats = [
  { value: "3rd", label: "MATHCOUNTS Southern NH Chapter 2026" },
  { value: "20th", label: "MATHCOUNTS NH State Competition 2026" },
  { value: "1st", label: "NHSEE 2026 Computer Science and Math" },
  { value: "K-8", label: "Audience for Infinit AI STEM tutoring" },
  { value: "FTC", label: "Lead programming and build work on Team 21689" },
  { value: "7th", label: "Grade level for SAT 1280 and ACT Math 32" },
];

const roles = [
  "Lead Programmer for FTC Team 21689, Team Tesseract",
  "Outreach, fundraising, and social media specialist for Team Tesseract",
  "Builder and hardware contributor for Team Tesseract",
  "Graphic designer and video editor for Team Tesseract",
  "Graphic designer for the IHF Boston Nashua Chapter",
  "Middle school math tutor at SCA",
  "NorthSouth Foundation volunteer teacher for math and science",
];

export default function ExperiencePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Experience"
        title="Competition, robotics, teaching, and technical growth."
        body="A structured view of the work behind the portfolio: competitions, team roles, mentoring, coursework, and applied STEM projects."
      />

      <section className="border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid grid-cols-2 border border-zinc-800 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-h-[170px] border-b border-r border-zinc-800 p-5 last:border-r-0 md:[&:nth-child(3n)]:border-r-0 md:[&:nth-last-child(-n+3)]:border-b-0"
              >
                <p className="font-serif text-4xl text-white">{stat.value}</p>
                <p className="mt-4 text-sm leading-6 text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-800">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.38fr_1fr] lg:py-20">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
              Timeline
            </p>
            <h2 className="mt-5 font-serif text-4xl text-white">Recent work</h2>
          </div>
          <div className="border-l border-zinc-800">
            {timeline.map((item) => (
              <article
                key={`${item.year}-${item.title}`}
                className="relative border-b border-zinc-800 pb-8 pl-8 pt-1 last:border-b-0"
              >
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white" />
                <p className="font-mono text-sm text-zinc-600">{item.year}</p>
                <h3 className="mt-2 text-2xl font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-7 text-zinc-500">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
            Roles
          </p>
          <div className="mt-8 grid grid-cols-1 border border-zinc-800 md:grid-cols-2">
            {roles.map((role) => (
              <div
                key={role}
                className="border-b border-zinc-800 p-5 text-lg text-zinc-300 md:border-r md:even:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0"
              >
                {role}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
