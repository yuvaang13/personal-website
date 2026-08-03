import { PageHeader, PageShell } from "@/components/PageShell";
import { educationInterests, highlights, profile, skills } from "@/lib/profile";

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="about_me"
        title="A math-heavy builder with a practical AI streak."
        body={profile.shortIntro}
      />

      <section className="border-b border-zinc-800">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.7fr_1fr] lg:py-20">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
              direction/
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl">
              I like projects where software meets rigorous thinking.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-zinc-300">
            <p>
              My work sits between math, science, and technology. I compete in
              math and science events, build AI applications, experiment with
              machine learning models, and mentor younger students in STEM.
            </p>
            <p>
              I am especially interested in computer science, electrical
              engineering, AI/ML, robotics, computer vision in healthcare, and
              personalized tutoring systems. Long term, I want to build tools
              that make high-quality learning and problem solving more
              accessible.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid grid-cols-1 border border-zinc-800 md:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className="min-h-[310px] border-b border-zinc-800 p-6 transition hover:bg-white/[0.03] md:border-r md:even:border-r-0 lg:even:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
                >
                  <Icon className="h-6 w-6 text-white" />
                  <p className="mt-8 text-xs uppercase tracking-[0.28em] text-zinc-600">
                    {item.label}
                  </p>
                  <h3 className="mt-4 text-2xl font-medium tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-7 text-zinc-500">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
              interests[]
            </p>
            <div className="mt-6 grid gap-3">
              {educationInterests.map((interest) => (
                <div
                  key={interest}
                  className="border border-zinc-800 px-4 py-3 text-zinc-300"
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">
              tools_and_skills
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-zinc-800 px-3 py-2 text-sm text-zinc-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
