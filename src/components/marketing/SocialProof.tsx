import { Reveal } from "@/components/shared/Reveal";
import { Counter } from "@/components/shared/Counter";

const segments = [
  { label: "Creators", line: "Sell products from comments and story replies." },
  { label: "Ecommerce brands", line: "Recover carts and automate order updates." },
  { label: "Agencies", line: "Run automations for every client workspace." },
  { label: "Small businesses", line: "Answer enquiries without hiring a night shift." },
];

const quotes = [
  {
    initials: "AR",
    role: "Founder · Apparel brand",
    text: "Comments used to sit unanswered until the next morning. Now the DM goes out in three seconds and we see the order before we open the laptop.",
  },
  {
    initials: "MK",
    role: "Ecommerce manager",
    text: "Cart reminders on WhatsApp were the single biggest change to our month. We finally know which message produced which order.",
  },
  {
    initials: "SP",
    role: "Agency owner",
    text: "One workspace per client, the same templates everywhere. Setup that used to take a week now takes an afternoon.",
  },
];

export function SocialProof() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[32px] font-bold leading-tight sm:text-[42px]">
            Built for businesses that don&apos;t want to miss a customer.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="h-full rounded-xl border border-border bg-surface p-5">
                <p className="text-[15px] font-semibold">{s.label}</p>
                <p className="mt-2 text-[13px] text-muted-foreground">{s.line}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.initials} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <blockquote className="text-[14.5px] leading-relaxed">“{q.text}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-primary-tint text-[12.5px] font-semibold text-primary-deep">
                    {q.initials}
                  </span>
                  <span className="text-[12.5px] text-muted-foreground">
                    {q.role}
                    <span className="block text-[11px]">Placeholder customer story</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-4 rounded-2xl border border-border bg-surface p-8 sm:grid-cols-3">
          {[
            { label: "Conversations handled monthly", value: 1200000, suffix: "+" },
            { label: "Average first reply time", value: 3, suffix: "s" },
            { label: "Automation templates ready to use", value: 12, suffix: "" },
          ].map((m) => (
            <div key={m.label}>
              <p className="font-display text-[30px] font-bold text-primary">
                <Counter to={m.value} suffix={m.suffix} />
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
