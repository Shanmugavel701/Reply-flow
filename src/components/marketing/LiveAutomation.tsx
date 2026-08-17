import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Instagram,
  MessageCircle,
  MousePointerClick,
  ShoppingBag,
  UserPlus,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const steps = [
  {
    icon: Instagram,
    title: "Instagram comment",
    value: "“PRICE”",
    detail: "Sarah commented on “New Collection 🔥” at 11:48 PM.",
  },
  {
    icon: Zap,
    title: "Keyword detected",
    value: "PRICE",
    detail: "Matched against 14 keywords on this automation.",
  },
  {
    icon: UserPlus,
    title: "Lead identified",
    value: "Sarah Jordan",
    detail: "Contact created and tagged “Price enquiry”.",
  },
  {
    icon: MessageCircle,
    title: "Instagram DM sent",
    value: "Delivered",
    detail: "Reply sent in 3 seconds with the product link.",
  },
  {
    icon: MousePointerClick,
    title: "Customer clicks product",
    value: "Linen Summer Dress",
    detail: "Website event received: product.viewed.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp follow-up",
    value: "After 30 min",
    detail: "Sent only if no purchase was detected.",
  },
  {
    icon: ShoppingBag,
    title: "Purchase",
    value: "₹1,899",
    detail: "Order #1091 attributed to this automation.",
  },
];

export function LiveAutomation() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % (steps.length + 1)), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="live-automation" className="border-y border-border bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary">
            Live demo
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-[32px] font-bold leading-tight sm:text-[42px]">
            See automation happening in real time.
          </h2>
          <p className="mt-4 max-w-xl text-[15.5px] text-muted-foreground">
            One comment becomes a conversation, a lead and an order — without anyone at the desk.
            Hover any step to see what happens behind it.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-3 lg:grid-cols-7">
          {steps.map((s, i) => {
            const on = i <= active - 1;
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.04}>
                <div
                  className="group relative h-full"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className={
                      "flex h-full flex-col gap-2 rounded-xl border p-4 transition-all duration-300 " +
                      (on
                        ? "border-primary/40 bg-primary-tint/60 shadow-[var(--shadow-card)]"
                        : "border-border bg-card")
                    }
                  >
                    <span
                      className={
                        "grid size-8 place-items-center rounded-lg transition-colors " +
                        (on ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")
                      }
                    >
                      <Icon className="size-4" />
                    </span>
                    <p className="text-[13px] font-semibold leading-snug">{s.title}</p>
                    <p
                      className={
                        "text-[12.5px] " + (on ? "font-medium text-primary-deep" : "text-muted-foreground")
                      }
                    >
                      {s.value}
                    </p>
                    <ArrowRight
                      className={
                        "absolute -right-3 top-1/2 hidden size-4 -translate-y-1/2 lg:block " +
                        (on ? "text-primary" : "text-border")
                      }
                      aria-hidden="true"
                    />
                  </div>
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 top-full z-20 mt-2 w-56 rounded-lg border border-border bg-popover p-3 text-[12.5px] text-muted-foreground shadow-[var(--shadow-lift)]"
                    >
                      {s.detail}
                    </motion.div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-[13px] text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-success" />
            Demo Mode — simulated data
          </span>
          <span>Example automation result. Your numbers come from your own account.</span>
        </div>
      </div>
    </section>
  );
}
