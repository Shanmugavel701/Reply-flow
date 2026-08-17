import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

export const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    line: "Try automation on one channel.",
    features: [
      "500 conversations / month",
      "1 integration",
      "3 active automations",
      "Basic inbox and contacts",
    ],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Starter",
    price: "₹1,499",
    period: "per month",
    line: "For a growing store or creator.",
    features: [
      "5,000 conversations / month",
      "Instagram + WhatsApp",
      "Unlimited automations",
      "CRM and lead pipeline",
      "2 team members",
    ],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Growth",
    price: "₹3,999",
    period: "per month",
    line: "For stores running real revenue on chat.",
    features: [
      "25,000 conversations / month",
      "WooCommerce + website events",
      "AI sales assistant",
      "Revenue attribution analytics",
      "Campaigns and broadcasts",
      "6 team members",
    ],
    cta: "Start Free",
    featured: true,
  },
  {
    name: "Business",
    price: "₹9,999",
    period: "per month",
    line: "For teams and agencies.",
    features: [
      "100,000 conversations / month",
      "Unlimited team members",
      "Roles and permissions",
      "Audit logs and API access",
      "Multiple workspaces",
      "Priority support",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export function PricingPlans({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "" : "bg-surface py-20 lg:py-28"}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {!compact && (
          <Reveal>
            <h2 className="max-w-2xl font-display text-[32px] font-bold leading-tight sm:text-[42px]">
              Simple pricing that grows with your conversations.
            </h2>
            <p className="mt-4 max-w-xl text-[15.5px] text-muted-foreground">
              Start free. Upgrade when automation is already paying for itself.
            </p>
          </Reveal>
        )}

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div
                className={
                  "flex h-full flex-col rounded-2xl border p-6 " +
                  (p.featured
                    ? "border-primary bg-card shadow-[var(--shadow-purple)]"
                    : "border-border bg-card")
                }
              >
                {p.featured && (
                  <span className="mb-3 w-fit rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
                    Most popular
                  </span>
                )}
                <p className="font-display text-[19px] font-bold">{p.name}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">{p.line}</p>
                <p className="mt-5 font-display text-[34px] font-bold">
                  {p.price}
                  <span className="ml-1.5 text-[13px] font-medium text-muted-foreground">
                    {p.period}
                  </span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[13.5px]">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/onboarding"
                  className={
                    "mt-7 rounded-xl px-4 py-3 text-center text-[14px] font-semibold transition-all active:scale-[0.98] " +
                    (p.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary-soft"
                      : "border border-border hover:border-primary hover:text-primary")
                  }
                >
                  {p.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
