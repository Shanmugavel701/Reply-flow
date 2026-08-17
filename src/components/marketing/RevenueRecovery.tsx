import { ArrowUpRight, RotateCcw } from "lucide-react";
import { Counter } from "@/components/shared/Counter";
import { Reveal } from "@/components/shared/Reveal";

export function RevenueRecovery() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary">
              Revenue recovery
            </p>
            <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight sm:text-[42px]">
              Recover revenue you would have lost.
            </h2>
            <p className="mt-4 max-w-lg text-[15.5px] text-muted-foreground">
              Most stores never message a customer who left at checkout. Every recovered cart is
              tracked back to the automation that brought it back.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2 text-[12.5px] text-muted-foreground">
              <RotateCcw className="size-3.5 text-primary" />
              Example automation result · last 30 days
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Stat label="Abandoned carts" value={<Counter to={127} />} tone="muted" />
                <Stat
                  label="Potential revenue"
                  value={<Counter to={184500} prefix="₹" />}
                  tone="muted"
                />
                <Stat label="Recovered orders" value={<Counter to={23} />} tone="success" />
                <Stat
                  label="Recovered revenue"
                  value={<Counter to={38400} prefix="₹" duration={2000} />}
                  tone="primary"
                />
              </div>

              <div className="mt-7 rounded-xl bg-primary-tint p-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary-deep">
                  Recovered by automation
                </p>
                <p className="mt-2 flex items-baseline gap-3 font-display text-[38px] font-bold text-primary-deep">
                  <Counter to={38400} prefix="₹" duration={2200} />
                  <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-success">
                    <ArrowUpRight className="size-4" />
                    18.1% recovery rate
                  </span>
                </p>
                <p className="mt-2 text-[12.5px] text-primary-deep/70">
                  Generated from 23 recovered orders across WhatsApp and Instagram.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: React.ReactNode;
  tone: "muted" | "primary" | "success";
}) {
  const color =
    tone === "primary" ? "text-primary" : tone === "success" ? "text-success" : "text-foreground";
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-[12.5px] text-muted-foreground">{label}</p>
      <p className={"mt-1.5 font-display text-[26px] font-bold " + color}>{value}</p>
    </div>
  );
}
