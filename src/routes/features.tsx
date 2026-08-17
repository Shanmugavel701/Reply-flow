import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bot,
  Inbox,
  Instagram,
  MessageCircle,
  ShoppingCart,
  Users,
  Workflow,
  BarChart3,
  Megaphone,
} from "lucide-react";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { Reveal } from "@/components/shared/Reveal";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — ReplyFlow Social Commerce Automation" },
      {
        name: "description",
        content:
          "Instagram and WhatsApp automation, a unified inbox, visual workflow builder, conversation CRM, AI sales assistant and WooCommerce sync.",
      },
      { property: "og:title", content: "Features — ReplyFlow" },
      {
        property: "og:description",
        content: "Everything you need to turn customer conversations into sales, automatically.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FeaturesPage,
});

const features = [
  {
    icon: Instagram,
    title: "Instagram automation",
    body: "Auto-reply to comments, turn them into DMs, answer story replies and capture the lead — within seconds of someone showing interest.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp automation",
    body: "Order confirmations, shipping updates, delivery check-ins and follow-ups sent on the channel your customers actually open.",
  },
  {
    icon: Inbox,
    title: "Unified inbox",
    body: "Instagram, WhatsApp, website chat and email in one thread view, with customer context and order history beside every message.",
  },
  {
    icon: Workflow,
    title: "Visual workflow builder",
    body: "Triggers, conditions, delays and actions on a canvas. Build an automation in minutes without touching code.",
  },
  {
    icon: Bot,
    title: "AI sales assistant",
    body: "Trained on your catalogue and policies. Recommends products, answers questions and hands over to a human when it should.",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce integration",
    body: "Two-way WooCommerce sync for products, orders and customers — so every message knows what was bought and what's in the cart.",
  },
  {
    icon: Users,
    title: "Conversation CRM",
    body: "Contacts built from real conversations: tags, source channel, lifetime value, order history and a full activity timeline.",
  },
  {
    icon: Megaphone,
    title: "Broadcast campaigns",
    body: "Segment customers and send WhatsApp or Instagram broadcasts, then measure replies and revenue, not just opens.",
  },
  {
    icon: BarChart3,
    title: "Revenue analytics",
    body: "Conversion funnels, response times and revenue attributed to each automation — so you know what to scale.",
  },
];

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="border-b border-border bg-surface py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
            <Reveal>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.18em] text-primary">
                Platform
              </p>
              <h1 className="mt-4 font-display text-[36px] font-bold leading-tight sm:text-[52px]">
                Everything your business needs to reply, follow up and sell.
              </h1>
              <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">
                One platform for the whole conversation lifecycle — from the first Instagram comment
                to the repeat order six weeks later.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.04}>
                <article className="h-full rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-lift)]">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary-tint text-primary-deep">
                    <f.icon className="size-5" />
                  </span>
                  <h2 className="mt-5 font-display text-[18px] font-semibold">{f.title}</h2>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">
                    {f.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-surface py-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center lg:px-8">
            <h2 className="font-display text-[28px] font-bold sm:text-[34px]">
              See it running on your own store.
            </h2>
            <p className="mt-3 text-[15px] text-muted-foreground">
              Connect Instagram, WhatsApp and WooCommerce in under ten minutes.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/onboarding"
                className="rounded-xl bg-primary px-6 py-3 text-[14.5px] font-semibold text-primary-foreground hover:bg-primary-soft"
              >
                Start free trial
              </Link>
              <Link
                to="/pricing"
                className="rounded-xl border border-border bg-card px-6 py-3 text-[14.5px] font-semibold"
              >
                View pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
