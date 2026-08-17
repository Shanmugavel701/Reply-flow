import { Globe, Instagram, Mail, MessageCircle, ShoppingCart } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

const channels = [
  {
    icon: Instagram,
    name: "Instagram",
    desc: "Automatically engage with comments, DMs and story replies.",
  },
  {
    icon: MessageCircle,
    name: "WhatsApp",
    desc: "Follow up with customers and automate order communication.",
  },
  { icon: Globe, name: "Website", desc: "Capture visitors and turn them into leads." },
  { icon: Mail, name: "Email", desc: "Send receipts, offers and re-engagement in sequence." },
  {
    icon: ShoppingCart,
    name: "WooCommerce",
    desc: "Sync orders, carts and customers into every conversation.",
  },
];

export function Channels() {
  return (
    <section className="bg-surface py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[32px] font-bold leading-tight sm:text-[42px]">
            One inbox. Every customer conversation.
          </h2>
          <p className="mt-4 max-w-xl text-[15.5px] text-muted-foreground">
            Your team stops switching apps. Every message, order and lead lands in the same place.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {channels.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <div className="group h-full rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-card)]">
                <span className="grid size-10 place-items-center rounded-lg bg-primary-tint text-primary-deep transition-transform duration-300 group-hover:-translate-y-0.5">
                  <c.icon className="size-5" />
                </span>
                <p className="mt-4 text-[15px] font-semibold">{c.name}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
