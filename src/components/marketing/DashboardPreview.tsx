import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/shared/Reveal";
import { Counter } from "@/components/shared/Counter";
import { messageOverview, topAutomations } from "@/lib/mock-data";

const metrics = [
  { label: "Total conversations", value: 12842, delta: "+18.4%" },
  { label: "Replies sent", value: 9724, delta: "+22.1%" },
  { label: "New leads", value: 2345, delta: "+15.7%" },
];

export function DashboardPreview() {
  const max = Math.max(...messageOverview.map((m) => m.received));

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[32px] font-bold leading-tight sm:text-[42px]">
            See exactly what automation is doing for revenue.
          </h2>
          <p className="mt-4 max-w-xl text-[15.5px] text-muted-foreground">
            Not vanity metrics. Conversations, leads, recovered carts and the money attached to
            each one.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)]">
            <div className="flex items-center gap-2 border-b border-border bg-surface px-5 py-3">
              <span className="size-2.5 rounded-full bg-destructive/60" />
              <span className="size-2.5 rounded-full bg-warning/70" />
              <span className="size-2.5 rounded-full bg-success/70" />
              <span className="ml-3 text-[12.5px] text-muted-foreground">
                Dashboard · Last 7 days
              </span>
            </div>

            <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-3">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-border p-5">
                  <p className="text-[13px] text-muted-foreground">{m.label}</p>
                  <p className="mt-2 font-display text-[28px] font-bold">
                    <Counter to={m.value} />
                  </p>
                  <p className="mt-1 text-[12.5px] font-medium text-success">
                    {m.delta} vs last week
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 px-5 pb-7 sm:px-7 lg:grid-cols-[1.3fr_1fr]">
              <div className="rounded-xl border border-border p-5">
                <p className="text-[14px] font-semibold">Message overview</p>
                <div className="mt-6 flex h-40 items-end gap-3">
                  {messageOverview.map((m) => (
                    <div key={m.day} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex w-full items-end justify-center gap-1">
                        <div
                          className="w-1/2 rounded-t bg-primary/25"
                          style={{ height: (m.received / max) * 120 }}
                        />
                        <div
                          className="w-1/2 rounded-t bg-primary"
                          style={{ height: (m.sent / max) * 120 }}
                        />
                      </div>
                      <span className="text-[11px] text-muted-foreground">{m.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border p-5">
                <p className="text-[14px] font-semibold">Top automations</p>
                <ul className="mt-4 space-y-3">
                  {topAutomations.slice(0, 4).map((a) => (
                    <li key={a.name} className="flex items-center justify-between gap-3">
                      <span className="truncate text-[13px]">{a.name}</span>
                      <span className="shrink-0 text-[12.5px] font-medium text-primary">
                        {a.runs.toLocaleString("en-IN")} runs
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex justify-center">
          <Link
            to="/dashboard"
            className="rounded-xl border border-border px-5 py-3 text-[14.5px] font-medium transition-colors hover:border-primary hover:text-primary"
          >
            Explore the dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
