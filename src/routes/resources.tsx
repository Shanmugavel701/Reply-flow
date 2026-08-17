import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, FileText, LifeBuoy, PlayCircle } from "lucide-react";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { Reveal } from "@/components/shared/Reveal";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources & Help Center — ReplyFlow" },
      {
        name: "description",
        content:
          "Guides, playbooks, API docs and support for automating Instagram, WhatsApp and WooCommerce conversations.",
      },
      { property: "og:title", content: "Resources & Help Center — ReplyFlow" },
      {
        property: "og:description",
        content: "Playbooks and guides for social commerce automation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});

const sections = [
  {
    icon: BookOpen,
    title: "Guides",
    items: [
      "Set up Instagram comment-to-DM in 10 minutes",
      "The abandoned cart sequence that recovers 32%",
      "Writing WhatsApp templates that get approved",
      "Segmenting customers by buying behaviour",
    ],
  },
  {
    icon: PlayCircle,
    title: "Playbooks",
    items: [
      "Launch day: handling 500 comments an hour",
      "Post-purchase flow for repeat orders",
      "Turning story replies into leads",
      "Win-back campaigns for dormant buyers",
    ],
  },
  {
    icon: FileText,
    title: "Documentation",
    items: [
      "REST API reference",
      "Webhooks and events",
      "WooCommerce sync fields",
      "Rate limits and quotas",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Support",
    items: [
      "Contact the team",
      "Status and uptime",
      "Security and data handling",
      "Migrating from another tool",
    ],
  },
];

function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="border-b border-border bg-surface py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
            <h1 className="font-display text-[36px] font-bold leading-tight sm:text-[48px]">
              Learn the playbooks behind the numbers.
            </h1>
            <p className="mt-5 text-[16px] text-muted-foreground">
              Everything we know about turning comments, DMs and carts into revenue.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-2 lg:px-8">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <article className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary-tint text-primary-deep">
                    <s.icon className="size-5" />
                  </span>
                  <h2 className="mt-5 font-display text-[19px] font-semibold">{s.title}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {s.items.map((it) => (
                      <li
                        key={it}
                        className="border-b border-border pb-2.5 text-[14px] text-muted-foreground last:border-0"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-surface py-14">
          <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center lg:px-8">
            <h2 className="font-display text-[26px] font-bold">Still have a question?</h2>
            <p className="mt-2.5 text-[15px] text-muted-foreground">
              Our team replies in under an hour during business hours — using ReplyFlow, naturally.
            </p>
            <Link
              to="/onboarding"
              className="mt-6 rounded-xl bg-primary px-6 py-3 text-[14.5px] font-semibold text-primary-foreground hover:bg-primary-soft"
            >
              Talk to us
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
