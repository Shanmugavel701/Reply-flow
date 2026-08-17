import { ArrowRight, Clock, Inbox, MessageSquareOff, ShoppingCart, UserMinus } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const problems = [
  {
    icon: MessageSquareOff,
    title: "The same question, 50 times a day",
    line: "“Price?” · “Is this available?” · “Do you ship to Chennai?”",
  },
  {
    icon: Inbox,
    title: "Instagram DMs nobody opened",
    line: "42 unread requests sitting in the message request folder.",
  },
  {
    icon: ShoppingCart,
    title: "Carts left at checkout",
    line: "127 carts this month worth ₹1,84,500.",
  },
  {
    icon: Clock,
    title: "Messages arriving at 1:14 AM",
    line: "68% of enquiries land outside working hours.",
  },
  {
    icon: UserMinus,
    title: "Customers who never came back",
    line: "One order, then silence. No follow-up was ever sent.",
  },
  {
    icon: ArrowRight,
    title: "Follow-ups that never happened",
    line: "“I'll message them tomorrow” — 9 leads still waiting.",
  },
];

const pillars = [
  {
    title: "Capture",
    items: ["Leads", "Conversations", "Product interest", "Customer information"],
  },
  {
    title: "Automate",
    items: ["Replies", "Follow-ups", "Offers", "Order updates", "Reviews", "Re-engagement"],
  },
  {
    title: "Convert",
    items: ["Leads", "Returning customers", "Abandoned carts", "Conversations into sales"],
  },
];

export function ProblemSolution({ productName }: { productName: string }) {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="max-w-3xl font-display text-[32px] font-bold leading-tight sm:text-[42px]">
            Your customers are messaging you. Are you answering all of them?
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <div className="flex h-full gap-3.5 rounded-xl border border-border bg-card p-5">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                  <p.icon className="size-4.5" />
                </span>
                <div>
                  <p className="text-[14.5px] font-semibold">{p.title}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {p.line}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="mt-24 max-w-2xl font-display text-[30px] font-bold leading-tight sm:text-[38px]">
            {productName} handles the conversations for you.
          </h3>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6">
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Step {i + 1}
                </span>
                <p className="mt-2 font-display text-[24px] font-bold">{p.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[14px]">
                      <span className="size-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
